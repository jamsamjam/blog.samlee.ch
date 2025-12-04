---
title: "Gromov-Wasserstein Distance"
tags: ["ML"]
date: "2025-12-04T14:58:07.000Z"
description: "An overview of the Gromov-Wasserstein distance and its applications in my ML project"
---

I’ve been working on a machine learning project involving the comparison of motion patterns extracted from dance videos. Our initial pipeline relied on DTW and several time-based distance metrics, but the results were not as robust as we expected. There was a suggestion to explore the Gromov–Wasserstein (GW) distance, and it turned out to be a very interesting idea! Let's start with..

## Wasserstein Distance
 
Intuitively, it quantifies the minimum "cost" of transforming one probability distribution into another, where the cost is defined in terms of the distance between points in the space. Let's look at the example below.

![Wasserstein Distance](./wasserstein.png)
 from [this lecture](https://www.youtube.com/watch?v=CDiol4LG2Ao).

The cost at i,j is defined as the amount of mass moved ($\pi_{ij}$) times the distance between the points ($d(x_i, y_j)$). The total cost is the sum of all individual costs.

$$
d_{W_1}\!\left( \sum_i \alpha_i \delta_{x_i},\; \sum_j \beta_j \delta_{y_j} \right)
= \min_{\{\pi_{ij}\}} \left\{
    \sum_{i,j} \pi_{ij} \, d(x_i, y_j)
    \;:\;
    \pi_{ij} \ge 0,\;
    \sum_i \pi_{ij} = \beta_j,\;
    \sum_j \pi_{ij} = \alpha_i
\right\}.
$$

For general probability measures with continuous support, the Wasserstein distance is defined as:

![Continuous Wasserstein Distance](./wasserstein-cont.png)

![Wasserstein Distance Formula](./wasserstein-formula.png)
 from [this lecture](https://www.youtube.com/watch?v=gjcz3mQ3asw).

## Gromov-Wasserstein Distance

What if two distributions we want to compare do not live in the same space? For example, we have two graphs with different numbers of nodes, and we want to compare their structures. This is where the Gromov-Wasserstein distance comes into play.

$$
GW_p(X,Y)
\;=\;
\inf_{\pi \in \Pi(\mu_X, \mu_Y)}
\left(
\int_{X \times Y}
\int_{X \times Y}
\big| d_X(x,x') - d_Y(y,y') \big|^p
\;
d\pi(x,y)\, d\pi(x',y')
\right)^{1/p}.
$$

Now we can't use distance between points directly, since they are in different spaces. Instead, we look at the internal structure. 

![Triangulars in Different Spaces](./triangulars.png)

Shape is... the relational structure formed by the distances between points. Even if two objects exist in entirely different coordinate systems, they can still have identical internal structures and thus represent the same shape.

Look at the cost function, we are minimizing the difference in pairwise distances within each space, weighted by the transport plan $\pi$.

## GW Distance in Python

All good! But how to compute coupling π(i,j)? In principle, computing the exact GW coupling requires solving a non convex quadratic optimization problem, which is computationally challenging. In practice, we instead use an entropic regularized version

$$
\min_{\pi} \left(
    \sum_{i,i',j,j'} 
        \pi(i,j)\,\pi(i',j') \,
        \big| d_X(x_i, x_{i'}) - d_Y(y_j, y_{j'}) \big|
    \;+\;
    \varepsilon\, \mathrm{KL}\!\left(\pi \,\middle\|\, \mu_X \otimes \mu_Y \right)
\right)
$$

In Python, we can use the `POT` (Python Optimal Transport) library to compute the GW distance. Here's a simple example:

```python
import numpy as np
import scipy as sp
import ot


def _flatten_poses(poses):
    n_frames = len(poses)
    n_landmarks = poses[0].shape[0]
    # Mediapipe pose landmarks are 3D so each frame is flattened into xyz coordinates.
    return poses[:, :, :3].reshape(n_frames, n_landmarks * 3)


def compute_distance_matrices(poses1, poses2):
    X1 = _flatten_poses(poses1)
    X2 = _flatten_poses(poses2)
    
    D1 = sp.spatial.distance.cdist(X1, X1)
    D2 = sp.spatial.distance.cdist(X2, X2)
    
    D1 /= D1.max()
    D2 /= D2.max()
    
    return D1, D2


def compute_gromov_wasserstein(poses1, poses2, verbose=False, log=False):
    X1 = _flatten_poses(poses1)
    X2 = _flatten_poses(poses2)
    
    D1 = sp.spatial.distance.cdist(X1, X1)
    D2 = sp.spatial.distance.cdist(X2, X2)
    
    D1 /= D1.max()
    D2 /= D2.max()
    
    p = ot.unif(len(X1))
    q = ot.unif(len(X2))
    
    gw_distance, log_dict = ot.gromov.gromov_wasserstein2(
        D1, D2, p, q, 
        loss_fun='square_loss',
        verbose=verbose,
        log=True
    )
    
    transport_plan = ot.gromov.gromov_wasserstein(
        D1, D2, p, q,
        loss_fun='square_loss',
        verbose=verbose
    )
    
    if log:
        return gw_distance, transport_plan, log_dict
    
    return gw_distance, transport_plan


def compute_gw_from_distance_matrices(D1, D2, p=None, q=None, loss_fun='square_loss', verbose=False, log=False):
    if p is None:
        p = ot.unif(D1.shape[0])
    if q is None:
        q = ot.unif(D2.shape[0])
    
    gw_distance, log_dict = ot.gromov.gromov_wasserstein2(
        D1, D2, p, q,
        loss_fun=loss_fun,
        verbose=verbose,
        log=True
    )
    
    transport_plan = ot.gromov.gromov_wasserstein(
        D1, D2, p, q,
        loss_fun=loss_fun,
        verbose=verbose
    )
    
    if log:
        return gw_distance, transport_plan, log_dict
    
    return gw_distance, transport_plan

```

>[!Note]
> More general case with GW distance can be found in the [official doc](https://pythonot.github.io/auto_examples/gromov/plot_gromov.html).

I loaded a pair of dance videos from the same dance (`Video 1`, `Video 2`), another video from a completely different dance (`Video 3`), and extracted pose keypoints using MediaPipe. Each pose is represented as a set of 3D coordinates for various landmarks on the body.

![Distance Matrices Heatmap](./heatmap.png)

Interesting! Distance matrices of Video 1 and Video 2 look quite similar, while that of Video 3 shows more variation. What do you think? The computed GW distances are:

```
Video 1 and Video 2: 0.008441
Video 1 and Video 3: 0.008753
```

In absolute terms the values are close, but if you experiment with other video pairs, you'll notice a clear pattern: GW distances between similar dance styles consistently remain smaller than those between different styles.

![Gromov-Wasserstein Transport Plan](./transport-plan.png)

Well, I find it a bit hard to draw conclusions from the transport plan itself, but looking at the column sums provides some insights.

![Column-sum of Transport Plan](./column-sum.png)

The column sums indicate how much each frame in Video 2 is matched to frames in Video 1. For similar dances, the distribution is more concentrated, suggesting that specific frames correspond closely. In contrast, for different dances, the distribution is more spread out, indicating less direct correspondence.

>[!Important] Summary
>- GW distance provides a flexible way to compare sequences with different lengths or coordinate systems.
>- For motion analysis in particular, it captures structural similarity beyond simple time alignment and serves as a strong complement to DTW based methods.
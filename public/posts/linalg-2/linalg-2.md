---
title: "$3^{-1} = \frac{1}{3}$. What is $A^{-1}$?"
tags: ["LinAlg"]
date: "2026-02-13T18:08:43Z"
description: "Notes from Gilbert Strang’s lecture series 3."
---


# 1. Multiplication and Inverse Matrices

# 1.1. $AB = C$

$$
\begin{align*}
C_{34} &= (\text{3rd row of A}) * (\text{4th column of B}) \\
&= a_{31} b_{14} + a_{32} b_{24} + a_{33} b_{34} + ... \\
&= \sum_{k=1}^n a_{3k} b_{k4}
\end{align*}
$$

We can generalize this to the whole matrix:

$$
C_{ij} = \sum_{k=1}^n A_{ik} B_{kj}
$$

If $A$ is $m \times n$ and $B$ is $n \times p$, then the resulting matrix $C$ will be $m \times p$. If this is confusing at first, think about a simple example. A row of $A$ will be multiplied by $p$ columns of $B$, and this will be repeated for all $m$ rows of $A$.

### 1.1.1. Column at A Time

Now, let's look at it as a product of matrix $A$ and column $j$ of $B$.

$$
\begin{pmatrix}
A
\end{pmatrix}
\begin{pmatrix}
| & | & & | \\
B_1 & B_2 & \cdots & B_p \\
| & | & & |
\end{pmatrix}
=
\begin{pmatrix}
| & | & & | \\
C_1 & C_2 & \cdots & C_p \\
| & | & & |
\end{pmatrix}
$$

Each row of $A$ is multiplied by each column of $B$ to produce the corresponding entry in $C$. We've already seen this in 2.2:

$$
\text{matrix} \times \text{vector} = \text{vector}
$$

The columns of $C$ are linear combinations of the **columns of $A$**. (See *Super Important!* in the last post.)

### 1.1.2. Row at A Time

$$
\begin{pmatrix}
- & A_1 & - \\
- & A_2 & - \\
& \vdots & \\
- & A_m & -
\end{pmatrix}
\begin{pmatrix}
- & B_1 & - \\
- & B_2 & - \\
& \vdots & \\
- & B_n & -
\end{pmatrix}
=
\begin{pmatrix}
- & C_1 & - \\
- & C_2 & - \\
& \vdots & \\
- & C_m & -
\end{pmatrix}
$$

The rows of $C$ are linear combinations of the **rows of $B$**.

$$
C_{ij} = \sum_{k=1}^n A_{ik} B_{kj}
$$

$$
\begin{align*}
C_i &= \sum_{k=1}^n A_{ik} (B_{k1}, \dots, B_{kp}) \\
&= A_{i1} B_1 + A_{i2} B_2 + \cdots + A_{in} B_n
\end{align*}
$$

>[!Tip]
> The columns of $C$ are linear combinations of the **columns** of $A$, and the rows of $C$ are linear combinations of the **rows** of $B$.

### 1.1.3. Column Times Row

$$
\text{column of A} \times \text{row of B} = \text{matrix}
$$

$$
\begin{pmatrix}
2 \\
3 \\
4
\end{pmatrix}
\begin{pmatrix}
1 & 6
\end{pmatrix}
=
\begin{pmatrix}
2 & 12 \\
3 & 18 \\
4 & 24
\end{pmatrix}
$$

It's a very special matrix! The columns are multiples of $(2, 3, 4)$ and the rows are multiples of $[1, 6]$.

$$
AB = \sum \text{columns of A} \times \text{rows of B}
$$

$$
\begin{pmatrix}
2 & 7\\
3 & 8\\
4 & 9
\end{pmatrix}
\begin{pmatrix}
1 & 6 \\
0 & 0
\end{pmatrix}
=
\begin{pmatrix}
2 \\
3 \\
4
\end{pmatrix}
\begin{pmatrix}
1 & 6
\end{pmatrix}
+
\begin{pmatrix}
7 \\
8 \\
9
\end{pmatrix}
\begin{pmatrix}
0 & 0
\end{pmatrix}
$$

## 1.2. Block Multiplication

Suppose we have two square matrices $A$ and $B$ of size $n \times n$. Guess whay? We can multiply them block by block!

$$
A =
\begin{bmatrix}
A_1 & A_2 \\
A_3 & A_4
\end{bmatrix},
\quad
B =
\begin{bmatrix}
B_1 & B_2 \\
B_3 & B_4
\end{bmatrix}
$$
$$
AB =
\begin{bmatrix}
A_1B_1 + A_2B_3 & A_1B_2 + A_2B_4 \\
A_3B_1 + A_4B_3 & A_3B_2 + A_4B_4
\end{bmatrix}
$$

It may not be very straightforward to see why this works, but you can see it works by hand. I think it's enough here to know that we can do this.

## 1.3. Inverses (Square Matrix)

### 1.3.1. Existence of Inverse

Not all matrices have inverses. If $A^{-1}$ exists (= invertible, non-singular), ..

$$
AA^{-1} = A^{-1}A = I
$$

Why a matrix wouldn't have an inverse (singular) ?

$$
\begin{pmatrix}
1 & 3 \\
2 & 6
\end{pmatrix}
$$

1. Determinant of this matrix is zero.

2. Suppose there is an inverse matrix $A^{-1}$, then when we multiply $A$ by $A^{-1}$, the result should be combination of the columns of $A$. But they lie on the same line, so we can never get the identity matrix $I$.

3. If we can find a vector $x$ such that $Ax = 0$, then $A$ is singular. In this case, $x = (3, -1)$.

$$
\begin{pmatrix}
1 & 3 \\
2 & 6
\end{pmatrix}
\begin{pmatrix}
3 \\
-1
\end{pmatrix}
=
\begin{pmatrix}0 \\
0
\end{pmatrix}
$$

Why this is an issue for an inverse?

$$
Ax = 0
$$

$$
\begin{align*}
A^{-1} A x &= x = 0
\end{align*}
$$

But $x$ was not zero!

>[!Caution] Important!
> If a combination of the columns of $A$ can give you the zero vector, then $A$ is singular and does not have an inverse. In other words, if there is a non-zero vector $x$ such that $Ax = 0$, then $A$ is singular.

### 1.3.2. Gauss-Jordan

$$
\begin{pmatrix}
1 & 3 \\
2 & 7
\end{pmatrix}
\begin{pmatrix}
a & c \\
b & d
\end{pmatrix}
=
\begin{pmatrix}
1 & 0 \\
0 & 1
\end{pmatrix}
$$

Finding the inverse is like solving the system.

$$
A \times \text{column } j \text{ of } A^{-1} = \text{column } j \text{ of } I
$$

**Gauss-Jordan** can solve two equations at once.

$$
\begin{pmatrix}
1 & 3 \\
2 & 7
\end{pmatrix}
\begin{pmatrix}
a \\
b
\end{pmatrix}
=
\begin{pmatrix}
1 \\
0
\end{pmatrix}
$$

$$
\begin{pmatrix}
1 & 3 \\
2 & 7
\end{pmatrix}
\begin{pmatrix}
c \\
d
\end{pmatrix}
=
\begin{pmatrix}
0 \\
1
\end{pmatrix}
$$

Jordan once said, we can..

$$
\begin{pmatrix}
1 & 3 & | & 1 & 0 \\
2 & 7 & | & 0 & 1
\end{pmatrix}
$$

$$
\rightarrow
\begin{pmatrix}
1 & 3 & | & 1 & 0 \\
0 & 1 & | & -2 & 1
\end{pmatrix}
$$

Now that we have the upper triangular, Gauss would have said to quit, but Jordan said keep going!

$$
\rightarrow
\begin{pmatrix}
1 & 0 & | & 7 & -3 \\
0 & 1 & | & -2 & 1
\end{pmatrix}
$$

We have found the inverse matrix.

$$
A^{-1} =
\begin{pmatrix}
7 & -3 \\
-2 & 1
\end{pmatrix}
$$

Again, what was confusing for me in the beginning is that it is not clear why we can do this. Well, you can check $A \times A^{-1} = I$, but why does it work?

As we are doing elimination steps, we are multiplying $A$ by some matrice $E$'s.

$$
E(AI) = IE
$$

Wait, we have $EA = I$? Then what is $E$?

$$
E = A^{-1}
$$

$$
E(AI) = IA^{-1}
$$
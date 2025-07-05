---
title: "[Expo Build] App Icon Not Showing?"
tags: ["App"]
date: "2025-05-04T17:59:53.000Z"
description: "How I fixed the missing app icon issue in Expo builds"
---

While building my app with Expo, I ran into a frustrating issue: the app icon wasn’t showing up in the final build. I had the correct `icon` path in `app.json`, but no matter what I tried it didn’t work, until I ran..


```bash
npx expo prebuild --clean
npx expo prebuild
eas build --platform android --clear-cache
eas build --platform ios --clear-cache
```

![App Store Connect icons](./icon.png)

<img src="./icon.png" alt="App Store Connect icons" width="75%">

**Note:** The icon still didn’t show up correctly in Apple’s Transporter. It kept displaying the default gray grid icon. However, after I uploaded it on Apple Connecct it the icon appeared as expected.


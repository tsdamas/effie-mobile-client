![Version](https://img.shields.io/badge/version-0.0.1-blue)

# 📱 Effie - Cross-Platform Chat App Frontend (Capstone Project)

**Capstone Project · Expo (Bare Workflow) · React Native**
---

Welcome to **Effie**, a mobile application built using **React Native with the Expo bare workflow**. Effie enables users to securely sign in and interact with a Large Language Model (LLM) developed by DataSpeckle. This project was developed over a 4-month capstone period using agile methodologies.

---

## Requirements
- **Development Environment**
  - [Expo CLI](https://docs.expo.dev/get-started/installation/)
  - Node.js 18+
- **Simulators / Emulators**
  - iOS/macOS (Xcode) for Apple Sign-In testing
  - Android Studio (for Android builds)
- **OAuth Credentials from**
  - Google Cloud Console
  - Apple Developer Portal
    
---    

## Project Goals

- Deliver a fully functional frontend app with cross-platform support (iOS and Android)
- Build a scalable authentication flow using native SDKs and OAuth2
- Provide a smooth and engaging UX for real-time AI chat interactions
- Collaborate with a team of 4 contributors using Agile methodology

---
## Installation

```bash
git clone https://github.com/your-username/efie-frontend.git
cd efie-frontend
npm install
```

### Run on iOS
```bash
npx expo run:ios
```

### Run on Android
```bash
npx expo run:android
```
Note: You must install native dependencies and configure native projects because this app uses the bare workflow of Expo.

## OAuth2.0 Setup
### Google Sign-In
- Create a project in Google Cloud Console
- Enable Google Sign-In API
- Configure iOS and Android OAuth client IDs
- Add the IDs to your app.json

### Apple Sign-In
- Set up your App ID with Apple Sign-In entitlement in the Apple Developer Portal
- Configure the iOS native project in Xcode


### Documentation

- https://www.youtube.com/watch?v=wncM96HYcxw
- https://docs.expo.dev/tutorial/create-your-first-app/
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Bare Workflow Guide](https://docs.expo.dev/bare/install-dev-builds-in-bare/)
- [Apple Authentication for React Native](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [Google Sign-In for React Native](https://www.npmjs.com/package/@react-native-google-signin/google-signin)


### Development:
#### Recommended VSCODE extensions:
- Name: ES7+ React/Redux/React-Native snippets
Id: dsznajder.es7-react-js-snippets
Description: Extensions for React, React-Native and Redux in JS/TS with ES7+ syntax. Customizable. Built-in integration with prettier.
Version: 4.4.3
Publisher: dsznajder
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets

- Name: JavaScript and TypeScript Nightly
Id: ms-vscode.vscode-typescript-next
Description: Enables typescript@next to power VS Code's built-in JavaScript and TypeScript support
Version: 5.9.20250221
Publisher: Microsoft
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next

- Name: React Native Tools
Id: msjsdiag.vscode-react-native
Description: Debugging and integrated commands for React Native
Version: 1.13.0
Publisher: Microsoft
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native

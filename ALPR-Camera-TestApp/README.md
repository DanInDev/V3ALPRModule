# Running the example app:
**note** Only tested for Android currently.

## Install the packages
```bash
npm install
```

## IOS Specfic Setup
From the example directory in your terminal, go into the IOS directory and install the pods

### Install pods
```bash
cd ios
```
```bash
pod install
```

### Xcode signing
From here you can run the app, but when running a new project it can ask you for your signing capabilities.

* Open the .xcrworkspace or the IOS directory in Xcode
* Under "Project", click ALPRFrameProcessors
* Go to "Signing and capabilities"
* Enter your team or personal team name

# Start the application

Either run the issue in Xcode as written under "IOS Specific Setup" or if you to test on Android Platform:

* Open Android Studios
* Open the Android directory in the example app
* Click build
* Click run

### Alternativly or/and after the first build, you can start the example normally such as: 

```bash
## For android emulators and devices
npx react-native run-android

## For IoS emulators and devices
npx react-native run-ios
```
# ALPR-Camera Component

Note: This was tested on a few version react-native: 0.73.5,"0.72.13" and "0.72.3"

## Installing the package

Set your config for npm in your terminal, within the root folder of your project. This requires an auth token from your profile on gitlab. 

``` bash
npm config set -- //gitlab.vonfrank.dk/:_authToken= #YOUR_AUTH_TOKEN
```
Replace <span style="color:green;">#YOUR_AUTH_TOKEN</span> with your authentication token.

#### If you do not know how to get an auth token read below, otherwise move to next point
This can be found in: 

* On the left sidebar, select your **avatar**.
* Select **Edit** profile.
* On the left sidebar, select **Access Tokens**.
* Select **Add** new token.
* Enter a **name** and **expiry date** for the token.

*Note:*: The token expires on that date at midnight UTC. If you do not enter an expiry date, the expiry date is automatically set to 365 days later than the current date.
* Select the desired **scopes**.
* Select **Create** personal access token.

## Creating an .npmrc file
To install packages from our lovely gitlab.vonfrank packet registry, we have to define the node packet manager should look at run time.

In your project's root directory, create a file with the name:

**.npmrc** 

And add these two lines:

``` bash
@alprapp:registry=https://gitlab.vonfrank.dk/api/v4/projects/79/packages/npm/
registry=https://registry.npmjs.org/
``` 
It define to first to check the scope of @alprapp in the registry at gitlab.von.frank at the specific project. This will then check the registry on gitlab for the package, which is privated and uses your authentication token to verify your permissions.

It then specifies, if it can't find the package in the gitlab.vonfrank registry, check the regular npm registry.

## Add module and peer dependencies to your project

#### Either install them manually, or add them to your package.json under "dependencies"
While the module will accept any newer versions of the module, it is only guarenteed to work on the versions listed below.

``` bash
    "@ismaelmoreiraa/vision-camera-ocr": "3.0.1",
    "react-native-worklets-core": "^1.1.1",
    "react-native-vision-camera": "^4.0.1",
    "react-native-fs": "^2.20.0",
    "alpr-camera-component": "1.0.0"
```

## Camera module specific setup
Setup your babel.config.js to include worklets as a plugin for the worklets.
####  You should only add the plugin section, the preset is just an example.

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['react-native-worklets-core/plugin']],
};

```
> Note: You have to restart metro-bundler for changes in the `babel.config.js` file to take effect.

### Update Permissions

#### IOS Specific
Open your project's `Info.plist` and add the following lines inside the outermost ```<dict>``` tag:
```
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your Camera.</string>
```
#### Android Specific
Open your project's `AndroidManifest.xml` and add the following lines inside the manifest tag
```js
<uses-permission android:name="android.permission.CAMERA" />
```


# Done!

You are now good to go and use the alpr-camera-module!

You can see a simple implementation in App.tsx or a more advanced version used in the ALPR-Camera-TestAPP directory, which serves as an example implementation. 

If you want to try the advanced version with more features such as geolocation for area codes, color showcase of mock API calls and much more, check the readme in that directory.


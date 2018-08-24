![D](https://media.giphy.com/media/9RXVhtP9KBwl9sceL5/200w_d.gif)
## Yify Browser

### An Ionic Angular App to access YIFY API

### Overview [Visit API Details](https://yts.am/api)

	It is an Ionic 3 Hybrid application to access the yify site by using its open source api in a feasible way.  

### Instructions

* Git clone repo or download the zip and extract in local
* Install [ Node.js® and npm ](https://nodejs.org/en/download/) if they are not already on your machine.
* Install [Ionic](https://ionicframework.com/docs/intro/installation/) or run this command to install specific version which this project uses in terminal.
	```shell
	npm install -g ionic@3.18.0
	```

### Configurations

Verify that you are running Node.js version 8.x or greater,ionic 3.x and npm 5.x or greater by running node -v and npm -v and ionic -v in a terminal window. Older versions produce errors.

### Commands
* **To run the application**
```shell
npm install && ionic serve
```


## To build the application

### Linux Machine
### Installing Cordova 
```shell
sudo npm install -g cordova 
``` 
If you are running a 64-bit version of Ubuntu, you'll need to install the 32-bit libraries since Android is only 32-bit at the moment. 
```  $ sudo apt-get install ia32-libs ``` If you are on Ubuntu 13.04 or greater, `ia32-libs` has been removed. 
You can use the following packages instead: 
```
$ sudo apt-get install lib32z1 lib32ncurses5 lib32bz2-1.0
```
If you are running 64-bit version of Fedora you'll need to install some 32-bit packages: 
``` $ sudo yum install -y glibc.i686 glibc-devel.i686 libstdc++.i686 zlib-devel.i686 ncurses-devel.i686 libX11-devel.i686 libXrender.i686 libXrandr.i686```

### Windows Machine
## Installing Cordova 
```shell
npm install -g cordova 
``` 
Windows users developing for Android: You'll want to make sure you have the following installed and set up.

NOTE: Whenever you make changes to the PATH, or any other environment variable, you'll need to restart or open a new tab in your shell program for the PATH change to take effect.

### Java JDK

Install the most recent Java 8 JDK (NOT just the JRE), JDK 9 is NOT currently (2017.12) supported by Cordova.

Next, create an environment variable for ``` JAVA_HOME ``` pointing to the root folder where the Java JDK was installed. So, if you installed the JDK into ``` C:\Program Files\Java\jdk7 ```, set ``` JAVA_HOME``` to be this path. After that, add the JDK's bin directory to the PATH variable as well. Following the previous assumption, this should be either ``` %JAVA_HOME%\bin``` or the full path ``` C:\Program Files\Java\jdk7\bin ```

### Apache Ant

To install Ant, download a zip from here, extract it, move the first folder in the zip to a safe place, and update your PATH to include the bin folder in that folder. For example, if you moved the Ant folder to c:/, you'd want to add this to your ``` PATH: C:\apache-ant-1.9.2\bin```

### Android SDK

Installing the Android SDK is also necessary. The Android SDK provides you the API libraries and developer tools necessary to build, test, and debug apps for Android.

Cordova requires the ANDROID_HOME environment variable to be set. This should point to the [ANDROID_SDK_DIR]\android-sdk directory (for example c:\android\android-sdk).

Next, update your PATH to include the tools/ and platform-tools/ folder in that folder. So, using ``` ANDROID_HOME ```, you would add both ``` %ANDROID_HOME%\tools``` and ``` %ANDROID_HOME%\platform-tools```

## Finally to bundle the APK run this command

```shell
ionic cordova platform add android
ionic cordova build android --prod
```


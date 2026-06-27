// app.config.js
export default {
  expo: {
    name: "vistatower",
    slug: "vista-tower-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "vistatower",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true,
      googleServicesFile: process.env.GOOGLE_SERVICE_INFOPLIST??'./GoogleService-Info.plist',
      bundleIdentifier: "com.vistatowerapp.app",
      entitlements: {
        "aps-environment": "production",
      },
      infoPlist: {
        NSPhotoLibraryUsageDescription: "Allow this app to access your photo library.",
        NSPhotoLibraryAddUsageDescription: "Allow this app to save images to your photo library.",
        UIBackgroundModes: ["remote-notification"],
        ITSAppUsesNonExemptEncryption: false,
      },
      appleTeamId: "7Q8T279FM5",
    },
    android: {
      usesCleartextTraffic: true,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON??'./google-services.json',
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        backgroundImage: "./assets/images/icon.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.vistatowerapp.app",
      permissions: [
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.READ_MEDIA_VISUAL_USER_SELECTED",
        "android.permission.READ_MEDIA_IMAGES",
        "android.permission.READ_MEDIA_VIDEO",
        "android.permission.READ_MEDIA_AUDIO",
      ],
    },
    web: {
      output: "static",
      favicon: "./assets/images/icon.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/messaging",
      
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow app to save photos and videos.",
        },
      ],
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "expo-localization",
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "9aaf0dc0-d594-4bd2-9467-7a8af01d01ab",
      },
    },
    owner: "himanshu-virtualize",
  },
};
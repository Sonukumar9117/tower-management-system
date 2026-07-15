# 📱 Tower Management System

A cross-platform mobile application built with **React Native**, **Expo (Prebuild)**, and **TypeScript**.

## 🚀 Tech Stack

* React Native
* Expo (Prebuild Workflow)
* Expo Router
* TypeScript
* Android Studio
* Gradle

---

## 📋 Prerequisites

Make sure the following tools are installed:

* Node.js (v18 or later)
* npm
* Android Studio
* Android SDK
* Java JDK 17+
* Expo CLI

Verify your setup:

```bash
node -v
npm -v
java -version
adb devices
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project:

```bash
cd your-repository
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

### Generate Native Projects (Only Required Once)

```bash
npx expo prebuild
```

> Skip this step if the `android/` and `ios/` folders are already included in the repository.

### Run on Android

Make sure an Android emulator is running or a physical device is connected.

```bash
npx expo run:android
```

### Run on iOS (macOS only)

```bash
npx expo run:ios
```

---

## 📂 Project Structure

```text
.
├── app/
├── android/
├── ios/
├── assets/
├── components/
├── hooks/
├── constants/
├── services/
├── utils/
├── package.json
└── README.md
```

---

## 🔄 Native Dependencies

Whenever you install a native library, for example:

```bash
npx expo install react-native-reanimated
```

Run:

```bash
npx expo prebuild
```

Then rebuild the app:

```bash
npx expo run:android
```

---

## 🧹 Clean Build

If you encounter native build issues:

```bash
rm -rf android ios
npx expo prebuild --clean
npx expo run:android
```

---

## 📦 Available Scripts

```bash
npm start
npx expo run:android
npx expo run:ios
npx expo prebuild
npm run lint
```

---

## 📄 License

MIT License

# Skyline — Mobile (React Native, Android)

A real Android app version of the weather app, built with React Native so it
opens as a normal project in Android Studio. Same backend, same API
contract as the web version — see `weather-backend/README.md`.

## 1. Prerequisites

- **Node.js** v18+ (`node -v` to check)
- **Android Studio** installed, with:
  - An Android SDK installed (Android Studio prompts you on first launch)
  - Either a virtual device set up (**Device Manager → Create Device**) or a
    real Android phone with USB debugging enabled

## 2. Install dependencies

In a terminal, from this project's folder:

```bash
npm install
```

## 3. ⚠️ Point the app at your backend (do this before running)

Your phone/emulator is a **separate device** from your computer, so
`localhost` won't reach your backend. Open:

```
src/api/config.ts
```

- **Using the Android emulator (easiest):** leave it as-is — it's already
  set to `http://10.0.2.2:4000/api`, which is a special address the
  emulator maps to your computer's `localhost` automatically.
- **Using a real phone:** replace it with your computer's local network IP,
  e.g. `http://192.168.1.42:4000/api`. Find that IP with `ipconfig`
  (Windows) or `ifconfig` (Mac/Linux). Your phone and computer must be on
  the same Wi-Fi network.

## 4. Start your backend

In a **separate terminal**, go to `weather-backend` and run it (see its
README) — it needs to be running on port 4000 the whole time you're testing
the app.

## 5. Open in Android Studio

- Android Studio → **Open** → select the `android` folder inside this
  project (not the project root — the `android` subfolder specifically)
- Let it sync Gradle (first time takes a few minutes, downloads its own
  dependencies)
- Pick a device from the dropdown at the top (an emulator or your plugged-in
  phone)
- Press the green ▶ **Run** button

Android Studio builds the native shell and installs the app — but it still
needs the **JavaScript bundler** running to actually load your code. In a
terminal in this project folder:

```bash
npm start
```

Leave that running. Then hit Run in Android Studio (or reload the app on
your device — shake the device or press `R` twice in the emulator).

## 6. What you should see

Same app as the web version: search a city or tap "Use my location", see
current conditions with the live sky-color background, and a 7-day
forecast strip.

## Project structure

```
App.tsx                   main screen, state, wiring
src/
  api/
    config.ts               ⚠️ backend URL — edit this first
    client.ts                fetch wrappers, same contract as web
  conditionTheme.ts          condition -> color/icon mapping
  components/
    SearchBar.tsx             city search with debounce
    LocationButton.tsx        requests Android location permission, gets GPS coords
    WeatherHero.tsx           main readout + wind needle
    ForecastStrip.tsx         horizontal 7-day scroller
    UnitToggle.tsx            °C / °F switch
    WeatherGlyph.tsx          SVG icon set (react-native-svg)
android/                    the actual Android Studio project — open THIS folder
ios/                        iOS project (not needed for Android, left in case you want it later)
```

## Common issues

- **"Network request failed"** — backend isn't running, or `config.ts` has
  the wrong address. Double check step 3 and that `weather-backend` is
  actually running.
- **Location button does nothing / permission popup doesn't appear** — make
  sure the emulator's location is enabled (emulator toolbar has a location
  icon/settings), or on a real device that Location is on in system
  settings.
- **Gradle sync fails on first open** — normal on a slow connection, it's
  downloading Android build tools. Let it finish; retry via **File → Sync
  Project with Gradle Files** if it times out.

// ============================================================
// IMPORTANT — read this before running the app.
//
// Unlike a website, a phone/emulator is a SEPARATE device from
// your computer. "localhost" on the phone means the phone itself,
// NOT your laptop where the backend is running. So you can't just
// use http://localhost:4000 here — you have to tell it where your
// computer actually is on the network.
//
// Pick ONE of these based on how you're running the app:
//
// 1) Android Emulator (the virtual phone inside Android Studio)
//    Use the special alias 10.0.2.2 — the emulator maps this to
//    your computer's localhost automatically. This is already set
//    as the default below.
//
// 2) A REAL Android phone (connected via USB or same Wi-Fi)
//    Find your computer's local network IP address:
//      Windows:      ipconfig            (look for "IPv4 Address")
//      Mac/Linux:    ifconfig | grep inet
//    It looks like 192.168.x.x. Replace API_BASE_URL below with
//    that, e.g. "http://192.168.1.42:4000/api"
//    Your phone and computer must be on the same Wi-Fi network.
//
// Either way, your backend (weather-backend) must actually be
// running on port 4000 for this to work — same as before.
// ============================================================

export const API_BASE_URL = 'http://10.0.2.2:4000/api'

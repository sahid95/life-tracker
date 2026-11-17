# Life Tracker v2.3 Secure Premium

## Mobile deployment
Upload the contents of this folder to the repository root: `index.html`, `manifest.json`, `service-worker.js`, `icons/`, and `README.md`.

## First use and PIN
- On first open, create a new 6-digit PIN and enter it again to confirm.
- Later opens require the same PIN to decrypt the local data.
- If an older unencrypted app data object exists under the app storage key, the first PIN setup encrypts that data.
- If encrypted data already exists, the app asks for the existing PIN. Do not clear browser storage or uninstall/clear app data before making an encrypted backup.
- There is no PIN reset or recovery. Losing the PIN can make the local encrypted data unrecoverable.

## Features
- Existing Life Tracker modules and local encrypted data store.
- AES-GCM 256-bit data encryption; PBKDF2-SHA-256 PIN-derived key.
- Separate password-protected encrypted backup and restore.
- Day / Night / System theme, Bengali / English core navigation, accent color, font scale, and compact layout controls.
- Browser-only local storage; no cloud sync.
- Camera, microphone, and geolocation permissions are disabled by Permissions Policy.

## Privacy notes
The app does not need camera, microphone, contacts, or location access. The browser still provides the selected backup file only when the user manually chooses it. GitHub Pages serves the app code publicly if Pages is enabled; repository visibility and website visibility are separate.

## Limitations
- English translation covers the core navigation and selected headings, not every field or user-entered value.
- Notifications are limited by browser support and page/background behavior.
- This package has been syntax-checked but not fully tested on every Android browser. Keep a backup before replacing an existing deployment.

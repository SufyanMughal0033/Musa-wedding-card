# Ansharah & Azhar — Wedding Invitation

A Next.js 14 / React / TypeScript wedding invitation experience with a cinematic split-curtain reveal, floral invitation, three event chapters, countdown, timeline, music toggle, and editable venue map links.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add your event videos

Place licensed MP4 files in `public/videos/` using these exact names:

- `mehndi.mp4`
- `baraat.mp4`
- `walima.mp4`

The sections already point to `/videos/mehndi.mp4`, `/videos/baraat.mp4`, and `/videos/walima.mp4`. Until videos are supplied, the sections show their designed colour backgrounds.

## Add Turkish instrumental music

Place a licensed MP3 at:

`public/audio/turkish-romantic-instrumental.mp3`

The music begins after the visitor taps the opening plaque. Visitors can toggle it using the floating music control.

## Add event venues and maps

Edit `config/site.ts`. Each event has `venue`, `mapLink`, and `mapEmbed` fields. Add the venue name, a Google Maps share URL, and (optionally) a Google Maps embed URL independently for Mehndi, Baraat, and Walima.

## Opening artwork

The intro uses separately aligned left/right artwork halves for desktop and mobile. The mobile version uses the portrait reference supplied with the project; the desktop version uses a custom wide floral satin curtain artwork. Keep each pair aligned when replacing images.

## Dates

- Mehndi — 31 December 2026
- Baraat — 01 January 2027
- Walima — 02 January 2027

## Build

```bash
npm run build
```

The project is provided as source code. Install dependencies and run the build locally before deployment. Use only media you have permission to publish on a public website.

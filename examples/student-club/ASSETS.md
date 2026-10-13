# Original educational assets

CodeBreakers is fictional. The PNG diagrams and SVG logo are original geometric
artwork created for INS2053, not photos of real people or events. No third-party
images or font files are included.

`media/workshop.mp4` is an approximately 84-second original HTML tutorial with a
static instructional diagram and synthetic narration. `media/podcast.mp3` is its
audio edition; `media/tutorial.wav` is the lossless source. Speech is generated
locally using Windows SpeechSynthesizer; the script and transcript are original.
These are not a workshop recording or a real club podcast. Summary WebVTT captions
and a full equivalent transcript accompany them. Playback works offline; some
browsers require a local HTTP server to load subtitle tracks from file URLs.

All original artwork, tutorial text, recordings and caption files in this reference
are dedicated to the public domain under **CC0-1.0**. This does not relicense system
software used to produce them. No system font binaries are redistributed.

Reproduce on Windows with ffmpeg installed, from the repository root:

```
powershell -NoProfile -ExecutionPolicy Bypass -File _tools/create-reference-assets.ps1
```

Asset production is not needed for normal builds; generated assets are checked in.
Use your own appropriately licensed materials and describe their sources accurately.
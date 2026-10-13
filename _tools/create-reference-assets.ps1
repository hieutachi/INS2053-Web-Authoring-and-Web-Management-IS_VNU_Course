# Original educational diagrams and narrated tutorial. Run on Windows with ffmpeg.
# No stock photos, generated people, event claims or third-party assets.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Speech
$root = Join-Path $PSScriptRoot '../examples/student-club'
$images = Join-Path $root 'images'
$media = Join-Path $root 'media'
New-Item -ItemType Directory -Force $images,$media | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)
[IO.File]::WriteAllText((Join-Path $images 'logo.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" rx="24" fill="#003366"/><path d="M40 38L18 60l22 22m40-44l22 22-22 22M69 29L51 91" fill="none" stroke="#ffcc00" stroke-width="8" stroke-linecap="round"/></svg>', $utf8)
$slides = @(
  @('club-photo.png', 'CODEBREAKERS / LEARNING TOGETHER', 'A fictional club. An original teaching illustration.', @('LEARN', 'BUILD', 'SHARE')),
  @('meeting.png', 'OUR WORKSHOP CYCLE', 'Plan a small page, test it, then explain it to a peer.', @('PLAN', 'TEST', 'EXPLAIN')),
  @('event-1.png', 'FROM IDEA TO WEBSITE', 'An instructional diagram, not a photograph of an event.', @('HTML', 'CSS', 'REVIEW')),
  @('video-poster.png', 'YOUR FIRST HTML PAGE', 'Original narrated tutorial / transcript on the Media page', @('STRUCTURE', 'CONTENT', 'OPEN FILE'))
)
foreach ($slide in $slides) {
  $bitmap = New-Object Drawing.Bitmap(960,540)
  $g = [Drawing.Graphics]::FromImage($bitmap)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([Drawing.Color]::FromArgb(244,248,253))
  $navy = New-Object Drawing.SolidBrush([Drawing.Color]::FromArgb(0,51,102))
  $gold = New-Object Drawing.SolidBrush([Drawing.Color]::FromArgb(255,204,0))
  $font = New-Object Drawing.Font('Arial',27,[Drawing.FontStyle]::Bold)
  $small = New-Object Drawing.Font('Arial',16)
  $label = New-Object Drawing.Font('Arial',21,[Drawing.FontStyle]::Bold)
  $g.FillRectangle($navy,0,0,960,125)
  $g.DrawString($slide[1],$font,[Drawing.Brushes]::White,30,40)
  $g.DrawString($slide[2],$small,$navy,30,155)
  for ($i=0; $i -lt 3; $i++) {
    $x = 30 + $i*310
    $g.FillRectangle($navy,$x,235,280,180)
    $g.FillEllipse($gold,($x+105),255,70,70)
    $g.DrawString([string]($i+1),$label,$navy,($x+130),273)
    $g.DrawString($slide[3][$i],$label,[Drawing.Brushes]::White,($x+20),355)
  }
  $g.DrawString('INS2053 | Self-created educational media | CC0-1.0',$small,$navy,30,480)
  $bitmap.Save((Join-Path $images $slide[0]),[Drawing.Imaging.ImageFormat]::Png)
  $label.Dispose(); $small.Dispose(); $font.Dispose(); $gold.Dispose(); $navy.Dispose(); $g.Dispose(); $bitmap.Dispose()
}
$transcript = 'Welcome to this original CodeBreakers teaching tutorial. CodeBreakers is a fictional student club. This recording explains how to make your first HTML page. Start with a folder for your website. Create a file named index dot HTML. Add the HTML five doctype, the HTML element with English language, a head, and a body. In the head, declare UTF eight, set the viewport, and write a descriptive title. In the body, add one main heading with your club name and two paragraphs describing your club. Save the file and open it in your browser. The title appears on the tab. The heading and paragraphs appear on the page. Next, create separate About, Activities, Media, and Contact files. Keep all five pages at the same folder level. Link them with relative file names. Put your shared stylesheet in the CSS folder and your own images in the images folder. Finally, test every link, use the keyboard, and check the website with the network switched off. Build a small working page first, then improve it one milestone at a time.'
$speech = New-Object Speech.Synthesis.SpeechSynthesizer
$speech.Rate = 0
$speech.SetOutputToWaveFile((Join-Path $media 'tutorial.wav'))
$speech.Speak($transcript)
$speech.Dispose()
& ffmpeg -hide_banner -loglevel error -y -i (Join-Path $media 'tutorial.wav') -codec:a libmp3lame -q:a 5 (Join-Path $media 'podcast.mp3')
if ($LASTEXITCODE -ne 0) { throw 'Audio encoding failed' }
& ffmpeg -hide_banner -loglevel error -y -loop 1 -i (Join-Path $images 'video-poster.png') -i (Join-Path $media 'tutorial.wav') -c:v libx264 -tune stillimage -pix_fmt yuv420p -r 10 -c:a aac -b:a 80k -shortest -movflags +faststart (Join-Path $media 'workshop.mp4')
if ($LASTEXITCODE -ne 0) { throw 'Video encoding failed' }
[IO.File]::WriteAllText((Join-Path $media 'transcript.txt'), $transcript, $utf8)
[IO.File]::WriteAllText((Join-Path $media 'tutorial.vtt'), "WEBVTT`n`n00:00.000 --> 00:08.000`nOriginal teaching tutorial. CodeBreakers is a fictional club.`n`n00:08.000 --> 00:18.000`nCreate index.html. Add the doctype, HTML, head and body.`n`n00:18.000 --> 00:30.000`nSet UTF-8, viewport and title. Add a heading and two paragraphs.`n`n00:30.000 --> 00:40.000`nSave and open the file. The title is on the tab; content is in the page.`n`n00:40.000 --> 00:52.000`nCreate About, Activities, Media and Contact at the same folder level.`n`n00:52.000 --> 01:05.000`nUse relative links and local CSS/images. Test links, keyboard and offline use.`n`n01:05.000 --> 01:30.000`nBuild a small working page, then improve it milestone by milestone.`n", $utf8)
Write-Output 'Created local original PNG/SVG images, narrated WAV/MP3/MP4, WebVTT and transcript.'
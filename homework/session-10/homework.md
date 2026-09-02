# Homework 9: Embedding Video and Audio

## Due Date
Sunday, 23:59 (Week 11)

## Objective
- Learn to embed video and audio using HTML5 elements
- Understand media formats and browser compatibility
- Add rich media content to your club website

## Requirements

### Task 1: Create a Media Page
Create a new page called "Media" to showcase video and audio content for your club.

**Create the file:** `project/pages/media.html`

**Your Media page must include:**

1. **Video Section:**
   - Use the `<video>` element to embed a video
   - Include `controls` attribute so users can play/pause
   - Set a `width` attribute (e.g., `width="560"`)
   - Add a `poster` attribute with a thumbnail image
   - Add fallback text for browsers that don't support video
   - You can use a sample video from the internet or a local file

2. **Audio Section:**
   - Use the `<audio>` element to embed audio
   - Include `controls` attribute
   - Add fallback text
   - You can use a sample audio file or a royalty-free audio URL

3. **Page Content:**
   - A heading "Club Media"
   - A paragraph describing the video (what it shows)
   - A paragraph describing the audio content
   - At least one image related to media/content creation

**Example code:**
```html
<video width="560" controls poster="../images/video-thumbnail.jpg">
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
  Your browser does not support the video element.
</video>

<audio controls>
  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

### Task 2: Style the Media Page
Add CSS to make the media page look good.

**Your CSS must include:**
- Center the video element
- Style the audio player (add margin, maybe a background)
- Style the section headings
- Add spacing between sections
- Make the video responsive with `max-width: 100%`

### Task 3: Update Navigation
- Add a "Media" link to the navigation on ALL pages
- Ensure the navigation works from every page (use correct relative paths)

**File paths:**
- `project/pages/media.html` (new page)
- `project/css/style.css` (add media styles)
- All 4 existing HTML pages (update navigation)

## Submission Guide
- Add changes: `git add project/`
- Commit: `git commit -m "HW9: Add media page with video and audio"`
- Push: `git push`

## Grading Rubric
| Criteria | Points | Description |
|---|---|---|
| Video element | 3 | Uses video tag with controls, poster, fallback |
| Audio element | 3 | Uses audio tag with controls and fallback |
| Page content | 2 | Has headings, descriptions, images |
| Media styling | 1 | Video centered, audio styled |
| Navigation | 1 | Media link added to all pages, links work |
| **Total** | **10** | |

## Tips
- If you don't have video/audio files, use sample URLs from w3schools.com or similar
- The `poster` attribute on video shows an image before the video plays
- Test both video and audio in multiple browsers if possible

## Example Output
Your Media page should have a video player that users can play and pause, an audio player, and descriptions of the content. The navigation bar should include a "Media" link that works from every page.

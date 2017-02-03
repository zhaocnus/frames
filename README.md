Steps
========
1. Click browserAction icon
2. Content script: show UI to select screen capture area. Confirm. Send message to backgroud script.
3. Background script: capture screenshots. For now capture 15 frames.
4. Background script: capture all images. Send message to content script. Show extension page.
5. Extension page: show UI to manipulate gif settings.
6. Upload image sequence to server. Server create tmp gif and return gif url
7. Upload to gfycat.
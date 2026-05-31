import os
from PIL import Image

media_dir = r"C:\Users\allwi\.gemini\antigravity-ide\brain\cef2ad86-252c-448f-ab44-6b8c2774fa69"
files = sorted([f for f in os.listdir(media_dir) if f.startswith("media__")], key=lambda x: os.path.getmtime(os.path.join(media_dir, x)), reverse=True)

for f in files[:8]:
    path = os.path.join(media_dir, f)
    try:
        img = Image.open(path)
        print(f"File: {f}, size: {img.size}, format: {img.format}, mtime: {os.path.getmtime(path)}")
    except Exception as e:
        print(f"File: {f}, error: {str(e)}")

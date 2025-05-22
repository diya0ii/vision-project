import json
import os

api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    try:
        with open("config.json", "r") as f:
            config = json.load(f)
            api_key = config.get("GEMINI_API_KEY")
    except Exception as e:
        print("Error loading config.json:", e)

print("API KEY FOUND:", api_key)

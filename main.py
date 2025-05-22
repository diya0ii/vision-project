import json
import os
import requests

import google.generativeai as genai
from flask import Flask, jsonify, request, send_file, send_from_directory

# 🔥🔥 FILL THIS OUT FIRST! 🔥🔥
# Get your Gemini API key by:
# - Selecting "Add Gemini API" in the "Firebase Studio" panel in the sidebar
# - Or by visiting https://g.co/ai/idxGetGeminiKey
API_KEY = 'AIzaSyAnuydiOwVLuE7SklXjX79TLmgIgKkQLqE'


genai.configure(api_key=API_KEY)

app = Flask(__name__)


@app.route("/")
def index():
    return send_file('web/index.html')


@app.route("/api/generate", methods=["POST"])
def generate_api():
    if API_KEY == 'TODO':
        return jsonify({ "error": "Missing Gemini API key." })
    try:
        req_body = request.get_json()
        content = req_body.get("contents")
        model = genai.GenerativeModel(model_name=req_body.get("model"))
        response = model.generate_content(content, stream=True)

        final_text = ""
        for chunk in response:
            final_text += chunk.text

        return jsonify({ "text": final_text })

    except Exception as e:
        return jsonify({ "error": str(e) })


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('web', path)


if __name__ == "__main__":
    app.run(port=int(os.environ.get('PORT', 80)))
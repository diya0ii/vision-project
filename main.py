import json
import os


import google.generativeai as genai
from flask import Flask, jsonify, request, send_file, send_from_directory

# 🔒 SECURE: Get API key from Firebase environment variables
API_KEY = os.environ.get('GEMINI_API_KEY')

# Alternative: Try Firebase functions config format
if not API_KEY:
    try:
        # Firebase functions config is usually available as environment variables
        # in the format: FIREBASE_CONFIG_<section>_<key>
        API_KEY = os.environ.get('FIREBASE_CONFIG_GEMINI_API_KEY')
    except:
        pass

# For local development fallback
if not API_KEY:
    try:
        with open('config.json', 'r') as f:
            config = json.load(f)
            API_KEY = config.get('GEMINI_API_KEY')
    except (FileNotFoundError, json.JSONDecodeError):
        pass

if not API_KEY:
    raise ValueError(
        "GEMINI_API_KEY not found. "
        "Set it using: firebase functions:config:set gemini.api_key='your_key'"
    )

# Configure Gemini
genai.configure(api_key=API_KEY)

app = Flask(__name__)


@app.route("/")
def index():
    """Serve the main HTML page"""
    return send_file('web/index.html')


@app.route("/api/generate", methods=["POST"])
def generate_api():
    """Generate content using Gemini API"""
    try:
        req_body = request.get_json()
        
        if not req_body:
            return jsonify({"error": "No JSON data provided"}), 400
            
        content = req_body.get("contents")
        model_name = req_body.get("model", "gemini-1.5-flash")
        
        if not content:
            return jsonify({"error": "No content provided"}), 400
        
        # Initialize the model
        model = genai.GenerativeModel(model_name=model_name)
        
        # Generate content with streaming
        response = model.generate_content(content, stream=True)

        # Collect all chunks
        final_text = ""
        for chunk in response:
            if chunk.text:
                final_text += chunk.text

        return jsonify({"text": final_text})

    except Exception as e:
        print(f"Error in generate_api: {str(e)}")
        return jsonify({"error": f"Generation failed: {str(e)}"}), 500


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files from web directory"""
    return send_from_directory('web', path)


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=False)
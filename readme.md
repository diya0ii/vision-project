```markdown
# Real-Time Visual Scene Description for the Visually Impaired

An AI-powered assistive technology project that helps visually impaired users understand their surroundings. This application leverages generative AI to make images accessible for everyone, especially visually impaired users. By uploading a static image, users receive both a textual and audio description of the image's content, enabling greater understanding and accessibility

---

## 🚀 Getting Started

### 1. Clone the Repository

```
git clone https://github.com/diya0ii/vision-poject
cd your-repo-name
```

### 2. Install Dependencies

#### JavaScript

```
npm install
```

#### Python Dependencies

```
pip install -r requirements.txt
```

### 3. Configure Your Gemini API Key

- Create a file named `config.json` in the project root directory.
- Add your Gemini API key in the following format:

```
{
  "GEMINI_API_KEY": "your-gemini-api-key-here"
}
```

### 4. Run the Backend Server

```
python main.py
```

---

## 📝 Usage
-Upload a static image to the web app and receive a concise, AI-generated text description of what’s happening in the image.

-Listen to an audio narration of the image description, making visual content accessible even when users cannot view the screen directly

[future integration]
- Open the mobile web app in your browser.
- Grant camera access when prompted.
- The app will automatically capture images every 10 seconds, detect changes, and provide audio descriptions when significant changes are found.

---

## 📦 Tech Stack

- **Frontend:** JavaScript, HTML5, CSS
- **Backend:** Python, Flask
- **AI/ML:** Gemini API for image understanding
- **Speech:** Web Speech API for real-time audio output

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.
```


import { streamGemini } from './gemini-api.js';
// Import the text-to-speech library (you'll need to install it first)
// Run: npm install --save text-to-speech-js
// Then add this script tag to your HTML: <script src="node_modules/text-to-speech-js/lib/text-to-speech.min.js"></script>

let form = document.querySelector('form');
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector('.output');

// Text-to-Speech function using text-to-speech-js library
function speakText(text) {
  try {
    // Check if TextToSpeech is available
    if (typeof TextToSpeech !== 'undefined') {
      TextToSpeech.talk(text);
      return true;
    } else {
      console.warn('TextToSpeech library not loaded');
      // Fallback to Web Speech API
      return fallbackSpeech(text);
    }
  } catch (error) {
    console.error('Error with text-to-speech:', error);
    return fallbackSpeech(text);
  }
}

// Fallback function using Web Speech API
function fallbackSpeech(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
}

// Function to stop speech
function stopSpeech() {
  // Stop text-to-speech-js (if it has a stop method)
  if (typeof TextToSpeech !== 'undefined' && TextToSpeech.stop) {
    TextToSpeech.stop();
  }
  
  // Also stop Web Speech API as fallback
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

form.onsubmit = async (ev) => {
  ev.preventDefault();
  output.textContent = 'Generating...';

  try {
    const fileInput = document.getElementById('myfile');
    if (!fileInput.files.length) {
      output.textContent = "Please upload an image.";
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result.split(',')[1];

      const contents = [
        {
          role: 'user',
          parts: [
            {
              inline_data: {
                mime_type: file.type || 'image/jpeg',
                data: base64Image,
              },
            },
            { text: promptInput.value }
          ],
        },
      ];

      let stream = streamGemini({
        model: 'gemini-1.5-flash',
        contents,
      });

      let buffer = [];
      let md = new markdownit();

      for await (let chunk of stream) {
        buffer.push(chunk);
        output.innerHTML = md.render(buffer.join(''));
      }

      const fullText = buffer.join('');

      // Add speech controls to the output
      const speechControls = document.createElement('div');
      speechControls.className = 'speech-controls';
      speechControls.innerHTML = `
        <button type="button" onclick="speakAnalysis()" class="speak-btn">🔊 Speak Analysis</button>
        <button type="button" onclick="stopSpeech()" class="stop-btn">⏹️ Stop Speech</button>
      `;
      
      // Remove any existing speech controls
      const existingControls = document.querySelector('.speech-controls');
      if (existingControls) {
        existingControls.remove();
      }
      
      // Add new speech controls after the output
      output.parentNode.insertBefore(speechControls, output.nextSibling);
      
      // Store the full text globally so buttons can access it
      window.currentAnalysisText = fullText;
      
      // Automatically speak the analysis
      speakText(fullText);
    };

    reader.readAsDataURL(file);
  } 
  catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

// Make functions globally available for button onclick handlers
window.speakAnalysis = function() {
  if (window.currentAnalysisText) {
    speakText(window.currentAnalysisText);
  }
};

window.stopSpeech = stopSpeech;
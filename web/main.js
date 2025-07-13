import { streamGemini } from './gemini-api.js';

// Existing setup
let form = document.querySelector('form');
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector('.output');

// Text-to-Speech function using text-to-speech-js library
function speakText(text) {
  try {
    if (typeof TextToSpeech !== 'undefined') {
      TextToSpeech.talk(text);
      return true;
    } else {
      console.warn('TextToSpeech library not loaded');
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
  if (typeof TextToSpeech !== 'undefined' && TextToSpeech.stop) {
    TextToSpeech.stop();
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Submit handler
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

      const speechControls = document.createElement('div');
      speechControls.className = 'speech-controls';
      speechControls.innerHTML = `
        <button type="button" onclick="speakAnalysis()" class="speak-btn">🔊 Speak Analysis</button>
        <button type="button" onclick="stopSpeech()" class="stop-btn">⏹️ Stop Speech</button>
      `;

      const existingControls = document.querySelector('.speech-controls');
      if (existingControls) {
        existingControls.remove();
      }

      output.parentNode.insertBefore(speechControls, output.nextSibling);
      window.currentAnalysisText = fullText;
      speakText(fullText);
    };

    reader.readAsDataURL(file);
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

// 🆕 New Addition: Make speak/stop functions globally available
window.speakAnalysis = function () {
  if (window.currentAnalysisText) {
    speakText(window.currentAnalysisText);
  }
};
window.stopSpeech = stopSpeech;

// 🆕 New Addition: Camera + Gallery DOM elements
const captureBtn = document.getElementById("captureBtn");
const cameraModal = document.getElementById("cameraModal");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const galleryBtn = document.getElementById("galleryBtn");
const galleryInput = document.getElementById("galleryInput");

let stream; // 🆕 Track media stream globally

// 🆕 New Addition: Open camera on capture button click
captureBtn.onclick = async () => {
  try {
    cameraModal.style.display = "block";
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera not accessible. Please allow permission.");
    console.error(err);
  }
};

// 🆕 New Addition: Capture image from video on tap
video.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);

  // Stop camera
  if (stream) stream.getTracks().forEach(track => track.stop());
  cameraModal.style.display = "none";

  // Convert to file and trigger form
  canvas.toBlob(blob => {
    const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
    const dt = new DataTransfer();
    dt.items.add(file);
    document.getElementById("myfile").files = dt.files;
    form.requestSubmit(); // ⬅️ Trigger the existing logic
  }, "image/jpeg");
};

// 🆕 New Addition: Gallery button triggers file input
galleryBtn.onclick = () => {
  galleryInput.click();
};

// 🆕 New Addition: Handle selected image from gallery
galleryInput.onchange = () => {
  const file = galleryInput.files[0];
  if (!file) return;

  if (stream) stream.getTracks().forEach(track => track.stop());
  cameraModal.style.display = "none";

  const dt = new DataTransfer();
  dt.items.add(file);
  document.getElementById("myfile").files = dt.files;
  form.requestSubmit(); // ⬅️ Trigger the existing logic
};

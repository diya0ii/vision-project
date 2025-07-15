# 👁️ Vision Accessibility Assistant

> **Empowering Vision-Impaired Users Through AI-Powered Image Description**

An intelligent web application that provides real-time image descriptions for people with visual impairments, making the visual world more accessible through advanced AI technology.

## 🌟 Features

### 🔍 **Smart Image Analysis**
- **Real-time Photo Capture**: Take live photos using your device camera
- **Upload Support**: Upload existing images from your device
- **Instant Descriptions**: Get detailed, contextual descriptions of any image
- **Scene Understanding**: Comprehensive analysis of environments, objects, and text

### 🌐 **Multi-Language Support**
- Support for multiple languages to serve a global audience
- Localized descriptions for better accessibility
- Easy language switching interface

### 📱 **Live Photo Analysis (Google Lens-like)**
- Real-time camera feed processing
- Instant object and text recognition
- Live scene description as you move your camera
- Perfect for reading signs, menus, and navigating environments

### 📝 **Enhanced Description Features**
- **Additional Description Box**: Get more detailed context and information
- **Text Recognition**: Extract and read text from images
- **Object Identification**: Identify and describe objects in the scene
- **Contextual Information**: Understand the setting and environment

### ♿ **Accessibility First**
- Screen reader compatible
- High contrast mode support
- Keyboard navigation friendly
- Voice output integration
- Optimized for assistive technologies

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Flask (Python)
- **AI Engine**: Google Gemini API
- **Image Processing**: Advanced computer vision

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python 3.7+
- Modern web browser with camera access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/diya0ii/vision-project/tree/main
   cd vision-project
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up configuration**
   Create a `config.json` file in the root directory:
   ```json
   {
     "gemini_api_key": "your-gemini-api-key-here",
     "port": 5000,
     "debug": false
   }
   ```

4. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the application**
   ```bash
   python main.py
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## 📋 API Key Setup

To use this application, you'll need a Google Gemini API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `config.json` file
4. Ensure your API key has the necessary permissions for image analysis

## 🎯 Use Cases

### 📚 **Educational Support**
- Reading textbooks and educational materials
- Describing diagrams and charts
- Accessing visual learning content

### 🏪 **Daily Living**
- Reading product labels and prices
- Identifying items in stores
- Understanding signage and directions

### 🍽️ **Food & Dining**
- Reading restaurant menus
- Identifying food items
- Understanding cooking instructions

### 🏢 **Professional Environment**
- Reading documents and presentations
- Understanding workplace signage
- Accessing visual information in meetings

## 🌍 Accessibility Impact

This project aims to:
- **Bridge the visual gap** for people with vision impairments
- **Promote independence** in daily activities
- **Enhance educational opportunities** through visual content accessibility
- **Improve workplace inclusion** by making visual information accessible
- **Support navigation** in unfamiliar environments

## 🤝 Contributing

We welcome contributions to make this project even more accessible and useful!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution
- Enhanced voice output features
- Mobile app development
- Performance optimizations
- Accessibility improvements

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- 📱 Mobile browsers with camera access

## 🔒 Privacy & Security

- **No data storage**: Images are processed in real-time and not stored
- **Local processing**: Maximum privacy protection
- **Secure API calls**: Encrypted communication with AI services
- **No user tracking**: Privacy-focused design

## 🐛 Troubleshooting

### Common Issues

**Camera not working?**
- Ensure browser has camera permissions
- Check if camera is being used by another application
- Try refreshing the page

**API errors?**
- Verify your Gemini API key is correct
- Check your internet connection
- Ensure API quota limits haven't been exceeded

**Performance issues?**
- Try reducing image quality in settings
- Ensure good lighting for better recognition
- Close other resource-heavy applications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful image analysis
- The accessibility community for guidance and feedback
- Open source contributors who make projects like this possible

<div align="center">

**Made with ❤️ for accessibility and inclusion**

[⭐ Star this project](https://github.com/diya0ii/vision-project/tree/main) if you find it helpful!

</div>

## 🏷️ Tags

`accessibility` `vision-impaired` `ai` `computer-vision` `flask` `javascript` `gemini-api` `assistive-technology` `ocr` `image-description` `real-time` `web-application` `inclusive-design` `barrier-free`
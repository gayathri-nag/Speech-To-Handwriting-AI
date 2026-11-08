# 🎙️ Speech-to-Handwriting AI

An AI-powered application that converts spoken audio into handwritten-style text and generates a PDF document using a custom handwriting font.

## ✨ Features

- 🎤 Audio input and recording
- 🤖 Speech-to-text conversion using OpenAI Whisper
- ✍️ Converts recognized text into handwritten-style output
- 📄 Generates downloadable PDF documents
- 🎨 Custom handwriting font support
- 🖥️ React-based user interface
- ⚙️ Python Flask backend

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Python | Backend programming |
| Flask | Backend API |
| OpenAI Whisper | Speech recognition |
| ReportLab | PDF generation |
| Pillow | Image processing |
| HTML & CSS | User interface styling |

## 📁 Project Structure

```text
Speech-To-Handwriting-AI/
│
├── backend/
│   ├── app.py
│   ├── speech_to_text.py
│   ├── handwriting_generator.py
│   ├── pdf_generator.py
│   └── handwriting.ttf
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── pages/
│   │       ├── Home.js
│   │       └── Convert.js
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Python 3.x
- Node.js and npm
- FFmpeg

### 1. Clone the repository

```bash
git clone https://github.com/gayathri-nag/Speech-To-Handwriting-AI.git
cd Speech-To-Handwriting-AI
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install flask flask-cors openai-whisper reportlab pillow
```

Start the Flask server:

```bash
python app.py
```

### 3. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The React application will open at:

http://localhost:3000

The Flask backend runs at:

http://127.0.0.1:5000

**Note:** Make sure FFmpeg is installed and available in your system PATH for audio processing. The first Whisper model execution may require an internet connection to download the model.

## 🔄 Application Workflow

1. User provides audio through recording or audio input.
2. The backend processes the audio using Whisper.
3. Recognized speech is converted into text.
4. The text is rendered using a custom handwriting font.
5. A PDF document is generated for the user.

## 🚀 Future Enhancements

- Support for multiple handwriting styles.
- Multiple language support.
- Improved PDF customization.
- Cloud deployment.
- Additional document formatting options.

## 👩‍💻 Developer

**Gayathri Peyyala**

GitHub: [@gayathri-nag](https://github.com/gayathri-nag)

---

⭐ If you find this project interesting, consider giving the repository a star!

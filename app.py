from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import os
import traceback
from speech_to_text import transcribe_audio
from handwriting_generator import generate_handwriting
from pdf_generator import create_pdf
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "Backend is working!"

@app.route("/process", methods=["POST"])
def process():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No audio file uploaded"}), 400

        audio_file = request.files["file"]
        font_size = int(request.form.get("fontSize", 90))

        # Save audio file
        filename = secure_filename(audio_file.filename)
        audio_path = os.path.join(UPLOAD_FOLDER, filename)
        audio_file.save(audio_path)

        # 🎙 Convert speech to text
        text = transcribe_audio(audio_path)
        if not text:
            return jsonify({"error": "Transcription failed"}), 500

        # Optional custom font
        font_path = None
        if "fontFile" in request.files:
            font_file = request.files["fontFile"]
            if font_file.filename != "":
                font_filename = secure_filename(font_file.filename)
                font_path = os.path.join(UPLOAD_FOLDER, font_filename)
                font_file.save(font_path)

        # ✍ Generate handwriting image
        image_path = generate_handwriting(text, font_size, font_path)

        if not image_path:
            return jsonify({"error": "Handwriting generation failed"}), 500

        # 📄 Generate PDF
        pdf_filename = "handwritten_output.pdf"
        pdf_path = os.path.join(OUTPUT_FOLDER, pdf_filename)

        result = create_pdf(image_path, pdf_path)

        if not result:
            return jsonify({"error": "PDF generation failed"}), 500

        # ✅ Return PDF file directly
        return send_file(
            pdf_path,
            as_attachment=True,
            download_name="handwritten_output.pdf",
            mimetype="application/pdf"
        )

    #except Exception as e:
       # print("Backend Error:", str(e))
        #return jsonify({"error": "Audio processing error"}), 500
    except Exception as e:
        print("Backend Error:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/output.png")
def output_image():
    return send_from_directory(".", "output.png")


if __name__ == "__main__":
    app.run(debug=True)
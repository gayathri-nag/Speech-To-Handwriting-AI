import whisper
import os

# Load model once (important for speed)
model = whisper.load_model("base")


def transcribe_audio(audio_path):
    try:
        if not audio_path or not os.path.exists(audio_path):
            return ""

        # Whisper supports audio/video after ffmpeg installation
        result = model.transcribe(audio_path, fp16=False)

        return result.get("text", "").strip()

    except Exception as e:
        print("Speech Recognition Error:", str(e))
        return ""
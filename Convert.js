import axios from "axios";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function Convert() {
  const [file, setFile] = useState(null);
  const [fontFile, setFontFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fontSize, setFontSize] = useState(90);
  const [recording, setRecording] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 🎤 Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      alert("Microphone access denied");
    }
  };

  // ⏹ Stop Recording
  // ⏹ Stop Recording
const stopRecording = () => {
  const mediaRecorder = mediaRecorderRef.current;

  if (!mediaRecorder) return;

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunksRef.current, {
      type: mediaRecorder.mimeType,
    });

    const extension = mediaRecorder.mimeType.includes("webm")
      ? "webm"
      : mediaRecorder.mimeType.includes("ogg")
      ? "ogg"
      : "wav";

    const recordedFile = new File(
      [audioBlob],
      `recorded.${extension}`,
      { type: mediaRecorder.mimeType }
    );

    setFile(recordedFile);
    setRecording(false);

    mediaRecorder.stream.getTracks().forEach((track) => track.stop());

    console.log("Recorded audio:", recordedFile.name);
    console.log("Audio type:", recordedFile.type);
    console.log("Audio size:", recordedFile.size);
  };

  mediaRecorder.stop();
};
  //const stopRecording = () => {
   // mediaRecorderRef.current.stop();

    //mediaRecorderRef.current.onstop = () => {
      //const audioBlob = new Blob(audioChunksRef.current, {
        //type: "audio/wav",
      //});

      //const recordedFile = new File([audioBlob], "recorded.wav");
      //setFile(recordedFile);
      //setRecording(false);
    //};
  //};

  // 🚀 Upload & Convert
  const uploadAudio = async () => {
    if (!file) {
      alert("Please upload or record an audio file.");
      return;
    }

    setLoading(true);
    setPdfUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fontSize", fontSize);
    if (fontFile) formData.append("fontFile", fontFile);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/process",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );

      setPdfUrl(url);

      setImageUrl(
        "http://127.0.0.1:5000/output.png?t=" + new Date().getTime()
      );
    } catch (err) {
      console.error(err);
      alert("Error processing audio. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-3xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Speech to Handwriting Generator
          </h2>
          <Link to="/" className="text-indigo-600 font-medium">
            ⬅ Back
          </Link>
        </div>

        {/* 🎤 RECORDING SECTION */}
        <div className="text-center mb-8">
          {!recording ? (
            <button
              type="button"
              onClick={startRecording}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
            >
              🎤 Start Recording
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
            >
              ⏹ Stop Recording
            </button>
          )}
        </div>

        {/* 🎵 AUDIO FILE */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">
            1️⃣ Choose Your Audio File
          </h3>

          <input
            type="file"
            accept=".wav,.mp3,.m4a"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* 🔤 FONT SIZE */}
        <div className="mb-8">
          <label className="font-semibold">
            Font Size: {fontSize}
          </label>
          <input
            type="range"
            min="30"
            max="200"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full"
          />
        </div>

        {/* 🖋 CUSTOM FONT */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">
            2️⃣ Upload Your Own Font (.ttf)
          </h3>

          <input
            type="file"
            accept=".ttf"
            onChange={(e) => setFontFile(e.target.files[0])}
            className="w-full border p-3 rounded-lg"
          />
        </div>

        {/* ✍ MAKE YOUR OWN FONT */}
        <div className="mb-8 bg-gray-50 p-4 rounded-xl border text-center">
          <h3 className="font-semibold mb-2">
            ✍ Make Your Own Font
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Create your own handwriting font using Calligraphr and
            upload the generated .ttf file above.
          </p>

          <a
            href="https://www.calligraphr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-600 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition inline-block"
          >
            Go to Calligraphr
          </a>
        </div>

        {/* 🚀 CONVERT BUTTON */}
        <div className="text-center">
          <button
            type="button"
            onClick={uploadAudio}
            disabled={loading}
            className="bg-green-600 text-white px-8 py-3 rounded-full shadow hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Convert"}
          </button>
        </div>

        {/* 📄 PDF DOWNLOAD */}
        {pdfUrl && (
          <div className="text-center mt-8">
            <p className="mb-3 font-semibold text-green-600">
              ✅ PDF Ready!
            </p>

            <a
              href={pdfUrl}
              download="handwritten_output.pdf"
              className="bg-blue-600 text-white px-6 py-2 rounded-full shadow"
            >
              Download PDF
            </a>
          </div>
        )}

        {/* 🖼 Preview */}
        {imageUrl && (
          <div className="mt-10">
            <img
              src={imageUrl}
              alt="preview"
              className="rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Convert;
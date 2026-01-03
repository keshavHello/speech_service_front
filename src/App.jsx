import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAudioUrl(null); // reset old audio
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://speech-service-dsf9.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setStatus("File upload failed");
        return;
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);

      setAudioUrl(url);
      setStatus("Audio ready. Click play ▶️");

    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("An error occurred during upload");
    }
  };

  return (
    <div className="container">
      <h2>Text to Speech</h2>

      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <p className="status">{status}</p>

      {/* ✅ Audio controls */}
      {audioUrl && (
        <audio controls src={audioUrl} style={{ marginTop: "15px" }}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}

export default App;

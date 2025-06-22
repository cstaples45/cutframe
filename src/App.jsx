import { useState } from 'react';
import './App.css';

function App() {
  const [videoFile, setVideoFile] = useState(null);
  const [clipData, setClipData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setClipData([]);
    }
  };

  const fakeClipDetection = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Fake cut points for now
      setClipData([
        { start: '00:00:05', end: '00:00:12' },
        { start: '00:00:25', end: '00:00:37' },
        { start: '00:01:10', end: '00:01:18' },
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="app">
      <h1>🎬 CutFrame</h1>
      <p>Upload a video. Get smart clip suggestions.</p>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <br />

      {videoFile && (
        <div style={{ marginTop: '1em' }}>
          <video
            controls
            width="320"
            src={URL.createObjectURL(videoFile)}
            style={{ marginBottom: '1em' }}
          ></video>
          <br />
          <button onClick={fakeClipDetection} disabled={isProcessing}>
            {isProcessing ? 'Analyzing...' : 'Find Clip Points'}
          </button>
        </div>
      )}

      {clipData.length > 0 && (
        <div style={{ marginTop: '2em' }}>
          <h3>Suggested Clips:</h3>
          <ul>
            {clipData.map((clip, idx) => (
              <li key={idx}>
                {clip.start} → {clip.end}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

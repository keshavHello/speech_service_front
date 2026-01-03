import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  };

  const handleUpload = async () => {
    if(!file) {
      setStatus('Please select a file first')
      return
    }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:8999/speak', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setStatus('File uploaded successfully')
    } else {
      setStatus('File upload failed')
    } 
  } catch (error) {
      setStatus('An error occurred during upload')
    }
};

  return (
    <>
      <div className='container'>
        <h2>File Upload</h2>
        <input type="file" onChange={handleFileChange}/>
        <button onClick={handleUpload}>Upload</button>
        <p className='status'>{status}</p>
      </div>
    </>
  )
}

export default App

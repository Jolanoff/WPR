import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Selecteer minimaal één bestand!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Bestanden succesvol geüpload!");
      console.log(response.data);
    } catch (error) {
      console.error("Upload mislukt", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;

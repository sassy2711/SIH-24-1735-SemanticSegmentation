import React, { useState, useRef, useEffect } from 'react';

function SAMClone() {
  const [image, setImage] = useState(null);
  const [clicks, setClicks] = useState([]);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClicks([...clicks, { x, y }]);
    sendClickToBackend({ x, y });
  };

  const sendClickToBackend = async (click) => {
    const response = await fetch('/api/segment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ click, image }),
    });
    const data = await response.json();
    displayMask(data.mask);
  };

  const displayMask = (mask) => {
    const ctx = canvasRef.current.getContext('2d');
    const img = new Image();
    img.src = mask;
    img.onload = () => ctx.drawImage(img, 0, 0);
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [image]);

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>
    </div>
  );
}

const sendClickToBackend = async (click) => {
  const canvas = canvasRef.current;
  const imageData = canvas.toDataURL();  // Convert the canvas image to base64
  
  const response = await fetch('/api/segment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ click, image: imageData }),
  });
  
  const data = await response.json();
  displayMask(data.mask);
};

return (
  <div>
    <canvas ref={canvasRef}></canvas>
    <button onClick={downloadGeoJSON}>Export as GeoJSON</button>
    <button onClick={downloadKML}>Export as KML</button>
  </div>
);



export default SAMClone;



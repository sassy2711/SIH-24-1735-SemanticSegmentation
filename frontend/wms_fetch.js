import React, { useState, useRef, useEffect } from 'react';

function WMSImageLoader() {
  const [imageSrc, setImageSrc] = useState(null);
  const canvasRef = useRef(null);

  // Function to fetch the WMS image
  const fetchWMSImage = async () => {
    const wmsUrl = "https://example.com/geoserver/wms";
    const bbox = "-180,-90,180,90";  // Define your bounding box
    const width = 800;
    const height = 600;
    const layers = "your_layer_name";

    const wmsRequestUrl = `${wmsUrl}?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&BBOX=${bbox}&SRS=EPSG:4326&WIDTH=${width}&HEIGHT=${height}&LAYERS=${layers}&FORMAT=image/png`;

    try {
      const response = await fetch(wmsRequestUrl);
      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImageSrc(imageObjectURL);
    } catch (error) {
      console.error("Failed to fetch WMS image", error);
    }
  };

  useEffect(() => {
    fetchWMSImage();
  }, []);

  useEffect(() => {
    if (imageSrc) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [imageSrc]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default WMSImageLoader;

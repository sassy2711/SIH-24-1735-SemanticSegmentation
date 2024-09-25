const handleSaveMask = () => {
    const link = document.createElement('a');
    link.download = 'segmentation_mask.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };
  
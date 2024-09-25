const convertPixelToGeoCoords = (pixelCoords, bbox, imageWidth, imageHeight) => {
    const [minLon, minLat, maxLon, maxLat] = bbox;
    return pixelCoords.map(({ x, y }) => {
      const lon = minLon + (x / imageWidth) * (maxLon - minLon);
      const lat = maxLat - (y / imageHeight) * (maxLat - minLat);  // Notice: Y starts from top in pixel grid
      return { lon, lat };
    });
  };
  
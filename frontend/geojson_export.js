const createGeoJSON = (geoCoords) => {
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [geoCoords.map(({ lon, lat }) => [lon, lat])]
          },
          properties: {}
        }
      ]
    };
    return JSON.stringify(geojson);
  };
  
  // Example: Convert pixel coordinates and create GeoJSON
  const pixelCoords = getSelectedRegion(mask);
  const geoCoords = convertPixelToGeoCoords(pixelCoords, bbox, imageWidth, imageHeight);
  const geoJSON = createGeoJSON(geoCoords);
  
  // Download as a file
  const downloadGeoJSON = () => {
    const blob = new Blob([geoJSON], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'segmented_feature.geojson';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
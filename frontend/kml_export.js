const createKML = (geoCoords) => {
    let kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    kml += '<kml xmlns="http://www.opengis.net/kml/2.2">\n';
    kml += '  <Placemark>\n';
    kml += '    <Polygon>\n';
    kml += '      <outerBoundaryIs>\n';
    kml += '        <LinearRing>\n';
    kml += '          <coordinates>\n';
  
    geoCoords.forEach(({ lon, lat }) => {
      kml += `            ${lon},${lat},0\n`;  // KML format: lon,lat,altitude
    });
  
    kml += '          </coordinates>\n';
    kml += '        </LinearRing>\n';
    kml += '      </outerBoundaryIs>\n';
    kml += '    </Polygon>\n';
    kml += '  </Placemark>\n';
    kml += '</kml>';
  
    return kml;
  };
  
  // Example: Convert to KML and download
  const kmlData = createKML(geoCoords);
  
  const downloadKML = () => {
    const blob = new Blob([kmlData], { type: 'application/vnd.google-earth.kml+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'segmented_feature.kml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
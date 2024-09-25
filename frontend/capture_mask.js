const getSelectedRegion = (mask) => {
    const width = mask.width;
    const height = mask.height;
    const region = [];
    // Loop through mask pixels to get the boundary/region
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (mask[x][y] === 1) {  // Assuming mask is binary (1 for selected region)
          region.push({ x, y });
        }
      }
    }
    return region;  // Returns pixel coordinates of selected region
  };
  
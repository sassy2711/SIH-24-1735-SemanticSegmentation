//install dependencies
//npm install @tensorflow/tfjs @tensorflow/tfjs-backend-webgpu @tensorflow/tfjs-backend-webgl

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgpu';  // WebGPU for GPU/NPU
import '@tensorflow/tfjs-backend-webgl';   // WebGL for GPU
import '@tensorflow/tfjs-backend-cpu';     // CPU fallback

async function setupBackend() {
  // Check for WebGPU support (best option for GPU/NPU)
  if (navigator.gpu && await tf.setBackend('webgpu')) {
    console.log('Using WebGPU backend for model inference.');
  } 
  // Fallback to WebGL if WebGPU is not available
  else if (await tf.setBackend('webgl')) {
    console.log('Using WebGL backend for model inference.');
  } 
  // Fallback to CPU if neither WebGPU nor WebGL is available
  else {
    await tf.setBackend('cpu');
    console.log('Using CPU backend for model inference.');
  }

  // Ensure the backend is initialized before using the model
  await tf.ready();
}


from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import io
from segment_anything import SamPredictor, sam_model_registry

app = Flask(__name__)

# Load the SAM model
sam = sam_model_registry["vit_b"](checkpoint="sam_vit_b.pth")
predictor = SamPredictor(sam)

@app.route('/api/segment', methods=['POST'])
def segment():
    data = request.json
    click = np.array([data['click']])
    image_data = data['image']
    
    # Decode image from base64
    image = Image.open(io.BytesIO(base64.b64decode(image_data.split(',')[1])))
    image_np = np.array(image)

    # Run SAM model
    predictor.set_image(image_np)
    masks, _, _ = predictor.predict(point_coords=click, point_labels=np.array([1]), multimask_output=True)

    # Convert mask to image
    mask_img = Image.fromarray((masks[0] * 255).astype(np.uint8))
    buffer = io.BytesIO()
    mask_img.save(buffer, format="PNG")
    mask_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

    return jsonify({"mask": f"data:image/png;base64,{mask_base64}"})

if __name__ == '__main__':
    app.run(debug=True)

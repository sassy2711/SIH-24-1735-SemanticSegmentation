# Semantic Segmentation with U-Net

This project demonstrates the implementation of a U-Net model for semantic segmentation using TensorFlow and Keras. The model is trained on a dataset and can predict segmentation masks for input images, with the ability to visualize the results.

## Table of Contents
- [Installation](#installation)
- [Dataset](#dataset)
- [Model Architecture](#model-architecture)
- [Training](#training)
- [Prediction and Visualization](#prediction-and-visualization)
- [Usage](#usage)
- [References](#references)

## Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-repository/semantic-segmentation-unet.git](https://github.com/sassy2711/SIH-24-1735-SemanticSegmentation.git)
   ```

## Dataset

This project uses a dataset suitable for semantic segmentation, such as the Oxford-IIIT Pet Dataset. The dataset consists of images and their corresponding segmentation masks.

To load the dataset:
```python
import tensorflow_datasets as tfds

dataset, info = tfds.load('oxford_iiit_pet:3.*.*', with_info=True)
```

## Model Architecture

The model used in this project is based on the U-Net architecture, which is commonly used for image segmentation tasks. U-Net consists of an encoder-decoder structure with skip connections, making it effective for precise segmentation.

## Training

The model can be trained using the following code:
```python
history = unet_model.fit(train_dataset, epochs=10, validation_data=test_dataset)
```

Make sure to adjust the batch size depending on your computational resources:
```python
train_dataset = train_dataset.batch(16)  # or larger, depending on GPU/CPU capability
```

## Prediction and Visualization

To display predictions from the model:

```python
# Function to display sample images
def display_sample(display_list):
    plt.figure(figsize=(15, 15))
    for i in range(len(display_list)):
        plt.subplot(1, len(display_list), i+1)
        plt.imshow(tf.keras.preprocessing.image.array_to_img(display_list[i]))
        plt.axis('off')
    plt.show()

# Function to show predictions
def show_predictions(dataset):
    for images, masks in dataset.take(1):
        pred_masks = unet_model.predict(images)
        pred_masks = tf.round(pred_masks)  # Round the predicted masks to 0 or 1

        for i in range(3):  # Display 3 samples
            display_sample([images[i], masks[i], pred_masks[i]])

# Show predictions on test data
show_predictions(test_dataset)
```

### Handling Batch Dimensions

If you encounter errors due to batch dimensions when displaying predictions, ensure that you remove the extra batch dimension:
```python
image_batch = images[0]  # Access the first image in the batch if needed
```

## Usage

1. Train the model using the provided training script.
2. Use the `show_predictions` function to visualize the results.

## References

- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
- TensorFlow Documentation for [Image Segmentation](https://www.tensorflow.org/tutorials/images/segmentation)




Most of the parts of the project have been implemented individually. We just need to work on integrating them.
The following parts have been figured out individually:-

1. Interactive Semantic Segmentation website using SAM.
2. Utilization of device GPU/NPU resources.
3. Interactive Semantic Segmentation on images fetched from Web Map Services.
4. Export of images in geospatial formats such as GeoJSON and KML.




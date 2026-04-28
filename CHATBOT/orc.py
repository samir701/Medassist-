import cv2
import pytesseract
from PIL import Image

# Set the path to the Tesseract executable (change this to your installation path)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Load the image using OpenCV
image = cv2.imread('CHATBOT/WhatsApp Image 2025-12-17 at 21.19.31_e38cd958.jpg')

# Convert to grayscale (improves accuracy)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Use Tesseract to perform OCR on the image
extracted_text = pytesseract.image_to_string(gray_image)

# Print the extracted text
print("Extracted Text:", extracted_text)

import os
import json
import base64
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from werkzeug.utils import secure_filename
from dotenv import load_dotenv  

# Load environment variables from .env file
load_dotenv()
# Initialize Flask App
app = Flask(__name__)

# Configure Upload Folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB limit

# --- GEMINI CONFIGURATION ---
# Ensure you set your API key in your environment variables
# export API_KEY="your_api_key_here"
# --- GEMINI CONFIGURATION ---
api_key = "apikey" 

if not api_key:
    print("WARNING: API_KEY not found.")

# Remove the quotes around api_key here:
genai.configure(api_key=api_key)

# We use the same schema defined in your gemini.ts file
RESPONSE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "patientDetails": {
            "type": "STRING",
            "description": "Name, age, gender, and other identity details.",
            "nullable": True,
        },
        "diagnosis": {
            "type": "ARRAY",
            "items": {"type": "STRING"},
            "description": "List of diagnoses or conditions identified.",
        },
        "testResults": {
            "type": "ARRAY",
            "items": {"type": "STRING"},
            "description": "Key findings from lab tests or imaging.",
        },
        "medications": {
            "type": "ARRAY",
            "items": {"type": "STRING"},
            "description": "List of prescribed medications and dosages.",
        },
        "doctorsNotes": {
            "type": "STRING",
            "description": "Advice, follow-up instructions, or observations.",
            "nullable": True,
        },
        "generalSummary": {
            "type": "STRING",
            "description": "A clear, easy-to-understand summary paragraph.",
        },
    },
    "required": ["diagnosis", "testResults", "medications", "generalSummary"],
}

@app.route('/')
def index():
    """Render the homepage."""
    return render_template('index.html')

@app.route('/summarize', methods=['POST'])
def summarize():
    """Handle PDF upload and send to Gemini."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.pdf'):
        try:
            # Read file bytes directly
            file_content = file.read()
            
            # Prepare the model
            model = genai.GenerativeModel('gemini-2.5-flash') # Using 1.5-flash for speed/cost
            
            # Send to Gemini
            # We pass the raw PDF data + prompt, similar to your gemini.ts implementation
            response = model.generate_content(
                contents=[
                    {
                        "mime_type": "application/pdf",
                        "data": file_content
                    },
                    "Analyze this medical report PDF. Extract patient details, diagnosis, test results, prescribed medications, and doctor's notes. Provide a general summary. Return strictly JSON."
                ],
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    response_schema=RESPONSE_SCHEMA
                )
            )
            
            # Parse response
            json_response = json.loads(response.text)
            return jsonify({'success': True, 'data': json_response})

        except Exception as e:
            print(f"Error: {e}")
            return jsonify({'error': f'Processing failed: {str(e)}'}), 500

    return jsonify({'error': 'Invalid file type. Please upload a PDF.'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
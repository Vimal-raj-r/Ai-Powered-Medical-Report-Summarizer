
# MediSum - AI-Powered Medical Report Summarizer 🩺

MediSum is an intelligent web application designed to bridge the gap between complex medical documentation and patient understanding. By leveraging **Google's Gemini 1.5 Flash AI**, MediSum automatically parses PDF medical reports and extracts key insights into a clear, structured, and easy-to-read format.

![Project Status](https://img.shields.io/badge/Status-Prototype-blue)
![Python Version](https://img.shields.io/badge/Python-3.9%2B-green)
![License](https://img.shields.io/badge/License-MIT-purple)

## 🚀 Features

* **📄 PDF Parsing:** Instantly extracts raw text from uploaded medical PDF files using `PyPDF2`.
* **🤖 AI Analysis:** Uses Google's **Gemini 1.5 Flash** to interpret medical jargon and context.
* **📊 Structured Summary:** Automatically categorizes information into:
    * **Patient Details:** Name, Age, Gender.
    * **Diagnosis:** Identified conditions and diseases.
    * **Test Results:** Key lab findings and values.
    * **Medications:** Prescribed drugs and dosages.
    * **Doctor's Notes:** Clinical observations and instructions.
* **⚡ Fast & Responsive:** Lightweight Flask backend with a responsive HTML/CSS frontend.
* **🔒 Privacy-Focused:** Files are processed in memory and strictly for the duration of the session (no permanent storage).

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Backend:** Python (Flask)
* **AI Model:** Google Gemini 1.5 Flash (`google-generativeai`)
* **Utilities:** PyPDF2 (PDF Extraction), Dotenv (Config)

## 📂 Project Structure

```bash
medisum_flask/
│
├── app.py                # Main Flask application & AI logic
├── requirements.txt      # Python dependencies
├── .env                  # API Key configuration (Not committed)
├── static/
│   ├── style.css         # Custom styling (Medical Blue theme)
│   └── script.js         # Frontend logic (File handling & API calls)
└── templates/
    └── index.html        # Main User Interface



## ⚡ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/yourusername/medisum.git](https://github.com/yourusername/medisum.git)
cd medisum

```

### 2. Create a Virtual Environment (Optional but Recommended)

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

```

### 3. Install Dependencies

```bash
pip install -r requirements.txt

```

### 4. Configure API Key

1. Get a free API Key from [Google AI Studio](https://aistudio.google.com/).
2. Create a file named `.env` in the root folder.
3. Add your key inside:
```text
API_KEY=your_actual_api_key_here

```



### 5. Run the Application

```bash
python app.py

```

You will see output indicating the server is running. Open your browser and go to:
**https://www.google.com/search?q=http://127.0.0.1:5000**

## 📸 Screenshots

### Home Page

<img width="1920" height="1020" alt="Screenshot 2025-12-17 213931" src="https://github.com/user-attachments/assets/356ccfc8-31fd-4f75-a964-f04d82c78653" />


### Summary Result

<img width="1920" height="1020" alt="Screenshot 2025-12-17 214817" src="https://github.com/user-attachments/assets/ee86b6af-c7c9-45f6-a04d-f0227b83d7da" />
<img width="1920" height="1020" alt="Screenshot 2025-12-17 214853" src="https://github.com/user-attachments/assets/623594a9-d500-4d9b-9636-1cccdd4f82b1" />


## ⚠️ Disclaimer

**MediSum is for informational purposes only.** It uses Artificial Intelligence to summarize text and may occasionally make errors or hallucinations. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding your medical condition.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

```

And here is the `requirements.txt` content to go with it:

```text
Flask==3.0.0
google-generativeai==0.3.2
python-dotenv==1.0.0
PyPDF2==3.0.1
werkzeug>=3.0.1

```

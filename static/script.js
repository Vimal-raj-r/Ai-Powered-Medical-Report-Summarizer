document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  const fileInput = document.getElementById("pdfFile");
  const dropArea = document.getElementById("dropArea");
  const heroSection = document.getElementById("heroSection");
  const uploadSection = document.getElementById("uploadSection");
  const loadingSection = document.getElementById("loadingSection");
  const resultSection = document.getElementById("resultSection");
  const errorMessage = document.getElementById("errorMessage");
  const errorText = document.getElementById("errorText");
  const resetBtn = document.getElementById("resetBtn");

  // --- Event Listeners ---
  dropArea.addEventListener("click", () => fileInput.click());

  // Drag & Drop effects
  ["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        dropArea.classList.add("drag-active");
      },
      false
    );
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        dropArea.classList.remove("drag-active");
      },
      false
    );
  });

  dropArea.addEventListener("drop", (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  resetBtn.addEventListener("click", resetApp);

  // --- Main Logic ---
  function handleFiles(files) {
    if (files.length === 0) return;

    const file = files[0];
    if (file.type !== "application/pdf") {
      showError("Please upload a valid PDF file.");
      return;
    }

    uploadFile(file);
  }

  async function uploadFile(file) {
    // 1. Update UI to Loading State
    showError(null); // Clear errors
    uploadSection.classList.add("hidden");
    heroSection.classList.add("hidden");
    loadingSection.classList.remove("hidden");

    const formData = new FormData();
    formData.append("file", file);

    try {
      // 2. Send to Flask Backend
      const response = await fetch("/summarize", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Server error");
      }

      // 3. Render Results
      renderSummary(result.data);
    } catch (error) {
      console.error(error);
      loadingSection.classList.add("hidden");
      uploadSection.classList.remove("hidden");
      heroSection.classList.remove("hidden");
      showError("Failed to analyze report. " + error.message);
    }
  }

  function renderSummary(data) {
    loadingSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    // Populate Fields
    setText("resGeneralSummary", data.generalSummary);
    setText("resPatientDetails", data.patientDetails);
    setText("resNotes", data.doctorsNotes);

    renderList("resDiagnosis", data.diagnosis);
    renderList("resTests", data.testResults);
    renderList("resMeds", data.medications);

    // Re-run icons for new content
    lucide.createIcons();
  }

  // --- Helpers ---
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text || "None found.";
  }

  function renderList(id, items) {
    const ul = document.getElementById(id);
    ul.innerHTML = ""; // Clear previous
    if (!items || items.length === 0) {
      ul.innerHTML = '<li style="font-style:italic">None found.</li>';
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  function showError(msg) {
    if (msg) {
      errorText.textContent = msg;
      errorMessage.classList.remove("hidden");
    } else {
      errorMessage.classList.add("hidden");
    }
  }

  function resetApp() {
    resultSection.classList.add("hidden");
    uploadSection.classList.remove("hidden");
    heroSection.classList.remove("hidden");
    fileInput.value = ""; // Reset input
  }
});

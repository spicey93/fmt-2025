const steps = [
  "vrmDiv", // 0
  "serviceDiv", // 1
  "tyreSizeDiv", // 2
  "quantityDiv", // 3
  "locationDiv", // 4
  "fitmentDiv", // 5
  "customerDiv", // 6
];

let currentStep = 0;
let isTyreFlow = false;

const showStep = (index) => {
  steps.forEach((id, i) => {
    document.getElementById(id).classList.toggle("d-none", i !== index);
  });
};

const goToStep = (stepName) => {
  currentStep = steps.indexOf(stepName);
  showStep(currentStep);
};

const nextStep = () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
};

const backStep = () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
};

// Validators
const isVrmValid = () =>
  document.getElementById("vrmInput").value.trim() !== "";
const isTyreSizeValid = () =>
  [...document.querySelectorAll("#tyreSizeDiv select")].every(
    (sel) => sel.value.trim() !== ""
  );
const isQuantityValid = () =>
  document.querySelector("#quantityDiv select").value.trim() !== "";
const isLocationValid = () =>
  document.getElementById("postcodeInput").value.trim() !== "";
const isFitmentValid = () =>
  document.querySelector("#fitmentDiv select").value.trim() !== "";

// Step: VRM
document.getElementById("vrmBtn").addEventListener("click", () => {
  if (isVrmValid()) goToStep("serviceDiv");
  else alert("Please enter a registration.");
});

// Step: Service
document.getElementById("serviceBtn").addEventListener("click", () => {
  const selectedService = document.getElementById("serviceSelect").value;

  if (!selectedService) {
    alert("Please select a service.");
    return;
  }

  isTyreFlow =
    selectedService === "Mobile Tyre Fitting" ||
    selectedService === "Emergency Mobile Tyre Fitting" ||
    selectedService === "Puncture Repair";

  goToStep(isTyreFlow ? "tyreSizeDiv" : "locationDiv");
});

document.getElementById("serviceBackBtn").addEventListener("click", () => {
  goToStep("vrmDiv");
});

// Tyre Size
document.getElementById("tyreSizeBtn").addEventListener("click", () => {
  if (isTyreSizeValid()) goToStep("quantityDiv");
  else alert("Please select all tyre sizes.");
});

document.getElementById("tyreSizeBackBtn").addEventListener("click", () => {
  goToStep("serviceDiv");
});

// Quantity
document.getElementById("quantityBtn").addEventListener("click", () => {
  if (isQuantityValid()) goToStep("locationDiv");
  else alert("Please select quantity.");
});

document.getElementById("quantityBackBtn").addEventListener("click", () => {
  goToStep("tyreSizeDiv");
});

// Location
document.getElementById("postcodeBtn").addEventListener("click", () => {
  if (isLocationValid()) goToStep("fitmentDiv");
  else alert("Please enter a postcode.");
});

document.getElementById("locationBackBtn").addEventListener("click", () => {
  goToStep(isTyreFlow ? "quantityDiv" : "serviceDiv");
});

document.getElementById("coordinatesBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  const btn = document.getElementById("coordinatesBtn");
  btn.innerText = "Locating...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();
        const postcode = data.address.postcode;

        if (!postcode) {
          alert("Unable to detect postcode.");
          btn.innerText = "Share your location";
          return;
        }

        document.getElementById("postcodeInput").value = postcode;
        btn.innerText = "Share your location";
        goToStep("fitmentDiv");
      } catch {
        alert("Error retrieving location.");
        btn.innerText = "Share your location";
      }
    },
    () => {
      alert("Location permission denied.");
      btn.innerText = "Share your location";
    }
  );
});

// Fitment
document.getElementById("fitmentBtn").addEventListener("click", () => {
  if (isFitmentValid()) goToStep("customerDiv");
  else alert("Please select a fitment option.");
});

document.getElementById("fitmentBackBtn").addEventListener("click", () => {
  goToStep("locationDiv");
});

// Customer
document.getElementById("customerBackBtn").addEventListener("click", () => {
  goToStep("fitmentDiv");
});

// Enter key quick nav
document.getElementById("vrmInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (isVrmValid()) goToStep("serviceDiv");
    else alert("Please enter a registration.");
  }
});

document.getElementById("postcodeInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (isLocationValid()) goToStep("fitmentDiv");
    else alert("Please enter a postcode.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("urlInput").value = window.location.href;
  showStep(currentStep);
});

// ... existing code ...

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("urlInput").value = window.location.href;
  showStep(currentStep);
});

// Handle form submission
const form = document.querySelector('form[name="Contact"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission
  
  const submitBtn = document.getElementById('customerBtn');
  const originalText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
  
  try {
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Send to API
    const response = await fetch('https://app.tyreemergency.com/api/freeway/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Hide form and show success message
      document.getElementById('quoteForm').innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
          <h3 class="mt-3">Thank you!</h3>
          <p class="lead">Your enquiry has been sent successfully.</p>
          <p>We'll be in touch shortly.</p>
        </div>
      `;
    } else {
      throw new Error(result.message || 'Submission failed');
    }
    
  } catch (error) {
    console.error('Error:', error);
    alert('Sorry, there was an error sending your enquiry. Please call us on 0800 7311 260');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

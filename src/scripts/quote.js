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
// Assume the tyre flow until a service is chosen, so the step count starts at the longest path
let isTyreFlow = true;

const errorEl = document.querySelector("[data-quote-error]");
const stepEl = document.querySelector("[data-quote-step]");
const totalEl = document.querySelector("[data-quote-total]");
const progressEl = document.querySelector("[data-quote-progress]");

// Non-tyre services skip the tyre size and quantity steps
const visibleSteps = () =>
  isTyreFlow ? steps : steps.filter((id) => id !== "tyreSizeDiv" && id !== "quantityDiv");

const showError = (message) => {
  if (!errorEl) return alert(message);
  errorEl.textContent = message;
  errorEl.classList.remove("d-none");
};

const clearError = () => errorEl?.classList.add("d-none");

const showStep = (index) => {
  clearError();
  steps.forEach((id, i) => {
    document.getElementById(id).classList.toggle("d-none", i !== index);
  });

  const flow = visibleSteps();
  const position = Math.max(flow.indexOf(steps[index]), 0) + 1;
  if (stepEl) stepEl.textContent = String(position);
  if (totalEl) totalEl.textContent = String(flow.length);
  if (progressEl) progressEl.style.width = `${(position / flow.length) * 100}%`;
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
  else showError("Please enter a registration.");
});

// Step: Service
document.getElementById("serviceBtn").addEventListener("click", () => {
  const selectedService = document.getElementById("serviceSelect").value;

  if (!selectedService) {
    showError("Please select a service.");
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
  else showError("Please select all tyre sizes.");
});

document.getElementById("tyreSizeBackBtn").addEventListener("click", () => {
  goToStep("serviceDiv");
});

// Quantity
document.getElementById("quantityBtn").addEventListener("click", () => {
  if (isQuantityValid()) goToStep("locationDiv");
  else showError("Please select quantity.");
});

document.getElementById("quantityBackBtn").addEventListener("click", () => {
  goToStep("tyreSizeDiv");
});

// Location
document.getElementById("postcodeBtn").addEventListener("click", () => {
  if (isLocationValid()) goToStep("fitmentDiv");
  else showError("Please enter a postcode.");
});

document.getElementById("locationBackBtn").addEventListener("click", () => {
  goToStep(isTyreFlow ? "quantityDiv" : "serviceDiv");
});

document.getElementById("coordinatesBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser.");
    return;
  }

  const btn = document.getElementById("coordinatesBtn");
  const btnLabel = btn.innerHTML;
  btn.innerText = "Locating...";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        const postcode = data.address?.postcode;

        if (!postcode) {
          showError("Unable to detect postcode.");
          btn.innerHTML = btnLabel;
          return;
        }

        document.getElementById("postcodeInput").value = postcode;
        btn.innerHTML = btnLabel;
        goToStep("fitmentDiv");
      } catch {
        showError("Error retrieving location.");
        btn.innerHTML = btnLabel;
      }
    },
    () => {
      showError("Location permission denied.");
      btn.innerHTML = btnLabel;
    }
  );
});

// Fitment
document.getElementById("fitmentBtn").addEventListener("click", () => {
  if (isFitmentValid()) goToStep("customerDiv");
  else showError("Please select a fitment option.");
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
    else showError("Please enter a registration.");
  }
});

document.getElementById("postcodeInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (isLocationValid()) goToStep("fitmentDiv");
    else showError("Please enter a postcode.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("urlInput").value = window.location.href;
  showStep(currentStep);
});



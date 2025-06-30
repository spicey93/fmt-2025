document.addEventListener("click", async function (e) {
  const link = e.target.closest('a[href^="tel:"]');
  if (!link) return;

  // Prevent immediate redirect to tel: for a moment
  e.preventDefault();

  // Extract URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const queryObject = {};
  for (const [key, value] of queryParams.entries()) {
    queryObject[key] = value;
  }

  // Send API request
  try {
    await fetch("https://safe-island-80193.herokuapp.com/phone", {
      method: "POST",
      body: JSON.stringify({
        event: "call_initiated",
        timestamp: new Date().toISOString(),
        urlParams: queryObject,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("API call failed", err);
  }

  // Proceed to dial after short delay
  setTimeout(() => {
    window.location.href = link.href;
  }, 300); // Adjust delay as needed
});

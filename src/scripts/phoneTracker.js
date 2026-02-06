document.addEventListener("click", async function (e) {
  const link = e.target.closest('a[href^="tel:"]');
  if (!link) return;

  // Prevent immediate redirect to tel: for a moment
  e.preventDefault();

  // Extract URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const queryObject = {};
  for (const [key, value] of queryParams.entries()) {
    queryObject[key.replace(/-/g, '_')] = value;
  }

  // Send API request with timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    await fetch("https://safe-island-80193.herokuapp.com/phone", {
      method: "POST",
      body: JSON.stringify({
        url: window.location.href,
        event: "call_initiated",
        timestamp: new Date().toISOString(),
        urlParams: queryObject,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
  } catch (err) {
    // Silently handle errors - don't interrupt user flow
  }

  // Proceed to dial after short delay
  setTimeout(() => {
    window.location.href = link.href;
  }, 300); // Adjust delay as needed
});

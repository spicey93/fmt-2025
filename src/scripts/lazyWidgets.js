const containers = document.querySelectorAll("[data-elfsight-lazy]");

if (containers.length) {
  let loaded = false;
  const loadElfsight = () => {
    if (loaded) return;
    loaded = true;
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) loadElfsight();
    },
    { rootMargin: "200px" }
  );

  containers.forEach((el) => observer.observe(el));
}

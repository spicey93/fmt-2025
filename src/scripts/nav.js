const header = document.querySelector("[data-header]");
const toggler = document.querySelector("[data-nav-toggle]");
const panel = document.getElementById("navbar");

const setOpen = (isOpen) => {
  if (!toggler || !panel) return;
  if (isOpen && header) {
    header.style.setProperty("--nav-offset", `${header.getBoundingClientRect().bottom}px`);
  }
  panel.classList.toggle("is-open", isOpen);
  toggler.classList.toggle("is-open", isOpen);
  toggler.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
};

if (toggler && panel) {
  toggler.addEventListener("click", () => {
    setOpen(!panel.classList.contains("is-open"));
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1080) setOpen(false);
  });
}

if (header) {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

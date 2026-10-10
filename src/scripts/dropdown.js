const toggles = document.querySelectorAll("[data-dropdown-toggle]");

const closeAll = (except) => {
  toggles.forEach((toggle) => {
    if (toggle === except) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.closest("[data-dropdown]")?.classList.remove("is-open");
  });
};

toggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    const wrapper = toggle.closest("[data-dropdown]");
    if (!wrapper) return;
    const isOpen = wrapper.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    closeAll(toggle);
  });
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element) || !event.target.closest("[data-dropdown]")) {
    closeAll(null);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeAll(null);
});

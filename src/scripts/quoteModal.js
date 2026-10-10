// On mobile the hero quote form is hidden and opened as a modal from any link to "#quoteForm".
// On desktop the form sits inline in the hero, so those links just scroll to it as normal.
const modal = document.querySelector("[data-quote-modal]");
const mobile = window.matchMedia("(max-width: 991px)");

if (modal) {
  const panel = modal.querySelector("[data-quote-panel]");
  let lastFocused = null;

  const isOpen = () => modal.classList.contains("is-open");

  const open = () => {
    if (isOpen()) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    panel?.setAttribute("role", "dialog");
    panel?.setAttribute("aria-modal", "true");
    panel?.setAttribute("aria-label", "Get a free quote");
    document.body.style.overflow = "hidden";

    // Move focus to the dialog itself rather than the first field: focusing an input
    // pops up the on-screen keyboard, which covers the form before people can read it
    panel?.setAttribute("tabindex", "-1");
    panel?.focus({ preventScroll: true });
  };

  const close = () => {
    if (!isOpen()) return;
    modal.classList.remove("is-open");
    panel?.removeAttribute("role");
    panel?.removeAttribute("aria-modal");
    panel?.removeAttribute("aria-label");
    panel?.removeAttribute("tabindex");
    document.body.style.overflow = "";
    if (modal.contains(document.activeElement)) document.activeElement.blur();
    if (lastFocused instanceof HTMLElement && lastFocused !== document.body) {
      lastFocused.focus({ preventScroll: true });
    }
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    if (event.target.closest("[data-quote-close]")) {
      close();
      return;
    }

    const link = event.target.closest('a[href$="#quoteForm"]');
    if (!link || !mobile.matches) return;

    // Only intercept links that point at the form on this page
    const url = new URL(link.href, window.location.href);
    if (url.pathname !== window.location.pathname) return;

    event.preventDefault();
    open();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  mobile.addEventListener("change", (event) => {
    if (!event.matches) close();
  });

  // Arriving via "/#quoteForm" (e.g. the About or Contact CTAs), on load or as an in-page hash change
  const openFromHash = () => {
    if (window.location.hash !== "#quoteForm" || !mobile.matches) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    open();
  };

  openFromHash();
  window.addEventListener("hashchange", openFromHash);
}

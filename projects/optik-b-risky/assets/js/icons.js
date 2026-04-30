/* Inline the SVG sprite into <body> on load.
   Avoids CORS quirks of <use href="external.svg#id"> on file:// and gives
   currentColor styling for every icon. Lightweight, no framework. */
(async function () {
  // resolve sprite path relative to *this* script regardless of page depth
  const SCRIPT_URL = (document.currentScript && document.currentScript.src) ||
                     Array.from(document.scripts).map(s => s.src).find(s => s && s.includes("icons.js")) || "";
  const SPRITE_URL = SCRIPT_URL.replace(/\/[^/]*icons\.js.*$/, "/../icons/sprite.svg");
  try {
    const res = await fetch(SPRITE_URL);
    if (!res.ok) return;
    const text = await res.text();
    const wrap = document.createElement("div");
    wrap.style.display = "none";
    wrap.innerHTML = text;
    document.body.insertBefore(wrap, document.body.firstChild);
  } catch (e) {
    console.warn("icon sprite load failed", e);
  }
})();

// helper: <i data-icon="eye"></i>  →  inline svg use
document.addEventListener("DOMContentLoaded", () => {
  const observe = () => {
    document.querySelectorAll("[data-icon]:not([data-icon-rendered])").forEach((el) => {
      const id = el.getAttribute("data-icon");
      el.innerHTML = `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
      el.setAttribute("data-icon-rendered", "");
    });
  };
  observe();
  // re-render after sprite finishes loading
  setTimeout(observe, 100);
  setTimeout(observe, 500);
});

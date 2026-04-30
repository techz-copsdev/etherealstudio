/* ============================================================
   ICON LOADER — load each icon from /assets/icons/svg/{name}.svg
   ============================================================
   Why per-file (bukan sprite):
   - User bisa drop file SVG asset baru langsung untuk override
   - Tiap file ada komentar REPLACE-ME
   - Filesystem-based override sederhana, no build step

   Markup didukung:
   - <i data-icon="alamat"></i>  → otomatis di-render jadi inline SVG dari assets/icons/svg/alamat.svg
   - <img class="ico" src="assets/icons/svg/alamat.svg" alt=""> juga jalan natively (cara langsung)

   Mapping legacy: jika data-icon=name lama, alias-kan ke file baru.
*/

(function () {
  // resolve base path "assets/icons/svg/" relative to this script
  const SCRIPT_URL =
    (document.currentScript && document.currentScript.src) ||
    Array.from(document.scripts).map((s) => s.src).find((s) => s && s.includes("icons.js")) ||
    "";
  const ICON_BASE = SCRIPT_URL.replace(/\/[^/]*icons\.js.*$/, "/../icons/svg/");

  // alias map: nama lama → nama file baru
  const ALIAS = {
    "eye": "kacamata",
    "map-pin": "alamat",
    "tag": "harga",
    "crosshair": "target",
    "lens": "lensa",
  };

  const cache = new Map();

  async function fetchIcon(name) {
    const real = ALIAS[name] || name;
    if (cache.has(real)) return cache.get(real);
    const p = fetch(ICON_BASE + real + ".svg")
      .then((r) => (r.ok ? r.text() : null))
      .then((txt) => {
        if (!txt) return null;
        // strip XML decl + comments to keep DOM clean
        return txt.replace(/<\?xml[^>]*\?>/, "").replace(/<!--[\s\S]*?-->/g, "").trim();
      })
      .catch(() => null);
    cache.set(real, p);
    return p;
  }

  async function renderEl(el) {
    if (el.hasAttribute("data-icon-rendered")) return;
    const name = el.getAttribute("data-icon");
    const svgText = await fetchIcon(name);
    if (svgText) {
      el.innerHTML = svgText;
      el.setAttribute("data-icon-rendered", "");
    } else {
      // fallback: small dot if asset missing
      el.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>';
      el.setAttribute("data-icon-rendered", "");
    }
  }

  function renderAll(root = document) {
    root.querySelectorAll("[data-icon]:not([data-icon-rendered])").forEach(renderEl);
  }

  // expose for re-render after innerHTML overwrites
  window.OBRIcons = { render: renderAll, renderEl };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => renderAll());
  } else {
    renderAll();
  }
})();

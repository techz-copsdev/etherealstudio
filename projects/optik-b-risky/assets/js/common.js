/* Theme toggle: stores preference in localStorage, default = system */
(function () {
  const KEY = "obr-theme";
  const html = document.documentElement;

  const apply = (t) => html.setAttribute("data-theme", t);

  const stored = localStorage.getItem(KEY);
  const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply(stored || (sysDark ? "dark" : "light"));

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const cur = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "dark" ? "light" : "dark";
    apply(next);
    localStorage.setItem(KEY, next);
  });
})();

/* tiny shared helpers */
window.OBR = {
  fmtTime(d = new Date()) {
    return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  },
  initial(name) {
    return (name || "?").trim().split(/\s+/).map(s => s[0]).slice(0, 2).join("").toUpperCase();
  },
  // mock branches — single source of truth for prototype
  branches: [
    {
      id: "krian",
      name: "Krian — Pusat",
      address: "Ruko Central Point, Jl. Mayjen Bambang Yuwono, Sidodadi, Kemangsen, Krian, Sidoarjo",
      lat: -7.4118, lng: 112.5780,
      phone: "+62 851-2329-7477",
      hours: "09.00 — 20.00",
      online: true
    },
    {
      id: "sidoarjo",
      name: "Sidoarjo — Kota",
      address: "Jl. Diponegoro No. 24, Sidoarjo Kota, Jawa Timur",
      lat: -7.4478, lng: 112.7183,
      phone: "+62 851-2329-7478",
      hours: "09.00 — 20.00",
      online: true
    },
    {
      id: "surabaya",
      name: "Surabaya — Wiyung",
      address: "Jl. Raya Menganti No. 88, Wiyung, Surabaya",
      lat: -7.3160, lng: 112.6932,
      phone: "+62 851-2329-7479",
      hours: "10.00 — 21.00",
      online: false
    },
    {
      id: "mojokerto",
      name: "Mojokerto — Kranggan",
      address: "Jl. Mojopahit No. 112, Kranggan, Mojokerto",
      lat: -7.4732, lng: 112.4338,
      phone: "+62 851-2329-7480",
      hours: "09.00 — 19.00",
      online: true
    }
  ],
  haversine(a, b) {
    const R = 6371;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const s = Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }
};

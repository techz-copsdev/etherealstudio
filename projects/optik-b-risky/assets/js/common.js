/* Optik B Risky — common helpers, mock data, theme, animations */
(function () {
  const KEY_THEME = "obr-theme";
  const root = document.documentElement;

  // ---- theme ----
  const userTheme = localStorage.getItem(KEY_THEME);
  const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = userTheme || (sysDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  function setTheme(next, e) {
    // Use View Transitions API if available, with circle reveal from click point
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = document.startViewTransition(() => {
        root.setAttribute("data-theme", next);
        localStorage.setItem(KEY_THEME, next);
      });
      t.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${r}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: "cubic-bezier(.2,.8,.2,1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      root.setAttribute("data-theme", next);
      localStorage.setItem(KEY_THEME, next);
    }
  }

  document.addEventListener("click", (ev) => {
    const t = ev.target.closest("[data-theme-toggle]");
    if (!t) return;
    const cur = root.getAttribute("data-theme") || "light";
    setTheme(cur === "dark" ? "light" : "dark", ev);
  });

  // ---- helpers ----
  function fmtTime(d) {
    const dt = d ? new Date(d) : new Date();
    return dt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  }
  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
  }
  function fmtIDR(n) {
    return "Rp" + n.toLocaleString("id-ID");
  }
  function haversine(a, b) {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }

  // ---- branches ----
  const branches = [
    {
      id: "krian",
      name: "Krian — Pusat",
      addr: "Ruko Central Point, Jl. Mayjen Bambang Yuwono, Sidodadi, Kemangsen",
      city: "Krian, Sidoarjo",
      lat: -7.4131, lng: 112.5836,
      phone: "+6285123297477",
      hours: "09.00 — 20.00",
      online: true,
      since: 2014,
    },
    {
      id: "sidoarjo",
      name: "Sidoarjo — Kota",
      addr: "Jl. Ahmad Yani No. 88, Pucang, Kec. Sidoarjo",
      city: "Sidoarjo Kota",
      lat: -7.4477, lng: 112.7170,
      phone: "+6285123297477",
      hours: "09.00 — 20.00",
      online: true,
      since: 2017,
    },
    {
      id: "surabaya",
      name: "Surabaya — Selatan",
      addr: "Jl. Wonokromo No. 22, Wonokromo, Kec. Wonokromo",
      city: "Surabaya",
      lat: -7.3017, lng: 112.7367,
      phone: "+6285123297477",
      hours: "09.00 — 21.00",
      online: false,
      since: 2019,
    },
    {
      id: "mojokerto",
      name: "Mojokerto — Pasar Tanjung",
      addr: "Jl. Bhayangkara No. 14, Magersari",
      city: "Mojokerto",
      lat: -7.4720, lng: 112.4337,
      phone: "+6285123297477",
      hours: "09.00 — 19.00",
      online: true,
      since: 2021,
    },
  ];

  // ---- assets / CDN images ----
  // semua dari Pexels (free-use, royalty-free). Ganti dengan self-hosted nanti.
  const PX = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;
  const PX_S = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;

  const assets = {
    heroPortrait: PX(2766408),                 // model with glasses
    storeInterior: PX(5668774),                // optical store interior
    examEquipment: PX(5705492),                // optometry equipment
    framesFlatlay: PX(1493111),                // frames flatlay
    framesAccent: PX(1362558),                 // round glasses on book
    glassesHero: "https://images.pexels.com/photos/1362558/pexels-photo-1362558.jpeg?auto=compress&cs=tinysrgb&w=800",
    // collection of real product shots, used cycled through catalog
    // verified eyewear-only — small pool, cycled across 18 catalog items
    framePool: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80",          // tortoise round acetate
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",          // black square frames
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80",          // wood sunglasses floating
      PX_S(1362558),                                                                                            // wood frames blue-lens
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80&sat=-30",   // tortoise (sat var)
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80&sat=-30",   // black (sat var)
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80&hue=180",   // alt tortoise
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80&hue=90",    // alt square
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80&hue=45",    // alt wood
    ],
  };

  // ---- catalog (mock) ----
  // shape ∈ round | square | aviator | cat | brow | wayfarer
  // gender ∈ male | female | unisex | kids
  // material ∈ acetate | metal | titanium | tr90
  const catalog = [
    {
      id: "linea-01", name: "Linea Nº 01", sub: "Round / Acetate",
      shape: "round", gender: "unisex", material: "acetate",
      colors: ["#0a0908", "#a85a37", "#1e3aff"],
      price: 695000, priceOld: 850000,
      badges: ["NEW"],
      desc: "Bingkai bundar tebal acetate Italia. Karakter klasik dengan engsel pegas tahan banting.",
    },
    {
      id: "studio-02", name: "Studio Nº 02", sub: "Square / Titanium",
      shape: "square", gender: "male", material: "titanium",
      colors: ["#1f2933", "#8e8a83", "#ff4d2e"],
      price: 1250000,
      badges: ["BEST"],
      desc: "Kerangka titanium ringan 12g. Bidang kotak dengan ujung membulat untuk profil tegas.",
    },
    {
      id: "aero-03", name: "Aero Nº 03", sub: "Aviator / Metal",
      shape: "aviator", gender: "unisex", material: "metal",
      colors: ["#b78a3f", "#0a0908", "#7a8c95"],
      price: 875000,
      badges: [],
      desc: "Teardrop aviator stainless. Hidung silikon adjustable, lensa tone abu-soft.",
    },
    {
      id: "cinta-04", name: "Cinta Nº 04", sub: "Cat-eye / Acetate",
      shape: "cat", gender: "female", material: "acetate",
      colors: ["#0a0908", "#9e2a3f", "#caa680"],
      price: 980000, priceOld: 1150000,
      badges: ["LIMITED"],
      desc: "Sudut cat-eye lembut, dimensi optimal untuk wajah oval & heart.",
    },
    {
      id: "klub-05", name: "Klub Nº 05", sub: "Browline / Mixed",
      shape: "brow", gender: "male", material: "acetate",
      colors: ["#0a0908", "#3a2a1c"],
      price: 1100000,
      badges: [],
      desc: "Atas tebal acetate, bawah metal halus. Ikon sejak dekade 50-an.",
    },
    {
      id: "wave-06", name: "Wave Nº 06", sub: "Wayfarer / TR-90",
      shape: "wayfarer", gender: "unisex", material: "tr90",
      colors: ["#0a0908", "#1e3aff", "#c8a06c"],
      price: 540000,
      badges: ["POPULER"],
      desc: "TR-90 fleksibel, ringan, dan nyaman dipakai harian dari pagi sampai malam.",
    },
    {
      id: "mini-07", name: "Mini Nº 07", sub: "Round / Kids",
      shape: "round", gender: "kids", material: "tr90",
      colors: ["#1e3aff", "#ff4d2e", "#22c55e"],
      price: 320000,
      badges: ["KIDS"],
      desc: "Khusus anak. Engsel berputar 180°, bahan aman & lentur.",
    },
    {
      id: "panel-08", name: "Panel Nº 08", sub: "Square / Acetate",
      shape: "square", gender: "female", material: "acetate",
      colors: ["#3b2a4a", "#0a0908", "#caa680"],
      price: 740000,
      badges: [],
      desc: "Kotak proporsi medium dengan tail temple bermotif marble.",
    },
    {
      id: "halo-09", name: "Halo Nº 09", sub: "Round / Metal",
      shape: "round", gender: "female", material: "metal",
      colors: ["#caa680", "#b78a3f", "#0a0908"],
      price: 685000,
      badges: [],
      desc: "Lingkaran tipis stainless. Vintage minimalis, cocok foto profesional.",
    },
    {
      id: "linear-10", name: "Linear Nº 10", sub: "Wayfarer / Acetate",
      shape: "wayfarer", gender: "male", material: "acetate",
      colors: ["#0a0908", "#1c2230"],
      price: 920000, priceOld: 1080000,
      badges: ["BEST"],
      desc: "Wayfarer klasik proporsi besar. Hadir dengan case kulit dan kain microfiber.",
    },
    {
      id: "tora-11", name: "Tora Nº 11", sub: "Cat-eye / Metal",
      shape: "cat", gender: "female", material: "metal",
      colors: ["#b78a3f", "#0a0908", "#9e2a3f"],
      price: 760000,
      badges: ["NEW"],
      desc: "Cat-eye versi metal. Detail rim emas tipis, end-piece runcing.",
    },
    {
      id: "riku-12", name: "Riku Nº 12", sub: "Aviator / Titanium",
      shape: "aviator", gender: "male", material: "titanium",
      colors: ["#7a8c95", "#0a0908", "#b78a3f"],
      price: 1480000,
      badges: ["PRO"],
      desc: "Aviator titanium murni. Bahan medical-grade, hipoalergenik untuk kulit sensitif.",
    },
    {
      id: "nova-13", name: "Nova Nº 13", sub: "Square / TR-90",
      shape: "square", gender: "unisex", material: "tr90",
      colors: ["#0a0908", "#1e3aff", "#1f2933"],
      price: 380000,
      badges: ["DAILY"],
      desc: "Frame harian. Tahan keringat, bobot 14g. Pilihan paling banyak dipakai pelajar.",
    },
    {
      id: "azure-14", name: "Azure Nº 14", sub: "Browline / Metal",
      shape: "brow", gender: "unisex", material: "metal",
      colors: ["#0a0908", "#caa680"],
      price: 990000,
      badges: [],
      desc: "Browline metal — atas dan bawah keduanya logam. Look modern executive.",
    },
    {
      id: "hexa-15", name: "Hexa Nº 15", sub: "Cat-eye / Kids",
      shape: "cat", gender: "kids", material: "tr90",
      colors: ["#ff4d2e", "#1e3aff", "#caa680"],
      price: 295000,
      badges: ["KIDS"],
      desc: "Cat-eye anak. Tail dengan motif glitter halus, nyaman untuk hidung kecil.",
    },
    {
      id: "oslo-16", name: "Oslo Nº 16", sub: "Square / Acetate",
      shape: "square", gender: "male", material: "acetate",
      colors: ["#0a0908", "#3a2a1c", "#1c2230"],
      price: 850000,
      badges: ["NEW"],
      desc: "Acetate tebal Italia, lugas, tegas. Ukuran besar untuk wajah lebar.",
    },
    {
      id: "polar-17", name: "Polar Nº 17", sub: "Round / Acetate",
      shape: "round", gender: "female", material: "acetate",
      colors: ["#9e2a3f", "#caa680", "#0a0908"],
      price: 720000,
      badges: [],
      desc: "Round size kecil 48mm. Cocok untuk look reading vintage.",
    },
    {
      id: "bento-18", name: "Bento Nº 18", sub: "Wayfarer / Titanium",
      shape: "wayfarer", gender: "unisex", material: "titanium",
      colors: ["#1f2933", "#7a8c95", "#0a0908"],
      price: 1320000,
      badges: ["PRO"],
      desc: "Wayfarer titanium ultra-lite 9.8g. Hampir tak terasa saat dipakai.",
    },
  ];

  // ---- glasses SVG renderer (3D-layered) ----
  function frameSVG(item, opts = {}) {
    const c = item.colors[0];
    const c2 = item.colors[1] || c;
    const lens = "rgba(94, 108, 255, 0.18)";
    const lensStroke = c;
    const w = 360, h = 160;

    // base shape paths per family
    const shapes = {
      round: `<circle cx="100" cy="80" r="52" fill="${lens}" stroke="${lensStroke}" stroke-width="6" />
              <circle cx="260" cy="80" r="52" fill="${lens}" stroke="${lensStroke}" stroke-width="6" />`,
      square: `<rect x="48" y="36" width="104" height="80" rx="14" fill="${lens}" stroke="${lensStroke}" stroke-width="6"/>
               <rect x="208" y="36" width="104" height="80" rx="14" fill="${lens}" stroke="${lensStroke}" stroke-width="6"/>`,
      aviator: `<path d="M 50 50 Q 60 30 100 30 Q 150 30 158 50 Q 162 90 130 120 Q 110 130 90 130 Q 60 130 52 100 Z"
                  fill="${lens}" stroke="${lensStroke}" stroke-width="6" />
                <path d="M 202 50 Q 210 30 260 30 Q 300 30 310 50 Q 308 100 280 120 Q 260 130 240 130 Q 208 130 202 100 Z"
                  fill="${lens}" stroke="${lensStroke}" stroke-width="6" />`,
      cat: `<path d="M 40 70 Q 50 30 110 32 Q 158 36 158 70 Q 152 100 130 116 Q 100 124 70 116 Q 44 102 40 70 Z"
              fill="${lens}" stroke="${lensStroke}" stroke-width="6" />
            <path d="M 202 70 Q 202 36 250 32 Q 310 30 320 70 Q 316 102 290 116 Q 260 124 230 116 Q 208 100 202 70 Z"
              fill="${lens}" stroke="${lensStroke}" stroke-width="6" />`,
      brow: `<path d="M 44 36 Q 100 24 152 36 L 152 80 Q 100 96 50 84 Q 44 70 44 36 Z" fill="${c}" />
             <path d="M 50 84 Q 100 96 152 80 Q 150 110 130 118 Q 100 124 72 118 Q 54 108 50 84 Z" fill="${lens}" stroke="${lensStroke}" stroke-width="3"/>
             <path d="M 208 36 Q 260 24 316 36 Q 316 70 310 84 Q 260 96 208 80 Z" fill="${c}" />
             <path d="M 208 80 Q 260 96 310 84 Q 308 108 290 118 Q 260 124 230 118 Q 210 110 208 80 Z" fill="${lens}" stroke="${lensStroke}" stroke-width="3"/>`,
      wayfarer: `<path d="M 52 38 L 148 38 Q 158 38 156 60 L 150 110 Q 144 124 120 124 L 80 124 Q 56 124 52 110 Z"
                  fill="${lens}" stroke="${lensStroke}" stroke-width="6"/>
                <path d="M 212 38 L 308 38 Q 312 38 310 60 L 304 110 Q 300 124 280 124 L 240 124 Q 216 124 212 110 Z"
                  fill="${lens}" stroke="${lensStroke}" stroke-width="6"/>`,
    };
    const lensSet = shapes[item.shape] || shapes.square;

    // bridge + nose pads + temples
    const front = `
      <g class="g-front">
        ${lensSet}
        <line x1="158" y1="78" x2="202" y2="78" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
        <line x1="158" y1="68" x2="202" y2="68" stroke="${c2}" stroke-width="2" opacity="0.45"/>
      </g>`;

    const temples = `
      <g class="g-temple-l" style="transform-origin: 48px 78px;">
        <line x1="48" y1="78" x2="6" y2="62" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
      </g>
      <g class="g-temple-r" style="transform-origin: 312px 78px;">
        <line x1="312" y1="78" x2="354" y2="62" stroke="${c}" stroke-width="6" stroke-linecap="round"/>
      </g>`;

    const reflections = `
      <g class="g-reflect" opacity="0.65">
        <path d="M 70 50 Q 86 56 92 80" stroke="rgba(255,255,255,0.55)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 230 50 Q 246 56 252 80" stroke="rgba(255,255,255,0.55)" stroke-width="3" stroke-linecap="round" fill="none"/>
      </g>`;

    return `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="frame-svg">
        ${temples}
        ${front}
        ${reflections}
      </svg>
    `;
  }

  // ---- 3D tilt: card hover & modal cursor parallax ----
  function bindTilt(card, opts = {}) {
    const max = opts.max || 14;
    const inner = card.querySelector("[data-tilt]") || card.querySelector(".frame-svg");
    if (!inner) return;
    function onMove(e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      // shine
      const shine = card.querySelector(".frame-shine");
      if (shine) {
        shine.style.setProperty("--mx", x * 100 + "%");
        shine.style.setProperty("--my", y * 100 + "%");
      }
    }
    function onLeave() { inner.style.transform = ""; }
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  }

  // ---- magnetic button ----
  function bindMagnet(el, strength = 0.25) {
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    function onLeave() { el.style.transform = ""; }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
  }

  // ---- reveal on scroll ----
  function setupReveal() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => obs.observe(el));
  }

  // ---- counter animation ----
  function animateCounter(el, target, duration = 1400) {
    const start = performance.now();
    const from = 0;
    const suffix = el.dataset.suffix || "";
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = Math.round(from + (target - from) * ease);
      el.textContent = val.toLocaleString("id-ID") + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function setupCounters() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const v = parseInt(el.dataset.count, 10);
            if (!isNaN(v)) animateCounter(el, v);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => obs.observe(el));
  }

  // ---- page loader ----
  function setupLoader() {
    requestAnimationFrame(() => {
      setTimeout(() => document.body.classList.add("loaded"), 1900);
    });
  }

  // ---- ASSET RESOLUTION ----
  // setiap item katalog: prioritas (1) /assets/catalog/{id}-front.{svg|jpg|png}
  //                       (2) framePool CDN (Pexels/Unsplash) sebagai fallback
  // user tinggal drop file foto produk dengan nama yang sama — JS otomatis pakai itu.
  // base resolved relative to where common.js script tag lives (so works from any page depth)
  const COMMON_SCRIPT =
    (document.currentScript && document.currentScript.src) ||
    Array.from(document.scripts).map((s) => s.src).find((s) => s && s.includes("common.js")) ||
    "";
  const ASSET_BASE = COMMON_SCRIPT.replace(/\/[^/]*common\.js.*$/, "/../");
  function localCatalogPath(id, ext) { return ASSET_BASE + `catalog/${id}-front.${ext}`; }

  catalog.forEach((it, i) => {
    it.image = localCatalogPath(it.id, "svg");
    it.imageFallback = assets.framePool[i % assets.framePool.length];
    it.imageJpg = localCatalogPath(it.id, "jpg");
    it.imagePng = localCatalogPath(it.id, "png");
  });

  // ---- expose ----
  window.OBR = {
    branches,
    catalog,
    assets,
    fmtTime,
    initials,
    fmtIDR,
    haversine,
    frameSVG,
    bindTilt,
    bindMagnet,
    setupReveal,
    setupCounters,
    setupLoader,
    setTheme,
  };

  document.addEventListener("DOMContentLoaded", () => {
    setupLoader();
    setupReveal();
    setupCounters();
    // bind magnets to anything tagged
    document.querySelectorAll(".magnet").forEach((el) => bindMagnet(el, 0.18));
  });
})();

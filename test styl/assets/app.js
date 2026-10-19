/* ============================================================
   Tooliva Design System — App Engine
   Generic i18n engine (reads window.I18N_AR / I18N_EN),
   accent switch, header, dropdowns, search/filter, counters,
   mock loop, FAQ, dropzone, power pack.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Icons ---------- */
  var ICONS = {
    file: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    image: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
    merge: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="13" height="13" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v11"/></svg>',
    split: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12"/></svg>',
    compress: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    ocr: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>',
    qr: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 21h-4v-4"/></svg>',
    lock: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>'
  };

  /* ---------- Tools data ---------- */
  var TOOLS = [
    { slug: "pdf-to-word", cat: "convert", icon: "file", status: "on", href: "tool-page.html", t: { ar: ["PDF إلى Word", "حوّل مستندات PDF إلى ملفات Word قابلة للتحرير بدقة وسرعة."], en: ["PDF to Word", "Convert PDF documents into editable Word files, fast and accurate."] } },
    { slug: "word-to-pdf", cat: "convert", icon: "file", status: "on", href: "#", t: { ar: ["Word إلى PDF", "حوّل مستندات Word إلى ملفات PDF احترافية."], en: ["Word to PDF", "Convert Word documents into professional PDF files."] } },
    { slug: "pdf-to-images", cat: "convert", icon: "image", status: "on", href: "#", t: { ar: ["PDF إلى صور", "حوّل كل صفحة من صفحات PDF إلى صورة PNG أو JPEG."], en: ["PDF to Images", "Turn each PDF page into a PNG or JPEG image."] } },
    { slug: "merge-pdf", cat: "organize", icon: "merge", status: "on", href: "#", t: { ar: ["دمج PDF", "ادمج ملفات PDF متعددة في مستند واحد بسهولة."], en: ["Merge PDF", "Combine multiple PDFs into one document easily."] } },
    { slug: "split-pdf", cat: "organize", icon: "split", status: "on", href: "#", t: { ar: ["تقسيم PDF", "قسّم ملف PDF إلى عدة ملفات منفصلة."], en: ["Split PDF", "Split a PDF into multiple separate files."] } },
    { slug: "compress-pdf", cat: "organize", icon: "compress", status: "on", href: "#", t: { ar: ["ضغط PDF", "قلّل حجم ملف PDF مع الحفاظ على الجودة."], en: ["Compress PDF", "Reduce PDF size while keeping quality."] } },
    { slug: "image-to-pdf", cat: "image", icon: "image", status: "on", href: "#", t: { ar: ["صورة إلى PDF", "حوّل صور JPG وPNG إلى ملف PDF نظيف وأنيق."], en: ["Image to PDF", "Turn JPG and PNG images into a clean PDF."] } },
    { slug: "image-to-text", cat: "image", icon: "ocr", status: "on", href: "#", t: { ar: ["نص من صورة", "استخرج النص من الصور بتقنية التعرف الضوئي OCR."], en: ["Image to Text", "Extract text from images with OCR."] } },
    { slug: "qr-code", cat: "image", icon: "qr", status: "on", href: "#", t: { ar: ["مولّد QR", "أنشئ رموز QR فوراً لأي رابط."], en: ["QR Generator", "Create QR codes instantly for any link."] } },
    { slug: "protect-pdf", cat: "organize", icon: "lock", status: "off", href: null, t: { ar: ["حماية PDF", "أضف كلمة مرور لحماية ملفاتك."], en: ["Protect PDF", "Add a password to protect your files."] } }
  ];

  var CATS = { convert: { ar: "تحويل PDF", en: "Convert PDF" }, organize: { ar: "تنظيم PDF", en: "Organize PDF" }, image: { ar: "أدوات الصور", en: "Image tools" } };

  /* ---------- state ---------- */
  var state = {
    lang: localStorage.getItem("tooliva.lang") || "ar",
    accent: localStorage.getItem("tooliva.accent") || "orange",
    filter: "all",
    query: ""
  };

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function locale() { return state.lang === "ar" ? window.I18N_AR : window.I18N_EN; }
  function t(key) { return (locale() && locale()[key]) || key; }

  /* optional hook so the wizard can refresh translated dynamic values on language change */
  var onLangChange = null;

  /* ---------- i18n apply ---------- */
  function applyI18n() {
    $all("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $all("[data-i18n-placeholder]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
    $all("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });

    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    if (document.title) document.title = t("meta.title");
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", t("meta.desc"));

    $all("[data-lang]").forEach(function (b) {
      var active = b.getAttribute("data-lang") === state.lang;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });

    renderTools();
    renderTabs();
    if (onLangChange) onLangChange();
  }

  /* ---------- accent ---------- */
  function applyAccent() {
    document.documentElement.setAttribute("data-accent", state.accent);
    $all(".accent-dot").forEach(function (d) {
      d.setAttribute("aria-pressed", String(d.getAttribute("data-accent") === state.accent));
    });
  }

  /* ---------- render tools grid ---------- */
  function renderTools() {
    var grid = $("#tool-grid");
    if (!grid) return;
    var q = state.query.trim().toLowerCase();
    var items = TOOLS.filter(function (tool) {
      var okCat = state.filter === "all" || tool.cat === state.filter;
      var name = (tool.t[state.lang][0] || "").toLowerCase();
      var desc = (tool.t[state.lang][1] || "").toLowerCase();
      var okQ = !q || name.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
      return okCat && okQ;
    });

    if (!items.length) {
      grid.innerHTML = '<div class="tool-grid__empty">' + t("tools.empty") + "</div>";
      return;
    }

    grid.innerHTML = items.map(function (tool) {
      var name = tool.t[state.lang][0], desc = tool.t[state.lang][1];
      var badge = tool.status === "on"
        ? '<span class="badge badge--available">' + t("tools.available") + "</span>"
        : '<span class="badge badge--soon">' + t("tools.soon") + "</span>";
      var open = tool.status === "on"
        ? '<span class="tool-card__open">' + t("tools.open") + ' <span class="dir-flip" aria-hidden="true">←</span></span>'
        : "";
      var inner = '<span class="tool-card__icon" aria-hidden="true">' + ICONS[tool.icon] + "</span>" +
        '<span class="tool-card__title">' + name + "</span>" +
        '<span class="tool-card__desc">' + desc + "</span>" +
        '<span class="tool-card__footer">' + badge + open + "</span>";
      if (tool.status === "on" && tool.href) return '<a class="tool-card" href="' + tool.href + '">' + inner + "</a>";
      return '<span class="tool-card" aria-disabled="true">' + inner + "</span>";
    }).join("");
  }

  /* ---------- render filter tabs ---------- */
  function renderTabs() {
    var tabs = $("#tool-tabs");
    if (!tabs) return;
    var html = '<button class="tab" data-filter="all" aria-selected="true">' + t("tools.all") + "</button>";
    Object.keys(CATS).forEach(function (c) {
      html += '<button class="tab" data-filter="' + c + '" aria-selected="false">' + CATS[c][state.lang] + "</button>";
    });
    tabs.innerHTML = html;
    tabs.querySelectorAll(".tab").forEach(function (b) {
      b.addEventListener("click", function () {
        state.filter = b.getAttribute("data-filter");
        tabs.querySelectorAll(".tab").forEach(function (x) { x.setAttribute("aria-selected", String(x === b)); });
        renderTools();
      });
    });
  }

  /* ---------- header scroll ---------- */
  function initHeader() {
    var h = $(".site-header");
    if (!h) return;
    var onScroll = function () { h.classList.toggle("is-scrolled", window.scrollY > 12); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- dropdowns ---------- */
  function initDropdowns() {
    $all("[data-dropdown]").forEach(function (dd) {
      var trigger = dd.querySelector("[data-dropdown-trigger]");
      var menu = dd.querySelector("[data-dropdown-menu]");
      var close = function () { trigger.setAttribute("aria-expanded", "false"); menu.setAttribute("data-open", "false"); };
      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = trigger.getAttribute("aria-expanded") === "true";
        $all("[data-dropdown-menu]").forEach(function (m) { m.setAttribute("data-open", "false"); });
        $all("[data-dropdown-trigger]").forEach(function (x) { x.setAttribute("aria-expanded", "false"); });
        if (!open) { trigger.setAttribute("aria-expanded", "true"); menu.setAttribute("data-open", "true"); }
      });
      document.addEventListener("click", close);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    });
  }

  /* ---------- reveal ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    $all(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------- counters ---------- */
  function initCounters() {
    $all("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
      var duration = 1400, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(step);
      }
      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { requestAnimationFrame(step); io.disconnect(); } });
        }, { threshold: 0.5 });
        io.observe(el);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    $all(".faq__item").forEach(function (item) {
      item.querySelector(".faq__q").addEventListener("click", function () {
        var open = item.getAttribute("data-open") === "true";
        $all(".faq__item").forEach(function (x) { x.setAttribute("data-open", "false"); });
        if (!open) item.setAttribute("data-open", "true");
      });
    });
  }

  /* ---------- product mock loop ---------- */
  function initMock() {
    var mock = $("#mock");
    if (!mock) return;
    var states = ["drop", "file", "progress", "success"];
    var i = 0, timings = [2200, 1600, 2400, 2800], timer;
    function next() {
      mock.setAttribute("data-state", states[i]);
      timer = setTimeout(next, timings[i]);
      i = (i + 1) % states.length;
    }
    next();
  }

  /* ---------- PDF.js — renders the REAL uploaded pages ---------- */
  var PDFJS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  var PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  var pdfLibPromise = null;

  function loadPdfLib() {
    if (pdfLibPromise) return pdfLibPromise;
    pdfLibPromise = new Promise(function (resolve) {
      function ready(lib) {
        if (!lib) return resolve(null);
        /* Browsers block Worker URLs from another origin, so fetch the worker
           and run it from a same-origin blob. Falls back to the direct URL. */
        var finish = function (workerSrc) {
          try { lib.GlobalWorkerOptions.workerSrc = workerSrc; } catch (e) { /* ignore */ }
          resolve(lib);
        };
        try {
          fetch(PDFJS_WORKER)
            .then(function (r) { return r.text(); })
            .then(function (code) {
              finish(URL.createObjectURL(new Blob([code], { type: "application/javascript" })));
            })
            .catch(function () { finish(PDFJS_WORKER); });
        } catch (e) {
          finish(PDFJS_WORKER);
        }
      }
      if (window.pdfjsLib) return ready(window.pdfjsLib);
      var s = document.createElement("script");
      s.src = PDFJS_SRC;
      s.onload = function () { ready(window.pdfjsLib); };
      s.onerror = function () { resolve(null); };
      document.head.appendChild(s);
    });
    return pdfLibPromise;
  }

  /* Render one PDF page into `host` as a canvas scaled to targetWidth (CSS px). */
  function renderPdfPageTo(pdfDoc, host, n, targetWidth, done) {
    pdfDoc.getPage(n).then(function (page) {
      var base = page.getViewport({ scale: 1 });
      var scale = targetWidth / base.width;
      var vp = page.getViewport({ scale: scale });
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      var canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.floor(vp.width * dpr));
      canvas.height = Math.max(1, Math.floor(vp.height * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.display = "block";
      host.innerHTML = "";
      host.appendChild(canvas);
      var params = { canvasContext: canvas.getContext("2d"), viewport: vp };
      if (dpr !== 1) params.transform = [dpr, 0, 0, dpr, 0, 0];
      return page.render(params).promise;
    }).then(function () {
      if (done) done(true);
    }).catch(function () {
      if (done) done(false);
    });
  }

  /* ---------- wizard (upload → check → studio preview → settings → process) ---------- */
  function initWizard() {
    var dz = $("[data-dropzone]");
    if (!dz) return;
    var input = $("[data-file-input]");
    var panels = ["wz-upload", "wz-check", "wz-preview", "wz-settings", "wz-process", "wz-success", "wz-error"];
    var STEP_NUM = { upload: 1, check: 1, preview: 2, settings: 3, process: 4, success: 5, error: 4 };
    var checkTimer = null;
    var PAPER_W = 340, PAPER_H = 464;

    var v = { count: 5, current: 1, zoom: 1, rot: 0, panX: 0, panY: 0, fileSize: 0, incl: [true, true, true, true, true] };
    var opts = {
      format: "docx", mode: "layout", batch: "merge", onlySelected: false,
      images: true, tables: true, links: true, notes: false, ocr: false, ocrLang: "ara",
      quality: "high", protect: false, password: ""
    };

    /* real PDF document (PDF.js). null when the library is unavailable (offline)
       or the file cannot be parsed — in that case we fall back to a demo document. */
    var pdfDoc = null;
    function loadRealPdf(file) {
      return loadPdfLib().then(function (lib) {
        if (!lib) return false;
        return new Promise(function (resolve) {
          var reader = new FileReader();
          reader.onload = function () {
            lib.getDocument({ data: new Uint8Array(reader.result) }).promise
              .then(function (pdf) {
                pdfDoc = pdf;
                v.count = pdf.numPages;
                v.current = 1;
                v.incl = [];
                for (var i = 0; i < v.count; i++) v.incl.push(true);
                resolve(true);
              })
              .catch(function () { pdfDoc = null; resolve(false); });
          };
          reader.onerror = function () { resolve(false); };
          reader.readAsArrayBuffer(file);
        });
      });
    }

    function fmt(b) {
      if (b < 1024) return b + " B";
      if (b < 1048576) return (b / 1024).toFixed(1) + " KB";
      return (b / 1048576).toFixed(2) + " MB";
    }
    function setStep(n) {
      $all(".stepper__step").forEach(function (s) {
        var i = parseInt(s.getAttribute("data-step"), 10);
        s.classList.toggle("is-active", i === n);
        s.classList.toggle("is-done", i < n);
      });
      $all(".stepper__sep").forEach(function (sep) {
        sep.classList.toggle("is-done", parseInt(sep.getAttribute("data-sep"), 10) < n);
      });
    }
    function show(id) {
      panels.forEach(function (p) { var el = document.getElementById(p); if (el) el.classList.toggle("hidden", p !== id); });
      setStep(STEP_NUM[id.replace("wz-", "")] || 1);
      if (id === "wz-check") {
        requestAnimationFrame(function () { var c = document.getElementById("wz-check"); if (c) c.classList.add("is-visible"); });
      }
      if (id === "wz-preview") syncViewer();
      if (id === "wz-settings") syncSummary();
    }

    /* ---- paper render + transform ---- */
    function applyTransform() {
      var paper = $("[data-paper]");
      if (!paper) return;
      paper.style.transform =
        "translate(" + v.panX + "px," + v.panY + "px) scale(" + v.zoom + ") rotate(" + v.rot + "deg)";
      $all("[data-zoom-label]").forEach(function (el) { el.textContent = Math.round(v.zoom * 100) + "%"; });
    }
    var DOC_SECTIONS = [
      { h: "المقدمة", p: "يقدّم هذا التقرير ملخّصاً شاملاً لمؤشرات الأداء خلال الربع الأول، مع تحليل النتائج والتوصيات التنفيذية المعتمدة." },
      { h: "النتائج الرئيسية", p: "بلغ إجمالي الإيرادات 4.2 مليون ريال بنموّ 18% مقارنة بالفترة السابقة، مدفوعاً بارتفاع الطلب في السوق المحلي.", table: true },
      { h: "التحليل", p: "يعكس النمو تحسّن كفاءة العمليات وزيادة معدّل الاحتفاظ بالعملاء إلى 94%، مع انخفاض تكلفة الاستحواذ بنسبة 7%." },
      { h: "التوصيات", p: "نوصي بتعزيز قنوات الاستحواذ الرقمي، وأتمتة العمليات التشغيلية، وزيادة الاستثمار في فريق الدعم الفني.", table: true }
    ];
    function renderPaper() {
      var paper = $("[data-paper]");
      if (!paper) return;
      if (pdfDoc) {
        /* real page rendered from the uploaded PDF */
        paper.classList.add("stage__paper--pdf");
        if (!paper.querySelector("canvas")) {
          paper.innerHTML = '<div class="paper-loading"><span class="spinner" aria-hidden="true"></span></div>';
        }
        renderPdfPageTo(pdfDoc, paper, v.current, PAPER_W, null);
        applyTransform();
        return;
      }
      /* fallback demo document (PDF.js unavailable) */
      paper.classList.remove("stage__paper--pdf");
      var s = DOC_SECTIONS[(v.current - 1) % DOC_SECTIONS.length];
      var table = s.table
        ? '<table class="paper-tbl"><thead><tr><th>البند</th><th>المستهدف</th><th>المحقق</th></tr></thead><tbody>' +
          "<tr><td>الإيرادات</td><td>4.0M</td><td>4.2M</td></tr>" +
          "<tr><td>العملاء</td><td>1,200</td><td>1,340</td></tr>" +
          "<tr><td>الرضا</td><td>90%</td><td>94%</td></tr>" +
          "</tbody></table>"
        : "";
      paper.innerHTML =
        '<div class="paper-head"><span class="paper-logo"></span><span class="paper-title">تقرير المشروع — 2026</span></div>' +
        '<h4 class="paper-h">' + s.h + "</h4>" +
        '<p class="paper-p">' + s.p + "</p>" +
        table +
        '<div class="paper-note">نص تجريبي لأغراض المعاينة فقط — لا يحتوي على بيانات حقيقية.</div>' +
        '<div class="paper-footer">' + t("preview.page") + " " + v.current + " / " + v.count + "</div>";
      applyTransform();
    }

    /* ---- rail thumbnails ---- */
    function updateRailActive() {
      var wrap = $("[data-thumbs]");
      if (!wrap) return;
      $all("[data-thumb]", wrap).forEach(function (it) {
        it.classList.toggle("is-active", parseInt(it.getAttribute("data-thumb"), 10) === v.current);
      });
    }

    /* render every page thumbnail from the real PDF, one at a time */
    function paintRailThumbs() {
      if (!pdfDoc) return;
      var items = $all("[data-thumb]");
      var idx = 0;
      function step() {
        if (idx >= items.length) return;
        var item = items[idx++];
        var host = item.querySelector(".rail-item__page");
        if (!host) return step();
        renderPdfPageTo(pdfDoc, host, parseInt(item.getAttribute("data-thumb"), 10), 64, step);
      }
      step();
    }

    function buildRail() {
      var wrap = $("[data-thumbs]");
      if (!wrap) return;
      var skeleton = pdfDoc
        ? ""
        : '<span class="tline tline--w"></span><span class="tline tline--m"></span><span class="tline tline--w"></span><span class="tblock"></span><span class="tline tline--m"></span>';
      var html = "";
      for (var i = 1; i <= v.count; i++) {
        var on = v.incl[i - 1] !== false;
        html += '<div class="rail-item' + (i === v.current ? " is-active" : "") + (on ? "" : " is-excluded") + '" data-thumb="' + i + '">' +
          '<label class="rail-item__check"><input type="checkbox" data-page-check="' + i + '"' + (on ? " checked" : "") + " /></label>" +
          '<button class="rail-item__del" type="button" data-del="' + i + '" aria-label="×">×</button>' +
          '<span class="rail-item__page' + (pdfDoc ? " rail-item__page--pdf" : "") + '">' + skeleton + "</span>" +
          '<span class="rail-item__num">' + i + "</span></div>";
      }
      wrap.innerHTML = html;
      $all("[data-thumb]", wrap).forEach(function (it) {
        it.addEventListener("click", function (e) {
          if (e.target.closest("[data-del]") || e.target.closest(".rail-item__check")) return;
          v.current = parseInt(it.getAttribute("data-thumb"), 10);
          v.panX = 0; v.panY = 0;
          syncViewer();
        });
      });
      $all("[data-page-check]", wrap).forEach(function (cb) {
        cb.addEventListener("change", function () {
          v.incl[parseInt(cb.getAttribute("data-page-check"), 10) - 1] = cb.checked;
          var item = cb.closest(".rail-item");
          if (item) item.classList.toggle("is-excluded", !cb.checked);
          syncSummary();
        });
      });
      $all("[data-del]", wrap).forEach(function (b) {
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          if (v.count <= 1) return;
          var n = parseInt(b.getAttribute("data-del"), 10);
          v.count--;
          v.incl.splice(n - 1, 1);
          if (v.current > v.count) v.current = v.count;
          buildRail();
          syncViewer();
        });
      });
      paintRailThumbs();
    }

    function syncViewer() {
      var wrap = $("[data-thumbs]");
      if (!wrap || wrap.children.length !== v.count) buildRail();
      else updateRailActive();
      renderPaper();
      $all("[data-page-total]").forEach(function (el) { el.textContent = v.count; });
      var pi = $("[data-page-input]");
      if (pi) { pi.value = v.current; pi.max = v.count; }
      var prev = $("[data-page-prev]"); if (prev) prev.disabled = v.current === 1;
      var next = $("[data-page-next]"); if (next) next.disabled = v.current === v.count;
      syncSummary();
    }

    /* ---- fit ---- */
    function fit(mode) {
      var vp = $("[data-viewport]");
      if (!vp) return;
      var paper = $("[data-paper]");
      var pw = (paper && paper.offsetWidth) || PAPER_W;
      var ph = (paper && paper.offsetHeight) || PAPER_H;
      var r = vp.getBoundingClientRect();
      var pad = 36;
      var z = mode === "width"
        ? (r.width - pad) / pw
        : Math.min((r.width - pad) / pw, (r.height - pad) / ph);
      v.zoom = Math.max(0.25, Math.min(4, z));
      v.panX = 0; v.panY = 0;
      applyTransform();
    }

    /* ---- summary ---- */
    function selCount() { return v.incl.slice(0, v.count).filter(Boolean).length; }
    function syncSummary() {
      var n = selCount();
      $all("[data-sel-count]").forEach(function (el) { el.textContent = n; });
      $all("[data-page-total]").forEach(function (el) { el.textContent = v.count; });
      var mode = $("[data-sum-mode]");
      var format = $("[data-sum-format]");
      var pages = $("[data-sum-pages]");
      var size = $("[data-sum-size]");
      if (mode) mode.textContent = t(opts.mode === "layout" ? "opt.modeLayout" : "opt.modeEditable");
      if (format) {
        format.textContent = opts.format === "docx" ? t("opt.formatDocx")
          : opts.format === "doc" ? t("opt.formatDoc")
          : opts.format === "rtf" ? t("opt.formatRtf") : t("opt.formatTxt");
      }
      var effective = opts.onlySelected ? n : v.count;
      if (pages) pages.textContent = String(effective);
      if (size) {
        var base = v.fileSize || 2000000;
        var factor = opts.quality === "high" ? 0.55 : opts.quality === "medium" ? 0.4 : 0.28;
        if (opts.format === "txt") factor *= 0.25;
        if (opts.mode === "editable") factor *= 0.8;
        var ratio = v.count > 0 ? effective / v.count : 1;
        var est = Math.max(15000, Math.round(base * factor * ratio));
        size.textContent = fmt(est);
      }
    }
    onLangChange = syncSummary;

    /* ---- options panel ---- */
    function initOptions() {
      /* radio-card groups (format, mode, batch, quality, ocrLang) */
      $all("[data-radio]").forEach(function (box) {
        var key = box.getAttribute("data-radio");
        $all("input[type=radio]", box).forEach(function (r) {
          r.addEventListener("change", function () {
            if (r.checked) { opts[key] = r.value; syncSummary(); }
          });
        });
      });
      /* toggle switches */
      $all("[data-opt]").forEach(function (cb) {
        cb.addEventListener("change", function () {
          var k = cb.getAttribute("data-opt");
          opts[k] = cb.checked;
          if (k === "protect") {
            var pw = $("[data-password]");
            if (pw) { pw.disabled = !cb.checked; if (!cb.checked) pw.value = ""; }
          }
          syncSummary();
        });
      });
      /* page selection shortcuts */
      var sa = $("[data-sel-all]");
      if (sa) sa.addEventListener("click", function () {
        v.incl = v.incl.map(function () { return true; });
        buildRail(); syncSummary();
      });
      var sn = $("[data-sel-none]");
      if (sn) sn.addEventListener("click", function () {
        v.incl = v.incl.map(function () { return false; });
        buildRail(); syncSummary();
      });
      /* password */
      var pw = $("[data-password]");
      if (pw) pw.addEventListener("input", function () { opts.password = pw.value; });
    }

    /* ---- viewer interactions ---- */
    function initViewer() {
      var vp = $("[data-viewport]");
      if (!vp) return;

      var zi = $("[data-zoom-in]"); if (zi) zi.addEventListener("click", function () { v.zoom = Math.min(4, v.zoom + 0.15); applyTransform(); });
      var zo = $("[data-zoom-out]"); if (zo) zo.addEventListener("click", function () { v.zoom = Math.max(0.25, v.zoom - 0.15); applyTransform(); });
      var ro = $("[data-rotate]"); if (ro) ro.addEventListener("click", function () { v.rot = (v.rot + 90) % 360; applyTransform(); });
      var rv = $("[data-reset-view]"); if (rv) rv.addEventListener("click", function () { v.zoom = 1; v.rot = 0; v.panX = 0; v.panY = 0; applyTransform(); });
      var fw = $("[data-fit-width]"); if (fw) fw.addEventListener("click", function () { fit("width"); });
      var fp = $("[data-fit-page]"); if (fp) fp.addEventListener("click", function () { fit("page"); });
      var fs = $("[data-fullscreen]"); if (fs) fs.addEventListener("click", function () {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (vp.requestFullscreen) vp.requestFullscreen();
      });

      var pp = $("[data-page-prev]"); if (pp) pp.addEventListener("click", function () { if (v.current > 1) { v.current--; v.panX = 0; v.panY = 0; syncViewer(); } });
      var pn = $("[data-page-next]"); if (pn) pn.addEventListener("click", function () { if (v.current < v.count) { v.current++; v.panX = 0; v.panY = 0; syncViewer(); } });
      var pi = $("[data-page-input]"); if (pi) pi.addEventListener("change", function () {
        var n = parseInt(pi.value, 10);
        if (isNaN(n)) n = v.current;
        v.current = Math.max(1, Math.min(v.count, n));
        v.panX = 0; v.panY = 0;
        syncViewer();
      });

      /* mouse wheel → zoom */
      vp.addEventListener("wheel", function (e) {
        e.preventDefault();
        v.zoom = Math.max(0.25, Math.min(4, v.zoom + (e.deltaY > 0 ? -0.12 : 0.12)));
        applyTransform();
      }, { passive: false });

      /* drag → pan */
      var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
      vp.addEventListener("mousedown", function (e) {
        dragging = true;
        vp.classList.add("is-panning");
        sx = e.clientX; sy = e.clientY; ox = v.panX; oy = v.panY;
        e.preventDefault();
      });
      window.addEventListener("mousemove", function (e) {
        if (!dragging) return;
        v.panX = ox + (e.clientX - sx);
        v.panY = oy + (e.clientY - sy);
        applyTransform();
      });
      window.addEventListener("mouseup", function () {
        dragging = false;
        vp.classList.remove("is-panning");
      });

      /* double-click → toggle zoom */
      vp.addEventListener("dblclick", function () {
        if (v.zoom > 1.05) { v.zoom = 1; v.panX = 0; v.panY = 0; }
        else { v.zoom = 1.6; }
        applyTransform();
      });

      /* keyboard */
      vp.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          var d = e.key === "ArrowLeft" ? -1 : 1;
          var n = Math.max(1, Math.min(v.count, v.current + d));
          if (n !== v.current) { v.current = n; v.panX = 0; v.panY = 0; syncViewer(); }
        } else if (e.key === "+" || e.key === "=") { v.zoom = Math.min(4, v.zoom + 0.15); applyTransform(); }
        else if (e.key === "-") { v.zoom = Math.max(0.25, v.zoom - 0.15); applyTransform(); }
        else if (e.key.toLowerCase() === "r") { v.rot = (v.rot + 90) % 360; applyTransform(); }
        else if (e.key === "0") { v.zoom = 1; v.rot = 0; v.panX = 0; v.panY = 0; applyTransform(); }
      });
    }

    /* ---- dropzone ---- */
    var openPicker = function () { input.click(); };
    dz.addEventListener("click", openPicker);
    dz.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPicker(); } });
    ["dragenter", "dragover"].forEach(function (ev) { dz.addEventListener(ev, function (e) { e.preventDefault(); dz.setAttribute("data-dragover", "true"); }); });
    ["dragleave", "drop"].forEach(function (ev) { dz.addEventListener(ev, function (e) { e.preventDefault(); dz.setAttribute("data-dragover", "false"); }); });

    input.addEventListener("change", function () {
      var f = input.files[0]; if (!f) return;
      pdfDoc = null;
      v.fileSize = f.size;
      v.current = 1; v.zoom = 1; v.rot = 0; v.panX = 0; v.panY = 0;
      v.count = 1;
      v.incl = [true];

      var cs = $("[data-check-size]"); if (cs) cs.textContent = fmt(f.size);
      var on = $("[data-output-name]");
      if (on) on.value = (f.name || "document.pdf").replace(/\.pdf$/i, "") + ".docx";

      var wrap0 = $("[data-thumbs]"); if (wrap0) wrap0.innerHTML = "";

      show("wz-check");
      var c = document.getElementById("wz-check"); if (c) c.classList.remove("is-visible");
      if (checkTimer) clearTimeout(checkTimer);

      var checkDone = false, pdfDone = false;
      function advance() {
        if (!checkDone || !pdfDone) return;
        show("wz-preview");
        buildRail();
        fit("page");
        setTimeout(function () { fit("page"); }, 500);
      }

      checkTimer = setTimeout(function () { checkDone = true; advance(); }, 2000);

      /* open the real PDF; fall back to a demo document when PDF.js is unavailable */
      loadRealPdf(f).then(function (ok) {
        if (!ok) {
          v.count = Math.max(1, Math.min(50, Math.round(f.size / 300000)));
          v.incl = [];
          for (var i = 0; i < v.count; i++) v.incl.push(true);
        }
        pdfDone = true;
        advance();
      });
    });

    /* ---- navigation between steps ---- */
    $all("[data-goto]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (checkTimer) clearTimeout(checkTimer);
        show("wz-" + b.getAttribute("data-goto"));
      });
    });
    $all("[data-wizard-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        show("wz-process");
        setTimeout(function () { show("wz-success"); }, 2400);
      });
    });
    $all("[data-reset-btn]").forEach(function (b) {
      b.addEventListener("click", function () { input.value = ""; show("wz-upload"); });
    });

    initOptions();
    initViewer();
  }

  /* ---------- power pack ---------- */
  function initPowerPack() {
    var announce = document.querySelector("[data-announce]");
    var closeBtn = document.querySelector("[data-announce-close]");
    if (closeBtn && announce) closeBtn.addEventListener("click", function () { announce.classList.add("is-hidden"); });

    var progBar = document.querySelector("[data-scroll-progress] .scroll-progress__bar");
    var toTop = document.querySelector("[data-to-top]");
    function onScroll() {
      if (progBar) {
        var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
        progBar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
      }
      if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- boot: apply language/accent immediately (script is at end of body) ---------- */
  applyI18n();
  applyAccent();

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initDropdowns();
    initReveal();
    initCounters();
    initFaq();
    initWizard();
    initMock();
    initPowerPack();

    $all(".accent-dot").forEach(function (d) {
      d.addEventListener("click", function () {
        state.accent = d.getAttribute("data-accent");
        localStorage.setItem("tooliva.accent", state.accent);
        applyAccent();
      });
    });

    $all("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        state.lang = b.getAttribute("data-lang");
        localStorage.setItem("tooliva.lang", state.lang);
        applyI18n();
      });
    });

    var search = $("[data-search]");
    if (search) search.addEventListener("input", function () { state.query = search.value; renderTools(); });

    var newsBtn = $("[data-news-btn]");
    if (newsBtn) {
      newsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var input = $("[data-news-input]"); if (input) input.value = "";
        newsBtn.textContent = state.lang === "ar" ? "تم ✓" : "Done ✓";
        setTimeout(function () { newsBtn.textContent = t("footer.newsBtn"); }, 2000);
      });
    }
  });
})();

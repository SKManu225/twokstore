/* ===========================================================
   TWO K STORE — main.js
   =========================================================== */

// Coordonnées — un seul endroit à modifier
const WHATSAPP_NUMBER = "2250718444091";
// Canal WhatsApp pas encore créé : remplacer cette valeur par le lien réel dès qu'il existe.
const WHATSAPP_CHANNEL_URL = "";

// Promotion en cours : sac Eastpak personnalisé à 15 000 FCFA au lieu de 20 000 FCFA, jusqu'au lundi 07/09/2026 inclus.
// Le bandeau se masque automatiquement après cette date — pas besoin d'intervenir manuellement pour le retirer.
const PROMO_END = new Date("2026-09-07T23:59:59");
const PROMO_TEXT = 'Sac Eastpak personnalisé : <strong>15 000 FCFA</strong> au lieu de 20 000 FCFA — jusqu\'à lundi.';

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initPromoBar();
  initCategoryFilter();
  initWhatsappLinks();
  initContactForm();
  initFooterYear();
});

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Promo bar ---------- */
function initPromoBar() {
  const bar = document.querySelector("[data-promo-bar]");
  if (!bar) return;

  if (new Date() > PROMO_END) {
    bar.hidden = true;
    return;
  }
  bar.innerHTML = PROMO_TEXT;
}

/* ---------- Category filter (boutique.html) ---------- */
function initCategoryFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;

      cards.forEach((card) => {
        const show = cat === "all" || card.dataset.category === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });

  const params = new URLSearchParams(window.location.search);
  const preselect = params.get("cat");
  if (preselect) {
    const match = document.querySelector(`.filter-btn[data-filter="${preselect}"]`);
    if (match) match.click();
  }
}

/* ---------- WhatsApp links ---------- */
function initWhatsappLinks() {
  document.querySelectorAll("[data-wa-product]").forEach((el) => {
    const product = el.dataset.waProduct;
    const price = el.dataset.waPrice || "";
    const message = `Bonjour Two K Store, je suis intéressé(e) par : ${product}${price ? " (" + price + ")" : ""}. Est-il disponible ?`;
    el.href = buildWhatsappLink(message);
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-wa-custom]").forEach((el) => {
    const model = el.dataset.waCustom;
    const message = `Bonjour Two K Store, je souhaite personnaliser un sac ${model}. Pouvez-vous me guider ?`;
    el.href = buildWhatsappLink(message);
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-wa-generic]").forEach((el) => {
    el.href = buildWhatsappLink("Bonjour Two K Store, j'aimerais avoir plus d'informations.");
    el.target = "_blank";
    el.rel = "noopener";
  });

  document.querySelectorAll("[data-wa-channel]").forEach((el) => {
    if (WHATSAPP_CHANNEL_URL) {
      el.href = WHATSAPP_CHANNEL_URL;
      el.target = "_blank";
      el.rel = "noopener";
    } else {
      el.href = buildWhatsappLink("Bonjour, je voudrais rejoindre le canal WhatsApp de Two K Store.");
      el.target = "_blank";
      el.rel = "noopener";
    }
  });
}

function buildWhatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------- Contact form (site statique : ouvre WhatsApp ou email) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    const fullMessage = `Bonjour Two K Store,%0A%0ANom : ${name}%0AEmail : ${email}%0AMessage : ${message}`;
    const method = form.querySelector('input[name="contact-method"]:checked')?.value || "whatsapp";

    if (method === "whatsapp") {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(decodeURIComponent(fullMessage))}`, "_blank");
    } else {
      window.location.href = `mailto:societevicol@gmail.com?subject=${encodeURIComponent("Contact Two K Store - " + name)}&body=${fullMessage}`;
    }
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  document.querySelectorAll("#year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

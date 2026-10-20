// Recipe Secrets Restaurant — shared behavior

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded);
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("form[data-validate]").forEach(setupFormValidation);

  renderSpecials();
  setupScrollReveal();
});

function setupFormValidation(form) {
  var successBox = form.querySelector(".form-success");

  form.addEventListener("submit", function (event) {
    // NOTE: preventDefault() is kept here so this demo always shows the friendly
    // confirmation message locally, even though reservation.html now also has a
    // Formspree "action" configured. To let a real Formspree submission go through
    // in production, remove this preventDefault() (or branch on it) once a real
    // form ID is in place.
    event.preventDefault();
    var valid = true;

    form.querySelectorAll("[required]").forEach(function (field) {
      var wrapper = field.closest(".field");
      var ok = field.value.trim().length > 0;

      if (field.type === "email" && ok) {
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      }

      if (field.type === "tel" && ok) {
        ok = /^[0-9+\-()\s]{7,}$/.test(field.value.trim());
      }

      if (wrapper) {
        wrapper.classList.toggle("field-invalid", !ok);
      }

      if (!ok) {
        valid = false;
      }
    });

    if (valid) {
      form.reset();
      if (successBox) {
        successBox.classList.add("visible");
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();
      }
    } else if (successBox) {
      successBox.classList.remove("visible");
    }
  });
}

// ----- Specials rendering (specials.html only) -----
// Reads the `specials` array from js/specials-data.js and renders it into
// three grouped sections: Today's Specials, Weekly Specials, and Seasonal.
function renderSpecials() {
  if (typeof specials === "undefined") return;

  var groups = {
    today: { title: "Today's Specials", subtitle: "Available for today only — ask your server before they sell out.", el: document.querySelector("#today-specials .grid") },
    weekly: { title: "Weekly Specials", subtitle: "On the menu all week long.", el: document.querySelector("#weekly-specials .grid") },
    seasonal: { title: "Seasonal", subtitle: "Featuring the best ingredients this season has to offer.", el: document.querySelector("#seasonal-specials .grid") }
  };

  var hasTarget = groups.today.el || groups.weekly.el || groups.seasonal.el;
  if (!hasTarget) return;

  specials.forEach(function (dish) {
    var group = groups[dish.category];
    if (!group || !group.el) return;

    var card = document.createElement("div");
    card.className = "card reveal";
    card.innerHTML =
      '<div class="card-img-wrap">' +
        '<img src="' + dish.image + '" alt="' + dish.alt + '" loading="lazy" />' +
      "</div>" +
      '<div class="card-body">' +
        "<h3>" + dish.name + ' <span class="price-tag">' + dish.price + "</span></h3>" +
        "<p>" + dish.description + "</p>" +
      "</div>";
    group.el.appendChild(card);
  });
}

// ----- Scroll-reveal animations -----
// Lightweight fade/slide-up reveal using IntersectionObserver. Elements with the
// `.reveal` class start hidden/offset and gain `.visible` once they enter the
// viewport. Respects prefers-reduced-motion by skipping the animation entirely.
function setupScrollReveal() {
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Auto-tag common elements as reveal targets if they aren't already marked.
  document.querySelectorAll(".card, .section-title, .section-subtitle, .quote, .rounded-photo, .testimonial").forEach(function (el) {
    el.classList.add("reveal");
  });

  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
}

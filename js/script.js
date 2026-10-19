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
});

function setupFormValidation(form) {
  var successBox = form.querySelector(".form-success");

  form.addEventListener("submit", function (event) {
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

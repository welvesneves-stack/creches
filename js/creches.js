// Pequenos Exploradores — comportamento básico
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  const header = document.querySelector(".header");

  // Abre/fecha o menu mobile
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  }

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Fecha com a tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Scroll suave para links internos (com compensação do header fixo)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      if (target.matches("input, textarea"))
        target.focus({ preventScroll: true });
      setMenu(false);
    });
  });

  // Formulário: validação simples, sem envio real nesta versão
  const form = document.getElementById("contact-form");
  const status = form.querySelector(".form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.style.color = "#b3261e";
      status.textContent =
        "Por favor, preencha o nome, um e-mail válido e a mensagem.";
      return;
    }
    status.style.color = "";
    status.textContent = "Obrigado! Entraremos em contacto brevemente.";
    form.reset();
  });
})();

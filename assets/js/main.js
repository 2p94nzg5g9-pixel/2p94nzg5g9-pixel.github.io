(() => {
  "use strict";

  const config = window.SITE_CONFIG || {};
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("site-theme");
  if (storedTheme === "light" || storedTheme === "dark") root.dataset.theme = storedTheme;

  document.querySelectorAll("[data-site-name]").forEach((node) => { node.textContent = config.siteName || "TAKUMI apps"; });
  document.querySelectorAll("[data-developer-name]").forEach((node) => { node.textContent = config.developerName || "TAKUMI apps"; });
  document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-contact-email]").forEach((node) => { node.textContent = config.contactEmail || "madaoganbaru@gmail.com"; });
  document.querySelectorAll("[data-email-link]").forEach((node) => {
    const subject = node.dataset.emailSubject ? `?subject=${encodeURIComponent(node.dataset.emailSubject)}` : "";
    node.href = `mailto:${config.contactEmail || "madaoganbaru@gmail.com"}${subject}`;
  });

  document.querySelectorAll("[data-app-store-url]").forEach((link) => {
    const appId = link.dataset.appId || "reshimamo";
    const url = config.appStoreUrls?.[appId];
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.classList.remove("is-placeholder");
    } else {
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
      nav.classList.remove("is-open");
    };
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "メニューを開く" : "メニューを閉じる");
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });
  }

  document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
    const isDark = root.dataset.theme === "dark" || (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const nextTheme = isDark ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("site-theme", nextTheme);
  });
})();

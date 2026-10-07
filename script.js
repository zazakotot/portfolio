document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
    REVIEWS — DROPDOWN
    ========================================================= */
    const reviewsToggle = document.querySelector(".reviews-toggle");
    const reviewsDropdown = document.querySelector(".reviews-dropdown");

    if (reviewsToggle && reviewsDropdown) {
        reviewsToggle.addEventListener("click", () => {
            const isOpen = reviewsDropdown.classList.toggle("is-open");
            reviewsToggle.setAttribute("aria-expanded", isOpen);

            if (isOpen) {
                reviewsDropdown.style.maxHeight = reviewsDropdown.scrollHeight + "px";
                // Обновим текст кнопки
                const textEl = reviewsToggle.querySelector(".reviews-toggle-text");
                if (textEl) textEl.textContent = "СКРЫТЬ ОТЗЫВЫ";
            } else {
                reviewsDropdown.style.maxHeight = "0px";
                const textEl = reviewsToggle.querySelector(".reviews-toggle-text");
                if (textEl) textEl.textContent = "ПОКАЗАТЬ ВСЕ ОТЗЫВЫ";
            }
        });

        // Пересчёт высоты при ресайзе
        window.addEventListener("resize", () => {
            if (reviewsDropdown && reviewsDropdown.classList.contains("is-open")) {
                reviewsDropdown.style.maxHeight = reviewsDropdown.scrollHeight + "px";
            }
        });
    }

    /* =========================================================
    REVEAL ON SCROLL
    ========================================================= */
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));

    /* =========================================================
    Плавная навигация
    ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const selector = link.getAttribute("href");
            if (!selector || selector === "#") return;
            const target = document.querySelector(selector);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

});
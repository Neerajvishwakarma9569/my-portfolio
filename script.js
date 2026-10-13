const toggle = document.getElementById("menu-toggle");
if (toggle) {
    toggle.addEventListener("change", () => {
        document.body.classList.toggle("no-scroll", toggle.checked);
    });

    document.querySelectorAll("nav a").forEach((link) => {
        link.addEventListener("click", () => {
            toggle.checked = false;
            document.body.classList.remove("no-scroll");
        });
    });
}

const updateViewportState = () => {
    const mobile = window.innerWidth <= 900;
    const smallMobile = window.innerWidth <= 760;
    document.body.classList.toggle("is-mobile", mobile);
    document.body.classList.toggle("is-small", smallMobile);
};

window.addEventListener("resize", updateViewportState);
updateViewportState();

const themeToggle = document.querySelector(".theme-toggle");
const preferredTheme = localStorage.getItem("portfolio-theme");
const applyTheme = (theme) => {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    if (themeToggle) {
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-moon", !isLight);
            icon.classList.toggle("fa-sun", isLight);
        }
        themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
    }
};

if (themeToggle) {
    applyTheme(preferredTheme || "dark");
    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        const nextTheme = isLight ? "dark" : "light";
        localStorage.setItem("portfolio-theme", nextTheme);
        applyTheme(nextTheme);
    });
}

const contactForm = document.querySelector(".contact-form");
const whatsappNumber = "9569801987";

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const message = [
            `Name: ${String(formData.get("name") || "").trim()}`,
            `Email: ${String(formData.get("email") || "").trim()}`,
            `Subject: ${String(formData.get("subject") || "Not provided").trim()}`,
            `Message: ${String(formData.get("message") || "").trim()}`
        ].join("\n");

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
}

const typedElement = document.getElementById("element");
if (typedElement && typeof Typed !== "undefined") {
    new Typed("#element", {
        strings: ["Web Developer", "MERN Stack Developer", "Full Stack Developer", "React UI Developer"],
        typeSpeed: 50,
        backDelay: 1200,
        loop: true,
    });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const currentFilter = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.toggle("active", btn === button));

        projectCards.forEach((card) => {
            const matches = currentFilter === "all" || card.dataset.category === currentFilter;
            card.style.display = matches ? "block" : "none";
        });
    });
});

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.count || 0);
        const suffix = counter.dataset.suffix || "";
        const duration = 1200;
        const startTime = performance.now();

        const update = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = `${value}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(update);
        observer.unobserve(counter);
    });
}, { threshold: 0.6 });

counters.forEach((counter) => counterObserver.observe(counter));
// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
    navToggle.addEventListener("click", () => {
        const isOpen = navMobile.style.display === "flex";
        navMobile.style.display = isOpen ? "none" : "flex";
    });

    // Close mobile menu on link click
    navMobile.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMobile.style.display = "none";
        });
    });
}

// Core values carousel
const slides = document.querySelectorAll(".value-slide");
const dots = document.querySelectorAll(".dot-btn");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
let current = 0;
let autoTimer;

function showSlide(index) {
    if (!slides.length) return;

    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === current);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
    });
}

function nextSlide() {
    showSlide(current + 1);
}

function prevSlide() {
    showSlide(current - 1);
}

function startAutoSlide() {
    stopAutoSlide();
    autoTimer = setInterval(nextSlide, 6000);
}

function stopAutoSlide() {
    if (autoTimer) clearInterval(autoTimer);
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });
}

dots.forEach((dot) => {
    dot.addEventListener("click", () => {
        const index = parseInt(dot.getAttribute("data-target"), 10);
        showSlide(index);
        startAutoSlide();
    });
});

// Start autoplay when page loads
startAutoSlide();

// Pause on hover
const carousel = document.querySelector(".carousel");
if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
if (reveals.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));
}

// Footer year
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

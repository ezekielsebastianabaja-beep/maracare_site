// scripts.js

document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalCategories = document.getElementById("modalCategories");
    const closeBtn = document.querySelector(".close");

    const departmentFilter = document.getElementById("departmentFilter");
    const searchInput = document.getElementById("searchInput");

    // --- Product Modal ---
    if (productCards.length && modal) {
        productCards.forEach(card => {
            card.addEventListener("click", () => {
                const title = card.querySelector("h3").innerText;
                const imgSrc = card.querySelector("img").src;
                const desc = card.querySelector("p").innerText;
                const features = card.getAttribute("data-features");
                const categories = card.getAttribute("data-categories");

                modalTitle.innerText = title;
                modalImage.src = imgSrc;
                modalDescription.innerText = desc;

                // Features
                modalFeatures.innerHTML = "";
                if (features) {
                    features.split("|").forEach(f => {
                        const li = document.createElement("li");
                        li.textContent = f.trim();
                        modalFeatures.appendChild(li);
                    });
                }

                // Categories
                modalCategories.innerText = categories ? categories : "";

                modal.style.display = "flex";
            });
        });

        // Close button
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close when clicking outside modal
        window.addEventListener("click", (event) => {
            if (event.target === modal) modal.style.display = "none";
        });

        // Close with ESC key
        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") modal.style.display = "none";
        });
    }

    // --- Filter + Search Function ---
    function filterProducts() {
        const selectedDept = departmentFilter ? departmentFilter.value.toLowerCase() : "all";
        const searchText = searchInput ? searchInput.value.toLowerCase() : "";

        productCards.forEach(card => {
            const deptAttr = card.getAttribute("data-department").toLowerCase();
            const departments = deptAttr.split(",").map(d => d.trim());

            const title = card.querySelector("h3").innerText.toLowerCase();
            const desc = card.querySelector("p").innerText.toLowerCase();

            const matchesDept = selectedDept === "all" || departments.includes(selectedDept);
            const matchesSearch = title.includes(searchText) || desc.includes(searchText);

            card.style.display = (matchesDept && matchesSearch) ? "block" : "none";
        });
    }

    if (departmentFilter) departmentFilter.addEventListener("change", filterProducts);
    if (searchInput) searchInput.addEventListener("input", filterProducts);

    // --- Auto-filter from URL (?dept=...)
    if (document.body.classList.contains("products-page") && departmentFilter) {
        const params = new URLSearchParams(window.location.search);
        const dept = params.get("dept");
        if (dept) {
            departmentFilter.value = dept;
            departmentFilter.dispatchEvent(new Event("change")); // ✅ triggers filterProducts()
        }
    }
});


// --- Contact Form ---
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you! Your inquiry has been submitted. (Form handling not connected yet)");
            form.reset();
        });
    }
});


// --- Homepage Slideshow ---
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    if (!slides.length) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// Auto play slideshow
setInterval(() => { plusSlides(1); }, 5000);


// --- Sticky Header Scroll Effect ---
document.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
});


// --- Mobile Menu Toggle ---
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
});

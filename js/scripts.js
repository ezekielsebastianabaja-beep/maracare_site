// scripts.js
console.log("scripts.js loaded");

document.addEventListener("DOMContentLoaded", function () {
    // --- Product Modal ---
    const productCards = document.querySelectorAll(".product-card");
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalbrand = document.getElementById("modalbrand");
    const modalcountry = document.getElementById("modalcountry");
    const modaloverview = document.getElementById("modaloverview");
    const closeBtn = document.querySelector(".close");
    

    if (productCards.length && modal) {
        productCards.forEach(card => {
            card.addEventListener("click", () => {
                const title = card.querySelector("h3").innerText;
                const imgSrc = card.querySelector("img").src;
                const desc = card.querySelector("p").innerText;
                const brand = card.getAttribute("data-brand");
                const country = card.getAttribute("data-country");
                const overview = card.getAttribute("overview");

                modalTitle.innerText = title;
                modalImage.src = imgSrc;
            //    modalDescription.innerText = desc;
                modaloverview.innerText = overview ? overview : "No overview available.";


                // Features
                modalbrand.innerHTML = "";
                if (brand) {
                    brand.split("|").forEach(f => {
                        const li = document.createElement("li");
                        li.textContent = f.trim();
                        modalbrand.appendChild(li);
                    });
                }

                // Categories
                modalcountry.innerText = country ? country : "";

                modal.style.display = "flex";
            });
        });

        // Close modal
        closeBtn.addEventListener("click", () => modal.style.display = "none");
        window.addEventListener("click", (event) => { if (event.target === modal) modal.style.display = "none"; });
        window.addEventListener("keydown", (event) => { if (event.key === "Escape") modal.style.display = "none"; });
    }

    // --- Filter + Search Function ---
    const departmentFilter = document.getElementById("departmentFilter");
    const searchInput = document.getElementById("searchInput");

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

    if (document.body.classList.contains("products-page") && departmentFilter) {
        const params = new URLSearchParams(window.location.search);
        const dept = params.get("dept");
        if (dept) {
            departmentFilter.value = dept;
            filterProducts();
        }
    }

    // --- Active page highlight ---
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split("/").pop();
    const params = new URLSearchParams(window.location.search);
    const currentDept = params.get("dept") || "";

    navLinks.forEach(link => {
        const linkUrl = new URL(link.href, window.location.origin);
        const linkPath = linkUrl.pathname.split("/").pop();
        const linkDept = new URLSearchParams(linkUrl.search).get("dept") || "";

        if (linkPath === currentPath && !linkDept) link.classList.add("active");
        if (linkPath === "products.html" && linkDept === currentDept && currentDept !== "") link.classList.add("active");
        if (currentPath === "products.html" && link.textContent.includes("Products")) link.classList.add("active");
    });

    // --- Contact Form ---
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you! Your inquiry has been submitted. (Form handling not connected yet)");
            form.reset();
        });
    }

    // --- Homepage Slideshow ---
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) { showSlides(slideIndex += n); }
    function currentSlide(n) { showSlides(slideIndex = n); }

    function showSlides(n) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        if (!slides.length) return;

        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");

        slides[slideIndex - 1].style.display = "block";
        if (dots.length) dots[slideIndex - 1].className += " active";
    }

    // Wire slideshow buttons
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    if (prevBtn) prevBtn.addEventListener("click", () => plusSlides(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => plusSlides(1));

    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => currentSlide(index + 1));
    });

    setInterval(() => { plusSlides(1); }, 5000);

    // --- Sticky Header Scroll Effect ---
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) {
            console.warn("⚠️ Header not found, retrying...");
            return false;
        }
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        console.log("✅ Header scroll effect attached");
        return true;
    }

    if (!initHeaderScroll()) {
        const interval = setInterval(() => {
            if (initHeaderScroll()) clearInterval(interval);
        }, 200);
    }

    // --- Mobile Hamburger Menu ---
    function initHamburgerMenu() {
        const menuToggle = document.getElementById("menuToggle");
        const navMenu = document.getElementById("navMenu");

        if (!menuToggle || !navMenu) {
            console.warn("⚠️ Header elements not yet loaded, retrying...");
            return false;
        }

        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        console.log("✅ Mobile menu toggle initialized");
        return true;
    }

    // Retry if header is loaded dynamically
    if (!initHamburgerMenu()) {
        const interval = setInterval(() => {
            if (initHamburgerMenu()) clearInterval(interval);
        }, 200);
    }

    // --- Mobile Dropdown Tap Support ---
    function initMobileDropdowns() {
        const dropdownLinks = document.querySelectorAll(".dropdown > a");

        dropdownLinks.forEach(link => {
            link.addEventListener("click", function (e) {
                // Only on small screens
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // prevent page navigation
                    const dropdownMenu = this.nextElementSibling;
                    if (dropdownMenu) {
                        dropdownMenu.classList.toggle("show");
                    }
                }
            });
        });
    }

    if (!initMobileDropdowns()) {
        const interval = setInterval(() => {
            if (initMobileDropdowns()) clearInterval(interval);
        }, 200);
    }
    
    

});



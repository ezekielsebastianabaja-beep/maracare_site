// scripts.js

document.addEventListener("DOMContentLoaded", function () {
  const productCards = document.querySelectorAll(".product-card");
  const modal = document.getElementById("productModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalImage = document.getElementById("modalImage");
  const modalDescription = document.getElementById("modalDescription");
  const closeBtn = document.querySelector(".close");

  const departmentFilter = document.getElementById("departmentFilter");
  const searchInput = document.getElementById("searchInput");

  // --- Product Modal ---
// Open modal
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

    // Features list
    const featureList = document.getElementById("modalFeatures");
    featureList.innerHTML = "";
    if (features) {
      features.split("|").forEach(f => {
        const li = document.createElement("li");
        li.textContent = f.trim();
        featureList.appendChild(li);
      });
    }

    // Categories
    const modalCats = document.getElementById("modalCategories");
    modalCats.innerText = categories ? categories : "";

    modal.style.display = "flex";
  });
});


  // Close button
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close when clicking outside modal-content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close when pressing Esc key
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });

  // --- Filter + Search Function ---
  function filterProducts() {
    const selectedDept = departmentFilter.value.toLowerCase();
    const searchText = searchInput.value.toLowerCase();

    productCards.forEach(card => {
      // ✅ Support multiple departments (comma-separated list)
      const deptAttr = card.getAttribute("data-department").toLowerCase();
      const departments = deptAttr.split(",").map(d => d.trim());

      const title = card.querySelector("h3").innerText.toLowerCase();
      const desc = card.querySelector("p").innerText.toLowerCase();

      const matchesDept = selectedDept === "all" || departments.includes(selectedDept);
      const matchesSearch = title.includes(searchText) || desc.includes(searchText);

      if (matchesDept && matchesSearch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  departmentFilter.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);
});

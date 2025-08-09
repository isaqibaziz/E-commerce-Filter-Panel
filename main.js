const products = [
  {
    id: 1,
    image: "./images/hoodie 1.avif",
    title: "Black Hoodie",
    description: "New Stylish Messi Printed Hoodies Kangaroo",
    price: 200,
    category: "Hoodie",
    rating: 5,
  },
  {
    id: 2,
    image: "./images/jacket 1.avif",
    title: "Brown Leather Jacket",
    description: "Leather Jacket Brown for Men - Stylish & Premium Leather",
    price: 500,
    category: "Jacket",
    rating: 4,
  },
  {
    id: 3,
    image: "./images/t-shirt 1.avif",
    title: "White simple t-shirt",
    description: "White simple premium quality 2pc tracksut tshirt",
    price: 100,
    category: "T-shirt",
    rating: 3,
  },
  {
    id: 4,
    image: "./images/hoodie 2.avif",
    title: "Girls Premium",
    description: "Fashion by INZ Premium Quality Hoodies For Men Hoodies For Girls",
    price: 400,
    category: "Hoodie",
    rating: 2,
  },
  {
    id: 5,
    image: "./images/jacket 2.avif",
    title: "Black Leather Jacket",
    description: "Black Leather Jacket for Men (100% Original Leather)",
    price: 1000,
    category: "Jacket",
    rating: 1,
  },
  {
    id: 6,
    image: "./images/t-shirt 2.avif",
    title: "Supra t-shirt",
    description: "White Supra Logo Summer Tshirt",
    price: 900,
    category: "T-shirt",
    rating: 5,
  },
  {
    id: 7,
    image: "./images/hoodie 3.avif",
    title: "Cute Cat Print Hoodie",
    description: "Cute cat print hoodie for couples/New winter collection",
    price: 300,
    category: "Hoodie",
    rating: 4,
  },
  {
    id: 8,
    image: "./images/jacket 3.avif",
    title: "Brown Leather Jacket",
    description: "Black Leather Jacket for Men (100% Original Leather)",
    price: 800,
    category: "Jacket",
    rating: 3,
  },
  {
    id: 9,
    image: "./images/t-shirt 3.avif",
    title: "Black & Gray Tracksuit",
    description: "Summer Collection Adventure ",
    price: 200,
    category: "T-shirt",
    rating: 2,
  },
  {
    id: 10,
    image: "./images/hoodie 4.avif",
    title: "Titan Hoodie",
    description: "New hoodie 2025 inspire by attack on titan army logo",
    price: 500,
    category: "Hoodie",
    rating: 2,
  },
  {
    id: 11,
    image: "./images/jacket 4.avif",
    title: "Men's Leather Jacket",
    description: "Men's Leather Jackets at Low Prices",
    price: 1000,
    category: "Jacket",
    rating: 2,
  },
  {
    id: 12,
    image: "./images/t-shirt 4.avif",
    title: "Los Angeles t-shirt",
    description: "Los Angeles Shoulder t-shirt",
    price: 400,
    category: "T-shirt",
    rating: 2,
  },
];

const categories = [...new Set(products.map(p => p.category))];
const ratings = [5, 4, 3, 2, 1];

const categoryFilter = document.getElementById("categoryFilter");
const ratingFilter = document.getElementById("ratingFilter");
const priceRange = document.getElementById("priceRange");
const maxPrice = document.getElementById("maxPrice");
const clearBtn = document.getElementById("clearFilters");
const productsGrid = document.querySelector("#productsGrid > div");
const filterChips = document.getElementById("filterChips");
const clearAllChips = document.getElementById("clearAllChips");
const sortDropdownBtn = document.getElementById("sortDropdownBtn");
const sortDropdown = document.getElementById("sortDropdown");

let selectedCategories = new Set();
let selectedRating = null;
let selectedPrice = 1000;
let currentSort = null;

// Initialize filters
function initFilters() {
    // Category Checkboxes
    categories.forEach(cat => {
        const div = document.createElement("div");
        div.className = "flex items-center";
        div.innerHTML = `
          <input type="checkbox" value="${cat}" id="cat-${cat}" class="category-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
          <label for="cat-${cat}" class="ml-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">${cat}</label>
        `;
        categoryFilter.appendChild(div);
    });

    // Generate Rating
    ratings.forEach(rate => {
        const div = document.createElement("div");
        div.className = "flex items-center";
        div.innerHTML = `
          <input type="radio" name="rating" value="${rate}" id="rate-${rate}" class="rating-radio h-4 w-4 border-gray-300 text-yellow-500 focus:ring-yellow-500">
          <label for="rate-${rate}" class="ml-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer flex items-center">
            ${"★".repeat(rate).padEnd(5, "☆")} & up
          </label>
        `;
        ratingFilter.appendChild(div);
    });

    // For filters
    document.querySelectorAll(".category-checkbox").forEach(cb => {
        cb.addEventListener("change", () => {
            cb.checked ? selectedCategories.add(cb.value) : selectedCategories.delete(cb.value);
            updateFilterChips();
            applyFilters();
        });
    });

    document.querySelectorAll(".rating-radio").forEach(rb => {
        rb.addEventListener("change", () => {
            selectedRating = parseInt(rb.value);
            updateFilterChips();
            applyFilters();
        });
    });

    priceRange.addEventListener("input", () => {
        selectedPrice = parseInt(priceRange.value);
        maxPrice.textContent = `${selectedPrice}`;
        updateFilterChips();
        applyFilters();
    });

    // Clear all filters
    clearBtn.addEventListener("click", () => {
        selectedCategories.clear();
        selectedRating = null;
        selectedPrice = 1000;

        priceRange.value = 1000;
        maxPrice.textContent = "1000";

        document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);
        document.querySelectorAll(".rating-radio").forEach(rb => rb.checked = false);

        currentSort = null;
        updateFilterChips();
        applyFilters();
    });

    // Clear all chips
    clearAllChips.addEventListener("click", () => {
        selectedCategories.clear();
        selectedRating = null;
        selectedPrice = 1000;
        currentSort = null;

        priceRange.value = 1000;
        maxPrice.textContent = "1000";

        document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);
        document.querySelectorAll(".rating-radio").forEach(rb => rb.checked = false);

        updateFilterChips();
        applyFilters();
    });

    // Sorting dropdown
    sortDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sortDropdown.classList.toggle("hidden");
    });

    document.querySelectorAll(".sort-option").forEach(option => {
        option.addEventListener("click", (e) => {
            e.preventDefault();
            currentSort = e.target.dataset.sort;
            updateFilterChips();
            applyFilters();
            sortDropdown.classList.add("hidden");
        });
    });

    document.addEventListener("click", () => {
        sortDropdown.classList.add("hidden");
    });
}

// Update filter chips
function updateFilterChips() {
    filterChips.innerHTML = "";

    // Category chips
    selectedCategories.forEach(cat => {
        const chip = document.createElement("div");
        chip.className = "flex items-center text-sm px-3 py-1 rounded-full";
        chip.innerHTML = `
          ${cat}
          <button class="ml-2" data-type="category" data-value="${cat}">
            <i class="fas fa-times"></i>
          </button>
        `;
        filterChips.appendChild(chip);
    });

    // Rating chip
    if (selectedRating) {
        const chip = document.createElement("div");
        chip.className = "flex items-center text-sm px-3 py-1 rounded-full";
        chip.innerHTML = `
          ${"★".repeat(selectedRating).padEnd(5, "☆")} & up
          <button class="ml-2" data-type="rating">
            <i class="fas fa-times"></i>
          </button>
        `;
        filterChips.appendChild(chip);
    }

    // Price chip
    if (selectedPrice < 1000) {
        const chip = document.createElement("div");
        chip.className = "flex items-center text-sm px-3 py-1 rounded-full";
        chip.innerHTML = `
          Under ${selectedPrice}
          <button class="ml-2 " data-type="price">
            <i class="fas fa-times"></i>
          </button>
        `;
        filterChips.appendChild(chip);
    }

    // Sort chip
    if (currentSort) {
        const sortText = {
            'rating-desc': 'Rating: High to Low',
            'rating-asc': 'Rating: Low to High',
            'price-desc': 'Price: High to Low',
            'price-asc': 'Price: Low to High'
        }[currentSort];

        const chip = document.createElement("div");
        chip.className = "flex items-center bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full";
        chip.innerHTML = `
          ${sortText}
          <button class="ml-2 text-purple-600 hover:text-purple-900" data-type="sort">
            <i class="fas fa-times"></i>
          </button>
        `;
        filterChips.appendChild(chip);
    }

    // Show/hide clear all button
    clearAllChips.classList.toggle("hidden",
        selectedCategories.size === 0 && !selectedRating && selectedPrice === 1000 && !currentSort);

    document.querySelectorAll("#filterChips button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const type = e.target.closest("button").dataset.type;

            if (type === "category") {
                const value = e.target.closest("button").dataset.value;
                selectedCategories.delete(value);
                document.querySelector(`.category-checkbox[value="${value}"]`).checked = false;
            } else if (type === "rating") {
                selectedRating = null;
                document.querySelectorAll(".rating-radio").forEach(rb => rb.checked = false);
            } else if (type === "price") {
                selectedPrice = 1000;
                priceRange.value = 1000;
                maxPrice.textContent = "1000";
            } else if (type === "sort") {
                currentSort = null;
            }

            updateFilterChips();
            applyFilters();
        });
    });
}

function applyFilters() {
    let filtered = products.filter(p => {
        const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(p.category);
        const ratingMatch = !selectedRating || p.rating >= selectedRating;
        const priceMatch = p.price <= selectedPrice;
        return categoryMatch && ratingMatch && priceMatch;
    });

    // Apply sorting
    if (currentSort) {
        const [field, direction] = currentSort.split("-");
        filtered.sort((a, b) => {
            if (direction === "desc") {
                return b[field] - a[field];
            } else {
                return a[field] - b[field];
            }
        });
    }

    renderProducts(filtered);
}

// Render products
function renderProducts(list) {
    productsGrid.innerHTML = "";

    list.forEach(p => {
        productsGrid.innerHTML += `
          <div class="bg-gradient-to-br from-green-100 via-blue-100 to-cyan-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div class="relative overflow-hidden h-60">
              <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              <span class="absolute top-2 right-2 bg-white/90 text-xs font-semibold px-2 py-1 rounded-full">${p.category}</span>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-1 truncate">${p.title}</h3>
               <p class="max-h-24 text-xs overflow-auto">${p.description}</p>
              <div class="flex items-center mb-2">
                <div class="text-yellow-400">
                  ${"★".repeat(p.rating).padEnd(5, "☆")}
                </div>
                <span class="text-xs text-gray-500 ml-1">(${p.rating})</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-green-600 font-bold text-lg">${p.price}$</span>
                <button class="text-sm bg-gradient-to-br from-gray-700 via-blue-900 hover:bg-blue-200 text-white px-3 py-1 rounded-full transition">
                  <i class="fas fa-shopping-cart mr-1"></i></button>
              </div>
            </div>
          </div>
        `;
    });
}

// Initialize
maxPrice.textContent = "1000";
initFilters();
applyFilters();
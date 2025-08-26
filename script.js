// Function to search recipes by ingredient
function searchRecipes() {
  const query = document.getElementById("search-input").value.trim();

  // Check if input is empty
  if (!query) {
    alert("Please enter an ingredient!");
    return;
  }

  // Show loading
  document.getElementById("loading").style.display = "block";

  // Fetch recipes from TheMealDB API
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; // Clear old results

      if (!data.meals) {
        resultsDiv.innerHTML = "<p>No recipes found. Try another ingredient.</p>";
        return;
      }

      // Loop through recipes and create cards
      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <a href="https://www.themealdb.com/meal.php?c=${meal.idMeal}" target="_blank">
            View Recipe
          </a>
        `;

        resultsDiv.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      document.getElementById("results").innerHTML = "<p>Something went wrong. Please try again later.</p>";
    })
    .finally(() => {
      // Hide loading after fetch completes
      document.getElementById("loading").style.display = "none";
    });
}

// Function to fetch a random recipe
function getRandomRecipe() {
  // Show loading
  document.getElementById("loading").style.display = "block";

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; // Clear old results

      const meal = data.meals[0];
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <a href="https://www.themealdb.com/meal.php?c=${meal.idMeal}" target="_blank">
          View Full Recipe
        </a>
      `;

      resultsDiv.appendChild(card);
    })
    .catch(error => {
      console.error("Error fetching random recipe:", error);
      document.getElementById("results").innerHTML = "<p>Something went wrong. Try again!</p>";
    })
    .finally(() => {
      // Hide loading after fetch completes
      document.getElementById("loading").style.display = "none";
    });
}
// Dark Mode Toggle
const toggleBtn = document.getElementById("darkModeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Save preference to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

// Apply saved preference on page load
window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }
};

// Function to search recipes by ingredient
function searchRecipes() {
  const query = document.getElementById("search-input").value.trim();

  // Check if input is empty
  if (!query) {
    alert("Please enter an ingredient!");
    return;
  }

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
    });
}

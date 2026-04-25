const MERCH_CATALOG = {
  poster: { id: "poster", name: "Kurt Cobain Poster", price: 15.0 },
  hoodie: { id: "hoodie", name: "Kurt Cobain Hoodie", price: 45.0 },
  guitar: { id: "guitar", name: "Cobain Style E Guitar", price: 299.0 },
  album: { id: "album", name: "Nevermind Album Print", price: 25.0 },
  vinyl: { id: "vinyl", name: "Nirvana Vinyl Edition", price: 31.0 }
};

const BASKET_KEY = "kurtBasket";
const REVIEWS_KEY = "reviews";

function loadBasket() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BASKET_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveBasket(items) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(items));
}

function getBasketTotal(items) {
  return items.reduce((total, item) => total + (item.price || 0), 0);
}

function updateCartBadges() {
  const items = loadBasket();
  const count = items.length;
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(count);
  });
}

function addItemToBasket(itemId) {
  const item = MERCH_CATALOG[itemId];
  if (!item) {
    return;
  }
  const current = loadBasket();
  current.push(item);
  saveBasket(current);
  updateCartBadges();
}

function removeItemFromBasket(index) {
  const current = loadBasket();
  if (index < 0 || index >= current.length) {
    return;
  }
  current.splice(index, 1);
  saveBasket(current);
}

function clearBasket() {
  saveBasket([]);
  updateCartBadges();
}

function renderBasketPanel() {
  const list = document.querySelector("[data-basket-items]");
  const totalOutput = document.querySelector("[data-basket-total]");
  const emptyText = document.querySelector("[data-basket-empty]");

  if (!list || !totalOutput || !emptyText) {
    return;
  }

  const items = loadBasket();
  list.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    const itemText = document.createElement("span");
    itemText.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeItemFromBasket(index);
      renderBasketPanel();
      updateCartBadges();
    });

    li.appendChild(itemText);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });

  totalOutput.textContent = `$${getBasketTotal(items).toFixed(2)}`;
  emptyText.style.display = items.length ? "none" : "block";
}

function initMerchButtons() {
  document.querySelectorAll("[data-add-id]").forEach((button) => {
    button.addEventListener("click", () => {
      addItemToBasket(button.dataset.addId);
    });
  });
}

function initBasketControls() {
  const clearButton = document.querySelector("[data-clear-basket]");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      clearBasket();
      renderBasketPanel();
    });
  }
}

function loadReviews() {
  try {
    const parsed = JSON.parse(localStorage.getItem(REVIEWS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveReviews(reviews) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function renderReviews() {
  const reviewsList = document.getElementById("reviewsList");
  if (!reviewsList) {
    return;
  }

  const reviews = loadReviews();
  reviewsList.innerHTML = "";

  reviews.forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-card";

    const name = document.createElement("h3");
    name.textContent = review.username;

    const text = document.createElement("p");
    text.textContent = review.text;

    card.appendChild(name);
    card.appendChild(text);
    reviewsList.appendChild(card);
  });
}

function initReviewForm() {
  const form = document.getElementById("userReviewForm");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const reviewInput = document.getElementById("reviewText");

    if (!usernameInput || !reviewInput) {
      return;
    }

    const username = usernameInput.value.trim();
    const text = reviewInput.value.trim();

    if (!username || !text) {
      return;
    }

    const reviews = loadReviews();
    reviews.push({ username, text });
    saveReviews(reviews);

    form.reset();
    renderReviews();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  initMerchButtons();
  initBasketControls();
  renderBasketPanel();
  initReviewForm();
  renderReviews();
});

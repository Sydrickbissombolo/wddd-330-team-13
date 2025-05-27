import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  cartList.innerHTML = ""; // Clear existing cart contents

  if (cartItems.length === 0) {
    cartFooter.classList.add("hide");
    return;
  }

  // Show the footer if items exist
  cartFooter.classList.remove("hide");

  // Render each cart item
  cartItems.forEach((item) => {
    const itemHTML = `
      <li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img src="${item.Image}" alt="${item.Name}" />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        <span class="remove-button" data-id="${item.Id}">❌</span>
      </li>
    `;
    cartList.insertAdjacentHTML("beforeend", itemHTML);
  });

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0,
  );
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // Add remove button event listeners
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function removeFromCart(e) {
  const productId = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  // Filter out the removed item
  cartItems = cartItems.filter((item) => item.Id !== productId);

  // Save updated cart and re-render
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();

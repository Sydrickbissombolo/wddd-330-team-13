import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartList = document.querySelector(".product-list");

  cartList.innerHTML = ""; // Clear existing content

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

  // Add event listeners to all remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

function removeFromCart(e) {
  const productId = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  // Remove the selected item
  cartItems = cartItems.filter((item) => item.Id !== productId);

  // Save updated cart and re-render
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();

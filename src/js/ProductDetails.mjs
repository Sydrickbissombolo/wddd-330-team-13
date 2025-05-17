import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        // checking if product is found before rendering
        if (!this.product) {
            console.error("Product not found");
            return;
        }
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails() {
        ProductDetailsTemplate(this.product);
    }

}

function ProductDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Images;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDescription").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("AddToCart").dataset.id = product.Id;
}
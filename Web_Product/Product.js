// Cart
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart")

// Open Cart
cartIcon.onclick = () =>{
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () =>{
    cart.classList.remove("active");
};


// Cart Working JS
if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",ready);
} else {
    ready();
}

// Making Function
function ready(){
    // Remove Item From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add To Cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++){
        var button =addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work
    document

    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

// Buy Button
function buyButtonClicked(){

    var address = document.getElementById("address").value;

    alert("Your Order is placed!\nShipping Address:\n address");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// Remove Item From Cart
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// Quantity Changes
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatetotal();
}

// Add To Cart
function addCartClicked(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    var cartItem = document.getElementsByClassName("cart-content")[0];
    addProductToCart(title, price, productImg,cartItem);
    updatetotal();
}

function addProductToCart(title, price, productImg, cartItem){

    var cartItemsNames = cartItem.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            alert("You have already add this item to cart");
            return;
        }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartBoxContent = `            
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <i class="fa-solid fa-trash cart-remove" style="color: #000000;"></i>`;
    cartShopBox.innerHTML = cartBoxContent;

    cartItem.append(cartShopBox);

    cartShopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);


    updatetotal();
}

// Update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerHTML.replace("฿",""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }

    // Calculate the total after discount
    var discountThreshold = 1000;
    if (total >= discountThreshold) {
        var discountAmount = total * 0.1; // 10% discount
        total -= discountAmount;
    }

        // if price contain some satangs(สตางค์) Value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "฿" + total;
}
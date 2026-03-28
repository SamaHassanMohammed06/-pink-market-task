window.addEventListener("load", function () {
    let user_data = JSON.parse(localStorage.getItem('userData'));
    let cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
    let cart_head = document.getElementById("cart_header");
    let cartList = document.getElementById("cart-list");
    let totalElement = document.getElementById("total-price");
    let total = 0;
    if (!user_data || !user_data.is_login) {
        cart_head.innerText = "";
        cartList.innerHTML = '<p><b>You Have to Login First</b></P>';
    }
    else {
        if (cartItems.length > 0) {
            cartList.innerHTML = "";

            cartItems.forEach(item => {
                total += item.price * item.quantity;

                cartList.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" width="50">
                    <span>${item.name}</span>
                    <span>${item.price}$</span>
                    <span>Quantity: ${item.quantity}</span>
                    <div class="btn"><button onclick="window.location.href='details.html?id=${item.id}&category=${item.category}'">
                    Details
                    </button></div>
                </div>
            `;
            });
            totalElement.innerText = "Total Amount: " + total + "$";
        } else {
            cartList.innerHTML = `<p>Your cart is empty</p>
            <div class="container"><button id="go_home_cart" onclick="window.location.href='index.html'">Go Shopping</button></div>`;
            totalElement.innerText = "";
        }
    }
});
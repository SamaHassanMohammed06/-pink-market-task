window.addEventListener("load", function () {

    let xhr = new XMLHttpRequest();
    let id = new URLSearchParams(location.search).get("id");
    let category = new URLSearchParams(location.search).get("category");
    let scrollPos = new URLSearchParams(location.search).get("scroll") || 0;

    function my_cart(product) {
        let cart_button = document.getElementById("cart_btn");
        //remove button
        let remove_button = document.getElementById("remove_btn");
        let user_data = JSON.parse(localStorage.getItem('userData'));

        function login_fisrt() {
            alert("Please login first");
            window.location.href = "auth.html";
        }
        function get_cart_items() {
            return JSON.parse(localStorage.getItem('cart_items')) ? JSON.parse(localStorage.getItem('cart_items')) : [];
        }
        //  Add to Cart 
        cart_button.addEventListener('click', function () {
            if (!user_data || !user_data.is_login) {
                login_fisrt();
            }
            else {
                let chosen_items = get_cart_items();
                let exist = chosen_items.find(item => item.id == product.id && item.category == product.category);

                if (exist) {
                    exist.quantity++;
                } else {
                    chosen_items.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                        stock: product.stock,
                        category: product.category,
                        user_name: user_data.username
                    });
                }
                localStorage.setItem('cart_items', JSON.stringify(chosen_items));
                alert("Item added to cart");
            }
        });

        // Remove from Cart 
        remove_button.addEventListener('click', function () {
            if (!user_data || !user_data.is_login) {
                login_fisrt();
            }
            else {
                let chosen_items = get_cart_items();
                let exist = chosen_items.find(item => item.id == product.id && item.category == product.category);
                if (!exist) {
                    alert("This item is not in your cart");
                }
                if (exist.quantity > 1) {
                    exist.quantity--;
                } else {
                    chosen_items = chosen_items.filter(item => !(item.id == product.id && item.category == product.category));
                }

                localStorage.setItem('cart_items', JSON.stringify(chosen_items));
                alert("Item removed from cart");
            }
        });
    }



    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            let product = data.find(item => item.id == id);
            wrapper = document.getElementById("wrapper");

            fill_details(product);
            my_cart(product);
        }
    };

    function fill_details(product) {
        let details = `
        <div class="img">
            <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="details">
            <p class="head">Name:<br>${product.name}</p>
            <p class="head">Description:<br>${product.description}</p>
            <p class="head">Price: ${product.price}$</p>
            <p class="head">Stock: ${product.stock}</p>
            <div class="buttons-container">
                <button id="cart_btn">+</button>
                <button id="remove_btn">-</button>
        </div>`;
        wrapper.innerHTML = details;
    }

    
    // Back button from details to home
    let last_page = document.referrer.split('/').pop();
    if (window.location.pathname.split('/').pop() === "details.html" && last_page != "cart.html") {
        let backBtn = document.createElement("button");
        backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
        backBtn.className = "back-btn";
        backBtn.addEventListener("click", function () {
            window.location.href = `index.html?category=${category}&scroll=${scrollPos}`;
        });
        document.querySelector("main").prepend(backBtn);
    }
    xhr.open('GET', category === "News" ? `../news.json` : `../data.json`);
    xhr.send();
});
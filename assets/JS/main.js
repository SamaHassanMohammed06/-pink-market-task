window.addEventListener('load', () => {

    const all_btns = document.querySelectorAll(".categories button");
    const heading = document.getElementById("heading");
    const hero_cont = document.querySelector(".hero");

    const urlParams = new URLSearchParams(location.search);
    const returnCategory = urlParams.get("category");
    const returnScroll = parseInt(urlParams.get("scroll")) || 0;

    if (returnCategory) {
        load_category(returnCategory, () => {
            window.scrollTo({ top: returnScroll, behavior: "instant" });
        });
    } else {
        home();
    }

    function display_products(products, category) {
        let product_data = "";
        for (let item of products) {
            product_data += `
                <div class="hero_content">
                    <img src="${item.image}" alt="">
                    <div class="product_name">
                        <p>${item.name}</p>
                    </div>
                    <div class="price">
                        <h3>${item.price}$</h3>
                    </div>  
                    <div class="btn"><button onclick="window.location.href='details.html?id=${item.id}&category=${category}&scroll=' + window.scrollY">
                    Details
                    </button></div>
                </div>
            `;
        }
        hero_cont.innerHTML = product_data;
    }

    function load_category(category, callback) {
        smooth_move();
        let xhr = new XMLHttpRequest();
        let isNews = category === "news";
        xhr.open('GET', isNews ? `news.json` : `${category}.json`);
        xhr.onload = () => {
            if (xhr.status === 200) {
                let all_products = JSON.parse(xhr.responseText);
                display_products(all_products, category);
                if (category === "Bags_Wallets") { heading.textContent = "Bags and Wallets Section" }
                else if (category === "Hair_Products") { heading.textContent = "Hair Products Section" }
                else if (category === "Skincare_Products") { heading.textContent = "Skincare Products Section" }
                else { heading.textContent = isNews ? `New Arrival!` : `${category} Section`; }
                if (callback) callback();
            }
        };
        xhr.send();
    }

    all_btns.forEach(button => {
        button.addEventListener('click', function () {
            let selected_id_btn = this.id;
            load_category(selected_id_btn);
        });
    });

    function home() {
        load_category("news");
    }

    const link = document.querySelectorAll(".nav_bar ul li a");
    link[0].addEventListener('click', (e) => {
        e.preventDefault();
        home();
    });

    function smooth_move() {
        hero_cont.classList.remove('smooth');
        void hero_cont.offsetWidth;
        hero_cont.classList.add('smooth');
    }
});

window.addEventListener("load", function () {

    let xhr = new XMLHttpRequest();

    let id = new URLSearchParams(location.search).get("id");
    let category = new URLSearchParams(location.search).get("category");
    let scrollPos = new URLSearchParams(location.search).get("scroll") || 0;

    let backBtn = document.createElement("button");
    backBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
    backBtn.className = "back-btn";
    backBtn.title = "Back";
    backBtn.addEventListener("click", function () {
        window.location.href = `index.html?category=${category}&scroll=${scrollPos}`;
    });
    document.querySelector("main").prepend(backBtn);

    xhr.onload = () => {

        if (xhr.status === 200) {

            let data = JSON.parse(xhr.responseText);

            let product = data.find(item => item.id == id);

            let wrapper = document.getElementById("wrapper");

            let details = `
            <div class="img">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="details">
                <p class="head">Name:<br>${product.name}</p>
                <p class="head">Description:<br>${product.description}</p>
                <p class="head">Price: ${product.price}$</p>
                <p class="head">Stock: ${product.stock}</p>
            </div>
            `;

            wrapper.innerHTML = details;
        }
    };
    xhr.open('GET', category === "News" ? `../news.json` : `../data.json`);
    xhr.send();

});

window.addEventListener('load', function () {
  const name = document.getElementById("name");
  const Username = document.getElementById("name-profile");
  const email = document.getElementById("email");
  const logOutBtn = document.getElementById("btn");

  const container = document.getElementById('button-container');
  container.innerHTML = `<button class="back-btn" title="Back">
  <i class="fa-solid fa-arrow-left"></i>
</button>`;

  const backBtn = container.querySelector('.back-btn');
  backBtn.addEventListener('click', function () {
    window.location.href = 'index.html';
  });

  let data = localStorage.getItem("userData");
  let storedData = JSON.parse(data);
  let user_name = storedData.username;
  let Email = storedData.email;
  if (!user_name || !Email) {
    window.location.href = "index.html";
  } else {
    name.innerHTML = ` Name: ${user_name}`;
    Username.innerHTML = `HI , ${user_name}`;
    email.innerHTML = `Email: ${Email}`;

    logOutBtn.addEventListener("click", () => {
      storedData.is_login = false;
      localStorage.setItem('userData', JSON.stringify(storedData));
      window.location.href = "index.html";
    })
  }
});//end of loading
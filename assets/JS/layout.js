function Layout() {
    const navHTML = `
    <nav>
        <div class="nav_bar">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="#">Service</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
        <div class="logo">
            <img src="../assets/images/IMG-20251221-WA0173.png" alt="Logo">
        </div>
        <div class="icons">
            <a href="auth.html"><i class="fa-regular fa-user"></i></a>
            <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>
            <a href="favorites.html"><i class="fa-regular fa-heart" id="nav-heart"></i></a>
            <a href="cart.html"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
    </nav>`;

    const footerHTML = `
    <div class="footer_container">
      <div class="footer_section about">
        <h3>Our Brand</h3>
        <p>We provide the best services with a touch of elegance and care for our customers.</p>
      </div>
      <div class="footer_section links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer_section social">
        <h4>Follow Us</h4>
        <div class="social_icons">
          <a href="#"><i class="fa-brands fa-facebook"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="#"><i class="fa-brands fa-twitter"></i></a>
        </div>
      </div>
    </div>
    <div class="footer_bottom"><p>&copy; 2026 Il Cielo. All rights reserved.</p></div> `;

  
    if (document.querySelector('.first_view')) document.querySelector('.first_view').innerHTML = navHTML;
    if (document.querySelector('footer')) document.querySelector('footer').innerHTML = footerHTML;
}

Layout();
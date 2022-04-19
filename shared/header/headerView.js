export function buildHeaderView() {
  const template = `
    <a href="/">
      <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1462905487/cbrm3t2yl4irxsbvjpin.png" alt="wallapop logo">
    </a>
    <div style="display: none" class="search-products-wrapper">
      <input type="text">
      <select name="categories">
        <option value="*">todas</option>
        <option value="coches">coches</option>
        <option value="motos">motos</option>
        <option value="moda">moda</option>
        <option value="inmobiliaria">inmobiliaria</option>
        <option value="electronica">electrónica</option>
        <option value="moviles">móviles</option>
        <option value="deporte">deporte</option>
        <option value="informatica">informática</option>
        <option value="consolas">consolas y videojuegos</option>
        <option value="electrodomesticos">electrodomésticos</option>
      </select>
    </div>
    <div class="auth-buttons-wrapper" style="display: none">
      <button data-destiny="/login.html" style="display: none">Login</button>
      <button data-destiny="/signup.html" style="display: none">Signup</button>
    </div>
    <div class="user-options-wrapper" style="display: none">
      <span></span>
      <button id="createProductButton" data-destiny="/createProduct.html" style="display: none">➕</button>
      <button id="logoutButton">🚫</button>
    </div>
  `;

  return template;
}

export function buildOptionView(option) {
  return `<option value="${option.value}">${option.text}</option>`;
}

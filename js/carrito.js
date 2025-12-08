let cartContainer = document.getElementById("cart-section");

// Carga del carrito
let cartStorage = JSON.parse(localStorage.getItem("cartPrincipal")) || [];

// Render del carrito
function renderCarrito(cartItems) {
  cartContainer.innerHTML = "";

  cartItems.forEach((producto, index) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <h4>$${producto.precio}</h4>
      <button class="btn-eliminar" data-index="${index}">Eliminar</button>
    `;

    cartContainer.appendChild(card);
  });

  // Botón eliminar ítem
  const botonesEliminar = document.querySelectorAll(".btn-eliminar");
  botonesEliminar.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartStorage.splice(index, 1);
      localStorage.setItem("cartPrincipal", JSON.stringify(cartStorage));
      renderCarrito(cartStorage);
    });
  });
}

// Vaciar carrito
const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    cartStorage = [];
    localStorage.setItem("cartPrincipal", JSON.stringify(cartStorage));
    renderCarrito(cartStorage);
  });
}

// FORMULARIO DE COMPRA 
function mostrarFormulario() {
  cartContainer.innerHTML = `
    <h2>Datos de envío</h2>
    <form id="form-pedido">

      <label>Nombre completo</label>
      <input type="text" id="nombre" required>

      <label>Dirección</label>
      <input type="text" id="direccion" required>

      <label>Teléfono</label>
      <input type="text" id="telefono" required>

      <label>Método de pago</label>
      <select id="pago" required>
        <option value="" disabled selected>Seleccionar</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Tarjeta">Tarjeta</option>
        <option value="Transferencia">Transferencia</option>
      </select>

      <button id="finalizar-pedido" type="submit">Finalizar Pedido</button>
    </form>
  `;

  // Evento de finalizar pedido
  const form = document.getElementById("form-pedido");

 form.addEventListener("submit", (e) => {
  e.preventDefault();

  //  copia del pedido ANTES de vaciarlo
  let pedidoFinal = [...cartStorage];

  // Calculamos el total
  let total = 0;
  pedidoFinal.forEach(p => total += p.precio);

  //  vaciamos carrito
  cartStorage = [];
  localStorage.setItem("cartPrincipal", JSON.stringify(cartStorage));

  // detalle del pedido
  cartContainer.innerHTML = `
    <h2>¡Gracias por tu pedido!</h2>
    <h3>Detalle del pedido:</h3>
  `;

  pedidoFinal.forEach(item => {
    const detalle = document.createElement("div");
    detalle.innerHTML = `
      <p>${item.nombre} - $${item.precio}</p>
    `;
    cartContainer.appendChild(detalle);
  });

  // Mostramos el total
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
  cartContainer.appendChild(totalDiv);

  // Sweet Alert 
  Swal.fire({
    title: "Pedido realizado con éxito",
    icon: "success",
    draggable: true
  });
});

}

// realizar compra
const btnComprar = document.getElementById("realizar-compra");
if (btnComprar) {
  btnComprar.addEventListener("click", () => {
    mostrarFormulario();
  });
}


renderCarrito(cartStorage);

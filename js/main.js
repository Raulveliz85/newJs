const URL = "./db/data.json";
const principalContainer = document.getElementById("principal-container");

let listaPrincipal = [];
let cartPrincipal = JSON.parse(localStorage.getItem("cartPrincipal")) || [];

async function obtenerProductos() {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    listaPrincipal = data;
    renderizarProductos(listaPrincipal);
  } catch (error) {
    Swal.fire("Error", "No se pudieron cargar los productos", "error");
  }
}

function renderizarProductos(productos) {
  principalContainer.innerHTML = "";

  productos.forEach(producto => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <h4>$${producto.precio}</h4>
      <button class="btn-agregar" data-id="${producto.id}">Agregar</button>
    `;

    principalContainer.appendChild(card);
  });

  agregarEventos();
}

function agregarEventos() {
  const botones = document.querySelectorAll(".btn-agregar");

  botones.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const producto = listaPrincipal.find(p => p.id == id);

      if (producto) {
        cartPrincipal.push(producto);
        localStorage.setItem("cartPrincipal", JSON.stringify(cartPrincipal));

        Swal.fire("Producto agregado", "Se agregó al carrito", "success");
      }
    });
  });
}

obtenerProductos();



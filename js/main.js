const URL = "./db/data.json";
let principalContainer = document.getElementById("principal-container");


let cartPrincipal = JSON.parse(localStorage.getItem("cartPrincipal")) ;


let listaPrincipal = [];

function obtenerProductos() {
	fetch(URL)
		.then(response => response.json())
		.then(data => {
			listaPrincipal = data; 
			renderizarProductos(data);
			agregarAlCarrito();    
		})
}

function renderizarProductos(listaProductos) {
	listaProductos.forEach(plato => {
		let card = document.createElement("div");
		card.innerHTML = `
			<h2>Menu</h2>
			<h3>Producto: ${plato.nombre}</h3>
			<h4>Precio: $${plato.precio}</h4>
			<button class="principalAgregar" id="${plato.id}">Agregar</button>
		`;
		principalContainer.appendChild(card);
	});
}

obtenerProductos();

function agregarAlCarrito() {
	let addButton = document.querySelectorAll(".principalAgregar");

	addButton.forEach(button => {
		button.onclick = (e) => {

			let principalId = e.currentTarget.id;

		
			const selectedPrincipal = listaPrincipal.find(plato => plato.id == principalId);

			
			if (selectedPrincipal) {
				cartPrincipal.push(selectedPrincipal);
				localStorage.setItem("cartPrincipal", JSON.stringify(cartPrincipal));
			}

		};
	});
}




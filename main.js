// Declara un array de objetos para los productos
const productos = [
    {
        id: 1,
        nombre: "Mesa Ratona",
        precio: 30000,
        img: "./img/Mesa-ratona.jpg",
    },
    {
        id: 2,
        nombre: "Sillon Doble",
        precio: 60000,
        img: "./img/sillondoble.jpeg",
    },
    {
        id: 3,
        nombre: "Sillon de Paraiso",
        precio: 40000,
        img: "./img/Simple-2.jpeg",
    },
    {
        id: 4,
        nombre: "Sillon de Petribi",
        precio: 50000,
        img: "./img/simple.jpeg",
    },
];

// Inicializa el valor del carrito en 0
let carrito = 0;

// Obtiene los contenedores necesarios del DOM
const contenedorProductos = document.getElementById("contenedorProductos");
const totalCarrito = document.getElementById("totalCarrito");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const comprarCarrito = document.getElementById("comprarCarrito");

// Agrega las tarjetas de productos al contenedor de productos
productos.forEach((item) => {
    const container = document.createElement("div");
    container.classList.add("tarjeta");

    const imagen = document.createElement("img");
    imagen.src = item.img;
    imagen.classList.add("imagenesProductos");
    container.appendChild(imagen);

    container.innerHTML += `
    <h2>${item.nombre}</h2>
    <h3>$${item.precio}</h3>
    <button class="boton" data-id="${item.id}"> Agregar al Carrito </button>
    `;

    contenedorProductos.appendChild(container);
});


// Función para actualizar la visibilidad de los botones del carrito
function actualizarBotones() {
    if (carrito === 0) {
        comprarCarrito.style.display = "none";
        vaciarCarrito.style.display = "none";
    } else {
        comprarCarrito.style.display = "block";
        vaciarCarrito.style.display = "block";
    }
}

// Llamada inicial para verificar la visibilidad de los botones al cargar la página
actualizarBotones();

// Recupera el valor del carrito del almacenamiento local al cargar la página
const carritoGuardado = localStorage.getItem("carrito");

// Si se encuentra un valor de carrito guardado, actualiza la variable carrito
if (carritoGuardado) {
    carrito = parseInt(carritoGuardado, 10);
    totalCarrito.innerText = `Total en el carrito: $${carrito}`;
}

// Función para agregar productos al carrito
function agregarAlCarrito(boton) {
    const productId = boton.getAttribute("data-id");
    const productoSeleccionado = productos.find((item) => item.id === Number(productId));

    if (productoSeleccionado) {
        carrito += productoSeleccionado.precio;
        totalCarrito.innerText = `Total en el carrito: $${carrito}`;
        localStorage.setItem("carrito", carrito.toString());
        actualizarBotones();
    }
}

// Función para vaciar el carrito y el valor en el almacenamiento local
function vaciarCarritoFuncion() {
    carrito = 0;
    totalCarrito.innerText = "Total en el carrito: $0";
    localStorage.removeItem("carrito");
    actualizarBotones();
}

// Agrega eventos a los botones para agregar al carrito y vaciar el carrito
const agregarProductos = document.querySelectorAll(".boton");
agregarProductos.forEach((boton) => {
    boton.addEventListener("click", (event) => {
        agregarAlCarrito(boton);
    });
});

vaciarCarrito.addEventListener("click", () => {
    vaciarCarritoFuncion();
});

comprarCarrito.addEventListener("click", () => {
    alert("Gracias por su compra!");
    vaciarCarritoFuncion();
});


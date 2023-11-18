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

// Obtiene los contenedores necesarios del DOM
const contenedorProductos = document.getElementById("contenedorProductos");
const numero = document.getElementById("numero");

// Funcion para agregar las tarjetas de productos al contenedor de productos
function subirProductos() {
    productos.forEach((producto) => {
        const container = document.createElement("div");
        container.classList.add("tarjeta");
        container.innerHTML += `
        <img class="imagenesProductos" src="${producto.img}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <h3>$${producto.precio}</h3>
        <button class="boton" id="${producto.id}"> Agregar al Carrito </button>
        `;
        contenedorProductos.appendChild(container);
    });
}

subirProductos()

//llamado del boton para agregar al carrito
const botonAgregar = document.querySelectorAll(".boton");
// Función para asignar la accion de agregar productos al carrito
botonAgregar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
});

//Declaramos un array para almacenar los productos en el carrito
let productosCarrito;
let productosCarritoLs = localStorage.getItem("productosEnCarrito");

if (productosCarritoLs){
    productosCarrito = JSON.parse(productosCarritoLs);
    actualizarNumero();
} else {
    productosCarrito = [];
}

//Funcion que contiene la accion del boton agregar al carrito 
function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to left, #413131, #6e5a5a)",
          borderRadius: "0.375rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === parseInt(idBoton))

    if(productosCarrito.some(producto => producto.id === parseInt(idBoton))) {
        const index = productosCarrito.findIndex(producto => producto.id === parseInt(idBoton))
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    actualizarNumero();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
}

function actualizarNumero() {
    let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}


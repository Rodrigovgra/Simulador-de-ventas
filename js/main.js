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
const numero = document.getElementById("numero")
// const funcionesCarrito = document.getElementById("funciones-carrito");
// const totalCarrito = document.getElementById("totalCarrito");
// const vaciarCarrito = document.getElementById("vaciarCarrito");
// const comprarCarrito = document.getElementById("comprarCarrito");

// Funcion para agregar las tarjetas de productos al contenedor de productos
function subirProductos() {
    productos.forEach((producto) => {
        const container = document.createElement("div");
        container.classList.add("tarjeta");
        // const imagen = document.createElement("img");
        // imagen.src = producto.img;
        // imagen.classList.add("imagenesProductos");
        // container.appendChild(imagen);
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
const productosCarrito = [];
//Funcion que contiene la accion del boton agregar al carrito 
function agregarAlCarrito(e) {

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


// // Función para vaciar el carrito y el valor en el almacenamiento local
// function vaciarCarritoFuncion() {
//     carrito = 0;
//     totalCarrito.innerText = "Total en el carrito: $0";
//     localStorage.removeItem("carrito");
//     actualizarBotones();
// }

// // Recupera el valor del carrito del almacenamiento local al cargar la página
// const carritoGuardado = localStorage.getItem("carrito");

// // Agrega eventos a los botones para agregar al carrito y vaciar el carrito

// agregarProductos.forEach((boton) => {
//     boton.addEventListener("click", (event) => {
//         agregarAlCarrito(boton);
//     });
// });

// vaciarCarrito.addEventListener("click", () => {
//     vaciarCarritoFuncion();
// });

// comprarCarrito.addEventListener("click", () => {
//     alert("Gracias por su compra!");
//     vaciarCarritoFuncion();
// });




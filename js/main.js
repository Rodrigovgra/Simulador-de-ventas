// Declaro un array para los productos
let productos = [];

// Creo un fetch para traer el array almacenado en el json local
fetch ("js/productos.json")
    .then(res => res.json())
    .then(data => {
    productos = data;
    subirProductos(productos);
});

// Accedo a los elementos necesarios del DOM
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
    actualizarBotonesAgregar()
    //llamo a la funcion para que cada vez que se ejecute la funcion subirProductos se asigne tambien la funcion de agregarAlCarrito
}

//Creo la funcion para asignarle un evento a los botones de agregar al carrito, lo hago mediante funcion para poder llamarla cada vez que se creen las tarjetas
function actualizarBotonesAgregar() {
    //llamado de todos los botones de agregar al carrito
    const botonAgregar = document.querySelectorAll(".boton");
    // Función para asignar la accion de agregar productos al carrito a los botones
    botonAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

//Declaro la variable sin un valor especifico
let productosCarrito;

//Hago un llamado al carrito del localStorage y lo almaceno en la variable productosCarritoLs
let productosCarritoLs = localStorage.getItem("productosEnCarrito");

//Si productosCarritoLs tiene contenido parseo la info y se la asigno a la variable de productosCarrito
if (productosCarritoLs){
    productosCarrito = JSON.parse(productosCarritoLs);
    //llamo a la funcion para actualizar el numero del carrito
    actualizarNumero();
} else {
    //si no hay info en localStorage se inicia productosCarrito como una arreglo vacio
    productosCarrito = [];
}

//Funcion que contiene la accion del boton agregar al carrito 
function agregarAlCarrito(e) {
    //Agrego un toast cada vez que se agrega un producto al carrito
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to left, #413131, #6e5a5a)",
          borderRadius: "0.375rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
          },
        onClick: function(){} 
    }).showToast();
    // Obtengo el id del botón para reconocer el producto que se agrega al carrito
    const idBoton = e.currentTarget.id;
    //busco el id del producto mediante un find
    const productoAgregado = productos.find(producto => producto.id === parseInt(idBoton))
    //verifico si el producto ya está en el carrito
    if(productosCarrito.some(producto => producto.id === parseInt(idBoton))) {
        //si el producto ya esta en el carrito aumento su cantidad
        const index = productosCarrito.findIndex(producto => producto.id === parseInt(idBoton))
        productosCarrito[index].cantidad++;
    } else {
        //si no esta en el carrito lo agrego con la cantidad 1
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }
    //se actualiza el numero del carrito y se guarda la info en el localStorage
    actualizarNumero();
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
}

//Funcion para actualizar el numero del carrito mediante un reduce
function actualizarNumero() {
    let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = nuevoNumero;
}


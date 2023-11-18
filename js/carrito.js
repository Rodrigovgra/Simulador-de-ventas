let productosCarrito = localStorage.getItem("productosEnCarrito");
productosCarrito = JSON.parse(productosCarrito);


const carritoVacio = document.getElementById("carritoVacio");
const contenedorProductos = document.getElementById("productos-carrito");
const contenedorFunciones = document.getElementById("funciones-carrito");
const compraRealizada = document.getElementById("compra-realizada");
let productoCarritoEliminar = document.querySelectorAll(".producto-carrito-eliminar");
const btnVaciarCarrito = document.getElementById("funciones-carrito-vaciar");
const totalCarrito = document.getElementById("totalCarrito");
const btnComprarCarrito = document.getElementById("funciones-carrito-comprar");

function subirProductosAlCarrito() {

    if (productosCarrito && productosCarrito.length > 0) {

        carritoVacio.classList.add("disabled")
        compraRealizada.classList.add("disabled")
        contenedorProductos.classList.remove("disabled");
        contenedorFunciones.classList.remove("disabled");
    
        contenedorProductos.innerHTML = "";

        productosCarrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("productoCarrito")
            div.innerHTML = `
                <img class="producto-carrito-img" src="${producto.img}" alt="${producto.nombre}">  
                <div class="producto-carrito-nombre">
                    <p> Nombre </p>
                    <h3> ${producto.nombre}</h3>
                </div>      
                <div class="producto-carrito-cantidad">
                    <p> Cantidad </p>
                    <p>${producto.cantidad}</p>
                </div>           
                <div class="producto-carrito-precio">
                    <p>Precio</p>
                    <p>$${producto.precio}</p>
                </div>          
                <div class="producto-carrito-subtotal">
                    <p>Subtotal</p>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="producto-carrito-eliminar boton" id="${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg>
                </button>
    
            `;
            contenedorProductos.appendChild(div);
        });

        actualizarBotonesEliminar();
        actualizarTotal()
    
    } else {
        carritoVacio.classList.remove("disabled")
        compraRealizada.classList.add("disabled")
        contenedorProductos.classList.add("disabled");
        contenedorFunciones.classList.add("disabled");
    }
}

subirProductosAlCarrito()

function actualizarBotonesEliminar() {
    productoCarritoEliminar = document.querySelectorAll(".producto-carrito-eliminar");

    productoCarritoEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === parseInt(idBoton));

    if (index !== -1) {
        // Para reducir la cantidad del producto si la cantidad es mayor a 1
        if (productosCarrito[index].cantidad > 1) {
            productosCarrito[index].cantidad--;
            Toastify({
                text: "Producto Eliminado",
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
        } else {
        // Si la cantidad es 1 o menos, elimina el producto del carrito
            productosCarrito.splice(index, 1);
        }

        subirProductosAlCarrito()
        localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
    }
}

btnVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: "Zona de peligro",
        text: `Se borraran ${productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Estoy seguro"
      }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito.length = 0;
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
            subirProductosAlCarrito();
          Swal.fire({
            title: "Eliminado",
            text: "Carrito eliminado exitosamene",
            icon: "success"
          });
        }
      });
}

function actualizarTotal() {
    const total = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarrito.innerText = `$${total}`;
}

btnComprarCarrito.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Gracias por tu compra!",
        showConfirmButton: false,
        timer: 1500
    });

    productosCarrito.length = 0;
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
    subirProductosAlCarrito();
}


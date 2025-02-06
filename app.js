// Seleccionar elementos del DOM
const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');
const inputItem = document.getElementById('item');

// Función para añadir un item a la lista
formulario.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar que el formulario se envíe

  const textoItem = inputItem.value.trim(); // Obtener el valor del input

  if (textoItem !== "") {
    // Crear un nuevo elemento de lista
    const nuevoItem = document.createElement('li');

    // Botón para marcar como comprado
    const botonCompletado = document.createElement('button');
    botonCompletado.textContent = 'Comprado';
    botonCompletado.classList.add('boton-completado');
    botonCompletado.addEventListener('click', function () {
      nuevoItem.classList.toggle('completado');
      if (nuevoItem.classList.contains('completado')) {
        botonCompletado.textContent = 'Desmarcar';
        botonCompletado.classList.add('completado');
      } else {
        botonCompletado.textContent = 'Comprado';
        botonCompletado.classList.remove('completado');
      }
    });

    // Texto del producto
    const textoProducto = document.createElement('span');
    textoProducto.textContent = textoItem;

    // Botón para eliminar el item
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function () {
      lista.removeChild(nuevoItem);
    });

    // Añadir elementos al item
    nuevoItem.appendChild(botonCompletado);
    nuevoItem.appendChild(textoProducto);
    nuevoItem.appendChild(botonEliminar);

    // Añadir el item a la lista
    lista.appendChild(nuevoItem);

    // Limpiar el input
    inputItem.value = '';
  }
});
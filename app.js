// Seleccionar elementos del DOM
const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');
const inputItem = document.getElementById('item');

// Cargar la lista desde localStorage al iniciar la página
cargarLista();

// Función para cargar la lista desde localStorage
function cargarLista() {
  const listaGuardada = JSON.parse(localStorage.getItem('listaCompras')) || [];
  listaGuardada.forEach(item => {
    añadirItemALista(item.texto, item.completado);
  });
}

// Función para guardar la lista en localStorage
function guardarLista() {
  const items = [];
  document.querySelectorAll('#lista li').forEach(li => {
    items.push({
      texto: li.querySelector('span').textContent,
      completado: li.classList.contains('completado')
    });
  });
  localStorage.setItem('listaCompras', JSON.stringify(items));
}

// Función para añadir un item a la lista
function añadirItemALista(textoItem, completado = false) {
  const nuevoItem = document.createElement('li');
  if (completado) nuevoItem.classList.add('completado');

  // Botón para marcar como comprado
  const botonCompletado = document.createElement('button');
  botonCompletado.textContent = completado ? 'Desmarcar' : 'Marcar';
  botonCompletado.classList.add('boton-completado');
  if (completado) botonCompletado.classList.add('completado');
  botonCompletado.addEventListener('click', function () {
    nuevoItem.classList.toggle('completado');
    botonCompletado.textContent = nuevoItem.classList.contains('completado') ? 'Desmarcar' : 'Marcar';
    botonCompletado.classList.toggle('completado');
    guardarLista(); // Guardar la lista después de marcar/desmarcar
  });

  // Texto del producto
  const textoProducto = document.createElement('span');
  textoProducto.textContent = textoItem;

  // Botón para eliminar el item
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.addEventListener('click', function () {
    lista.removeChild(nuevoItem);
    guardarLista(); // Guardar la lista después de eliminar
  });

  // Añadir elementos al item
  nuevoItem.appendChild(botonCompletado);
  nuevoItem.appendChild(textoProducto);
  nuevoItem.appendChild(botonEliminar);

  // Añadir el item a la lista
  lista.appendChild(nuevoItem);
}

// Función para añadir un item desde el formulario
formulario.addEventListener('submit', function (e) {
  e.preventDefault(); // Evitar que el formulario se envíe

  const textoItem = inputItem.value.trim(); // Obtener el nombre del producto

  if (textoItem !== "") {
    añadirItemALista(textoItem);
    guardarLista(); // Guardar la lista después de añadir
    inputItem.value = '';
  }
});
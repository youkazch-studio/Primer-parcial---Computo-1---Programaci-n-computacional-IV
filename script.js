function toggleMenu() {
    var menu = document.getElementById("headerMenu");
    menu.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function() {
    var toggleButton = document.getElementById("menuToggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", toggleMenu);
    }
});

window.addEventListener("resize", function() {
    var menu = document.getElementById("headerMenu");
    var toggleButton = document.getElementById("menuToggle");
    var headerInfo = document.getElementById("headerInfo");
    var logo = document.querySelector(".header-logo");
    
    if (window.innerWidth > 768) {
        menu.classList.add("show");
        toggleButton.style.display = "none";
        headerInfo.style.display = "block";
        logo.style.width = "270px"; // Tamaño grande para pantalla completa
    } else {
        menu.classList.remove("show");
        toggleButton.style.display = "block";
        headerInfo.style.display = "none";
        logo.style.width = "160px"; // Tamaño reducido para pantallas pequeñas
    }

});

window.dispatchEvent(new Event("resize"));


/*logica para la creacion de los custom element y con sus eventos*/

class SeccionElement extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      // Recuperamos los atributos del custom element
      const titulo = this.getAttribute('titulo');
      const contenido = this.getAttribute('contenido');
      const imagen = this.getAttribute('imagen');
      const btnText = this.getAttribute('btnText');
      const tipoEvento = this.getAttribute('tipoEvento');
  
      // Estructura HTML interna del custom element
      this.shadowRoot.innerHTML = `
        <style>
          /* Estilos para el custom element para poder crear el contenido de la pagina */
          seccion-element {
            display: flex;
            border: 1px solid #ddd;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            width: 100%; /* Para hacerlo 100% en pantallas pequeñas */
            max-width: 600px; /* Maximo ancho para pantallas grandes */
            box-sizing: border-box; /* Para asegurarse de que padding no afecte el tamaño */
            }
  
          /* Títulos y párrafos */
          .seccion h2 {
            margin: 0 0 10px;
            font-size: 1.5rem;
          }
  
          .seccion p {
            font-size: 1rem;
            margin-bottom: 15px;
          }
  
          /* Imagen de la sección */
          .seccion img {
            width: 100%;
            height: auto;
            margin-bottom: 15px;
            border-radius: 4px;
          }
  
          /* Estilo del botón */
          .seccion button {
            background-color: #3328c6;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
          }
  
          .seccion button:hover {
            background-color: #45a049;
          }
  
          /* Media queries para pantallas más grandes */
          @media (min-width: 768px) {
            .seccion {
              width: 48%; /* Dos elementos por fila en pantallas medianas */
            }
          }
  
          @media (min-width: 1024px) {
            .seccion {
              width: 30%; /* Tres elementos por fila en pantallas grandes */
            }
          }
  
          /* Media queries para pantallas pequeñas (móviles) */
          @media (max-width: 480px) {
            .seccion {
              width: 100%; /* Ocupa todo el ancho de la pantalla en móviles */
              margin-bottom: 20px; /* Añadimos un margen para separación entre secciones */
            }
  
            .seccion h2 {
              font-size: 1.25rem; /* Reducir tamaño del título */
            }
  
            .seccion p {
              font-size: 0.9rem; /* Reducir tamaño del texto */
            }
  
            .seccion button {
              padding: 8px 16px; /* Reducir el tamaño del botón */
            }
        </style>
  
        <div class="seccion">
          <h2>${titulo}</h2>
          <p>${contenido}</p>
          <img src="${imagen}" alt="Imagen de la sección">
          <button id="btn">${btnText}</button>
        </div>
      `;
  
      // Añadir el evento al botón
      const button = this.shadowRoot.querySelector('#btn');
      if (tipoEvento === 'mas') {
        button.addEventListener('click', this.mostrarMas.bind(this));
      } else if (tipoEvento === 'cambiar') {
        button.addEventListener('click', this.cambiarContenido.bind(this));
      }
    }
  
    // Método para mostrar más información
    mostrarMas() {
      alert('Mostrando más información...');
    }
  
    // Método para cambiar el contenido
    cambiarContenido() {
      alert('Contenido cambiado...');
    }
  }
  
  // Definimos el custom element
  customElements.define('seccion-element', SeccionElement);
  
  
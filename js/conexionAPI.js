"use strict";
const direccion = document.querySelector(".direccion");
const latitud = document.querySelector(".lat");
const longitud = document.querySelector(".lng");
const buscar = document.querySelector(".btn");
const tbody = document.querySelector("tbody");

const geolocation = navigator.geolocation;
const posicion = (pos) => {
  console.log(pos.coords)
  latitud.value = pos.coords.latitude;
  longitud.value = pos.coords.longitude;
 
};
geolocation.getCurrentPosition(posicion);

if (buscar) {
  document.addEventListener("DOMContentLoaded", () => {
    buscar.addEventListener("click", () => {
      let url = "https://servicios.usig.buenosaires.gob.ar/normalizar/?";

      if (direccion.value) {
        url += `direccion=${direccion.value}`;
      } else if (latitud.value && longitud.value) {
        url += `lat=${latitud.value}&lng=${longitud.value}`;
      } else {
        alert("Por favor, ingresa una dirección o coordenadas.");
        return;
      }

      axios
        .get(url)
        .then(function (response) {
          const data = response.data;
          tbody.innerHTML = "";
          const agregarFila = (direccion) => {
            const row = document.createElement("tr");

            const direccionText = document.createElement("td");
            direccionText.textContent = direccion.direccion || "No encontrado";
            row.appendChild(direccionText);

            const altura = document.createElement("td");
            altura.textContent = direccion.altura || "No encontrado";
            row.appendChild(altura);

            const coordenadas = document.createElement("td");
            if (direccion.coordenadas) {
              coordenadas.textContent = `${direccion.coordenadas.y}, ${direccion.coordenadas.x}`;
            } else {
              coordenadas.textContent = "No encontrado";
            }
            row.appendChild(coordenadas);
            tbody.appendChild(row);
          };

          if (data.direccionesNormalizadas) {
            data.direccionesNormalizadas.forEach((direccion) => agregarFila(direccion));
          } else {
            agregarFila(data);
          }
        })
        .catch(function (error) {
          alert("Error!!!");
        });
    });
  });
}

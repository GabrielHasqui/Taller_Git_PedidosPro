# PedidoPro

Sistema web de gestion de pedidos creado con HTML, CSS y JavaScript para la practica de Git y GitHub.

## Estructura

```text
PedidoPro/
|-- index.html
|-- css/
|   `-- estilos.css
|-- js/
|   |-- app.js
|   `-- data.js
|-- assets/
|-- README.md
`-- .gitignore
```

## Ejecucion

La aplicacion es estatica. Puede abrirse directamente con `index.html` o ejecutarse con un servidor local:

```bash
python -m http.server 5500
```

Luego visita `http://localhost:5500`.

## Funcionalidades

- Panel de resumen con metricas y actividad reciente.
- Listado de pedidos con busqueda, filtro y cambio de estado.
- Creacion de pedidos desde un modal.
- Catalogo de productos y cartera de clientes.
- Seccion documentada con los cinco casos de la practica Git.
- Persistencia de pedidos nuevos en `localStorage`.

## Flujo Git de la practica

Las ramas de trabajo previstas son `dev-gabriel`, `dev-josue` y `dev-diana`. El objetivo es evidenciar `git revert`, `git restore`, resolucion de `git merge` y la etiqueta `v1.0.0`.

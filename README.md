# PedidoPro

> **Panel operativo para gestionar pedidos, clientes e inventario.**

Aplicacion web estatica creada con **HTML, CSS y JavaScript**. PedidoPro ofrece una vista clara de la operacion diaria para consultar pedidos, controlar estados, revisar productos y mantener a mano la cartera de clientes.

<p align="center">
	<a href="https://github.com/GabrielHasqui/Taller_Git_PedidosPro">Repositorio en GitHub</a>
	&nbsp;&nbsp;·&nbsp;&nbsp;
	<a href="#ejecucion">Como ejecutarlo</a>
</p>

## Vista general

| Area          | Incluye                                                                   |
| ------------- | ------------------------------------------------------------------------- |
| **Resumen**   | Metricas, actividad reciente, distribucion de pedidos y acciones rapidas  |
| **Pedidos**   | Busqueda, filtro por estado, listado detallado y actualizacion de estados |
| **Productos** | Catalogo visual con precios, descripcion y stock disponible               |
| **Clientes**  | Cartera de clientes, correo, pedidos realizados y gasto acumulado         |

## Funcionalidades principales

- Dashboard con indicadores de pedidos activos, ingresos, clientes y entregas.
- Creacion de pedidos desde un formulario modal.
- Cambio de estado de un pedido con un solo clic: preparacion, camino y entregado.
- Busqueda por numero de pedido o nombre del cliente.
- Filtro de pedidos por estado.
- Persistencia de los nuevos pedidos mediante `localStorage`.
- Interfaz responsive para escritorio, tablet y movil.
- Navegacion lateral con vistas independientes y estados visuales claros.

## Ejecucion

No requiere instalacion de dependencias. Puedes abrir `index.html` directamente o iniciar un servidor local:

```bash
python -m http.server 5500
```

Abre [http://localhost:5500](http://localhost:5500) en el navegador.

## Estructura del proyecto

```text
PedidoPro/
|-- index.html          # Estructura de la aplicacion
|-- css/
|   `-- estilos.css     # Estilos, layout y responsive design
|-- js/
|   |-- app.js          # Navegacion, eventos y renderizado
|   `-- data.js         # Datos iniciales de la aplicacion
|-- assets/             # Recursos estaticos
|-- README.md
`-- .gitignore
```

## Flujo de trabajo

1. Abre **Resumen** para revisar el estado general.
2. Entra a **Pedidos** para buscar o filtrar registros.
3. Crea un pedido con **Nuevo pedido** y selecciona cliente, producto y fecha.
4. Pulsa el menu de cada pedido para avanzar su estado.
5. Consulta **Productos** y **Clientes** para revisar la informacion operativa.

## Tecnologias

`HTML5` · `CSS3` · `JavaScript` · `LocalStorage`

## Git

El proyecto esta preparado para trabajar con ramas y commits independientes:

```bash
git clone https://github.com/GabrielHasqui/Taller_Git_PedidosPro.git
cd Taller_Git_PedidosPro
git checkout main
```

## Equipo

- Gabriel Leonardo Hasqui Ortega
- Josue Fernando Guadalupe Cobos
- Diana Nicole Avila Villao

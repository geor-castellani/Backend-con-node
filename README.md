# NodePop app: práctica web-API/Node.js/MongoDB

Desarrollar una API que se ejecutará en el servidor de un servicio de venta de artículos de
segunda mano llamado "Nodepop". 

El servicio mantiene anuncios de compra o venta de artículos y permite buscar como poner
filtros por varios criterios, por tanto la API a desarrollar deberá proveer los métodos
necesarios para esto.

Cada anuncio tiene los siguientes datos:
1. Nombre del artículo, un anuncio siempre tendrá un solo artículo
2. Si el artículo se vende o se busca
3. Precio. Será el precio del artículo en caso de ser una oferta de venta. En caso de que
sea un anuncio de ‘se busca’ será el precio que el solicitante estaría dispuesto a pagar
4. Foto del artículo. Cada anuncio tendrá solo una foto.
5. Tags del anuncio. Podrá contener uno o varios de estos cuatro: work, lifestyle, motor
y mobile

Operaciones que debe realizar la API a crear:
- Lista de anuncios con posibilidad de paginación. Con filtros por tag, tipo de anuncio
(venta o búsqueda), rango de precio (precio min. y precio max.) y nombre de artículo
(que empiece por el dato buscado)
- Lista de tags existentes
- Creación de anuncio (opcional)

Los sistemas donde se desplegará la API utilizan bases de datos MongoDB.

Se solicita que el entregable venga acompañado de una mínima documentación y el código
de la API esté bien formateado para facilitar su mantenimiento. En esta fase, ya que se desea
probar si el modelo de negocio va a funcionar, no serán necesarios ni tests unitarios ni de
integración.

------------------------------------------------------------------------------------------

## Para su ejecución: 

```sh
npm install 
``` 

## Para cargar los datos iniciales en la base de datos:

```sh
npm run init-db
``` 

## Para iniciar la aplicación en producción:

```sh
npm start
``` 

## Para iniciar la aplicación en desarrollo:

```sh
npm run dev
``` 

## Documentación API

Lista de anuncios 

GET /api/advertisements

```javascript
{
    "ads": [
        {
            "name": "Classic bicycle",
            "forSale": true,
            "price": 230.50,
            "image": "bicycle.jpg",
            "tags": [ "lifestyle", "motor"]
        },
        {
            "name": "iPhone 14",
            "forSale": false,
            "price": 850.00,
            "image": "iphone14.jpg",
            "tags": [ "lifestyle", "mobile"]
        },
        {
            "name": "Gaming chair",
            "forSale": true,
            "price": 110.00,
            "image": "gaming-chair.jpg",
            "tags": [ "lifestyle", "work"]
        }
    ]
}
```

## Ejemplos de búsqueda: 

- Obtener anuncios por nombre: http://localhost:3000/api/advertisements?name=gaming

- Obtener anuncios por tipo: http://localhost:3000/api/advertisements?forSale=true

- Obtener anuncios por precio: http://localhost:3000/api/advertisements?price=230.5    

- Obtener anuncios por etiqueta: http://localhost:3000/api/advertisements?tags=motor

- Paginación: http://localhost:3000/api/advertisements?skip=2&limit=1

- Selección de campo: http://localhost:3000/api/advertisements?fields=name

- Ordenar ejemplos: http://localhost:3000/api/advertisements?sort=price

- Obtener todas las etiquetas existentes: http://localhost:3000/api/advertisements/tags

- Crear nuevo anuncio: http://localhost:3000/api/advertisements (body=adData)

- Obtener imágenes: http://localhost:3000/images/gaming-chair.jpg
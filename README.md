# CarManager - Aplicación de Gestión de Vehículos

Aplicación web completa para administrar vehículos (carros) desarrollada con **Spring Boot** (backend), **React + TypeScript** (frontend), **H2** (base de datos) y **Spring Data JPA**. 

## Tecnologías Utilizadas

### Backend
- **Java 8** (compatible con Spring Boot 2.7.x)
- **Spring Boot 2.7.18**
- **Spring Web MVC** - API REST
- **Spring Data JPA** - Persistencia de datos
- **H2 Database** - Base de datos en memoria
- **Lombok** - Reducción de código repetitivo
- **Spring Boot DevTools** - Desarrollo ágil
- **Spring Validation** - Validaciones

### Frontend
- **React 18** con **TypeScript**
- **Vite** - Bundler
- **Axios** - Consumo de API REST
- **CSS3** - Diseño responsive moderno
- **PWA** - Soporte Progressive Web App

## Estructura del Proyecto

```
CarManager/
├── server/                # Backend Spring Boot
│   ├── src/main/java/com/example/cars/
│   │   ├── CarsApplication.java
│   │   ├── Car.java
│   │   ├── CarRepository.java
│   │   └── CarController.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql
│   └── pom.xml
└── client/                # Frontend React + TypeScript
    ├── public/
    │   ├── manifest.json
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── CarCard.tsx
    │   │   ├── CarForm.tsx
    │   │   ├── CarList.tsx
    │   │   └── GiphyImage.tsx
    │   ├── services/
    │   │   └── CarService.ts
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.tsx
    │   └── main.tsx (o index.tsx)
    ├── .env
    ├── .env.example
    ├── package.json
    └── index.html
```

## Requisitos para Ejecutar

- **Java JDK 8** (recomendado para evitar incompatibilidades)
- **Node.js** v18+ o v20+ (v24.20.0 probado)
- **Maven** (si no está instalado, usar wrapper si disponible)
- **NPM** v8+

## Cambios Realizados vs. PDF Original

**Nota sobre compatibilidad:** El PDF original usa Spring Boot 2.1.x con Java 8 y anotaciones `javax.*`. En este ambiente tenemos JDK 8 pero para garantizar compatibilidad máxima se usa **Spring Boot 2.7.18** (última versión 2.7) con Java 8, manteniendo imports `javax.*` y toda la lógica funcional. Esto respeta los conceptos originales mientras evita problemas de compilación.

## Instrucciones para Ejecutar

### 1. Ejecutar Backend (Spring Boot)

Desde la carpeta `CarManager/server`:

```bash
# Con Maven instalado
mvn clean install
mvn spring-boot:run

# O si usas mvnw
./mvnw clean install
./mvnw spring-boot:run
```

El backend se ejecutará en: **http://localhost:8080**

Endpoints disponibles:
- GET http://localhost:8080/cars - Listar todos
- GET http://localhost:8080/cars/{id} - Obtener por ID
- POST http://localhost:8080/cars - Crear
- PUT http://localhost:8080/cars/{id} - Actualizar
- DELETE http://localhost:8080/cars/{id} - Eliminar
- GET http://localhost:8080/cars/cool-cars - Destacados
- H2 Console: http://localhost:8080/h2-console (JDBC: jdbc:h2:mem:testdb, user: sa, sin password)

### 2. Ejecutar Frontend (React + Vite)

Desde la carpeta `CarManager/client`:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El frontend se ejecutará en: **http://localhost:5173** (puerto por defecto de Vite)

Para configurar Giphy (opcional): editar `.env` y colocar `VITE_GIPHY_API_KEY=tu_api_key`. Si no se configura, la app funciona normalmente con imagen alternativa.

## Guía para Probar con Postman

| Método | URL | Descripción | Ejemplo Body |
|---|---|---|---|
| GET | http://localhost:8080/cars | Listar todos | - |
| GET | http://localhost:8080/cars/1 | Obtener por ID | - |
| POST | http://localhost:8080/cars | Crear nuevo | `{"name":"Mazda","model":"3","year":2023,"color":"Gris","price":32000000,"description":"Compacto","imageUrl":""}` |
| PUT | http://localhost:8080/cars/1 | Actualizar | `{"name":"Toyota","model":"Corolla","year":2021,"color":"Blanco","price":26000000,"description":"Actualizado","imageUrl":""}` |
| DELETE | http://localhost:8080/cars/1 | Eliminar | - |
| GET | http://localhost:8080/cars/cool-cars | Destacados | - |

## Funcionalidades Implementadas

- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ POST y PUT implementados y consumidos desde React
- ✅ Más atributos: modelo, color, precio, descripción, imagen
- ✅ Vista completa con tarjetas, formularios, buscador, filtros
- ✅ Estadísticas (total y destacados)
- ✅ Validaciones en formulario y backend
- ✅ Confirmación al eliminar
- ✅ Estados de carga, errores y mensajes
- ✅ Diseño responsive tipo concesionario
- ✅ Colores negro, blanco y azul
- ✅ CORS configurado
- ✅ Datos iniciales con data.sql
- ✅ Integración Giphy con fallback
- ✅ Variables de entorno para API key
- ✅ Logos de marca por vehículo (editables) con badge automático

## Lista de Comprobación

- [x] Backend Spring Boot funcional
- [x] Entidad Car con todos los atributos
- [x] Repositorio JPA
- [x] Controlador con GET/POST/PUT/DELETE/cool-cars
- [x] CORS habilitado
- [x] H2 configurado con consola
- [x] Datos de prueba cargados
- [x] Frontend React + TS completo
- [x] Componentes: App, CarList, CarForm, CarCard, GiphyImage
- [x] Servicio CarService con todas las operaciones
- [x] POST y PUT funcionando
- [x] Filtros y búsqueda
- [x] Validaciones
- [x] Responsive
- [x] Comunicación frontend-backend verificada
- [x] CRUD completo operativo
- [x] Código comentado para estudiante

## Explicación Sencilla para Presentación

**¿Cómo funciona?** El backend expone una API REST con Spring Boot que guarda datos en H2. El frontend React consume esa API con Axios/Fetch. Cuando se guarda un vehículo (POST) o edita (PUT), React envía JSON al backend que lo persiste. GET trae los datos y DELETE elimina. El componente Giphy muestra GIFs según marca (opcional). Todo se actualiza sin recargar página.

## Notas

- Si Maven no está en PATH, puede usar `mvnw.cmd` en Windows (generarlo si necesario)
- El puerto 8080 debe estar libre para backend
- El puerto 5173 libre para frontend
- Los datos se reinician al detener el backend (H2 en memoria)

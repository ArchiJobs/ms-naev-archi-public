# ms-naev-jobs-public

Microservicio para gestión y consulta de ofertas de trabajo especializado en arquitectura y construcción, con comunicación gRPC.

## Características
- Búsqueda avanzada de trabajos con filtros y paginación
- Consulta de detalles de una oferta
- Listado de categorías, ubicaciones y empresas
- Comunicación gRPC con definición en `proto/jobs.proto`
- Manejo de errores centralizado
- DTOs para entrada y salida de datos

## Requisitos
- Node.js >= 18
- NestJS >= 9
- PostgreSQL
- Postman (para pruebas gRPC)

## Instalación
```bash
npm install
```

## Variables de entorno
Configura el archivo `.env`:
```
GRPC_URL=localhost:9091
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin123
DB_NAME=your_database
```

## Ejecución
```bash
npm run start:dev
```
El microservicio escuchará en el puerto gRPC definido por `GRPC_URL`.

## Estructura principal
- `src/jobs/entities/`: Entidades TypeORM
- `src/jobs/dto/`: DTOs para entrada/salida
- `src/jobs/repositories/`: Repositories personalizados
- `src/jobs/utils/`: Utilidades y manejo de errores
- `src/proto/jobs.proto`: Definición gRPC

## Endpoints gRPC
- `SearchJobs`: Búsqueda avanzada de trabajos
- `GetJobDetail`: Detalle de una oferta
- `GetCategories`: Listado de categorías
- `GetLocations`: Listado de ubicaciones
- `GetCompanies`: Listado de empresas

## Pruebas con Postman
Importa el archivo `JobsService-gRPC.postman_collection.json` en Postman y carga el archivo `src/proto/jobs.proto` para probar los endpoints gRPC.

## Ejemplo de request gRPC (SearchJobs)
```json
{
  "query": "arquitecto",
  "location": "1",
  "category": "2",
  "salaryRange": "1500000-2500000",
  "limit": 5,
  "offset": 0,
  "page": 1
}
```

## Notas
- El microservicio está preparado para integrarse con un gateway HTTP que consuma los endpoints gRPC.
- Puedes cambiar el puerto gRPC en `.env` según tu arquitectura.
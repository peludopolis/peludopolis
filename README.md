# 🐾 Ecommerce de Mascotas

¡Bienvenido al proyecto de Ecommerce de Mascotas! 🐶🐱 Un sitio web diseñado para conectar a los amantes de las mascotas con los productos y servicios que necesitan para cuidar a sus compañeros peludos. 

## 🌟 Características principales

- 📍 **Geolocalización de la tienda física**: Encuentra la sucursal más cercana a ti.
- 💬 **Chatbox sin IA**: Interactúa con soporte en tiempo real.
- 👥 **Roles de usuario**: Administración de cuentas de usuario y administrador.
- 🔒 **Autenticación**: Inicio de sesión propio y con Google.
- 🔔 **Notificaciones**: Mantente informado sobre tus pedidos y promociones.
- 🛒 **Plataforma de pagos**: Compra productos de forma segura.
- 📂 **Almacenamiento de archivos**: Gestión de imágenes y documentos relevantes.
- 📊 **Dashboard para administradores**: Control de productos, usuarios y estadísticas.

## 🛠️ Tecnologías utilizadas

### Frontend
- **Framework**: [React](https://reactjs.org/) y [Next.js](https://nextjs.org/)
- **Estilos**: Tailwind CSS
- **Estado**: Context API
- **Geolocalización**: Librerías como Leaflet o similares.

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT y Google OAuth
- **Documentación**: OpenAPI/Swagger

## 🚀 Instalación y configuración

### Requisitos previos
- Node.js v16+ y npm v7+ instalados.
- PostgreSQL configurado.

### Pasos para la instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ecommerce-mascotas.git
   cd ecommerce-mascotas
### Instala las dependencias en el Frontend
cd frontend
npm install
### Instala las dependencias del backend:
cd backend
npm install
### Crea un archivo .env en el directorio backend y llena las siguientes variables:
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce_mascotas
JWT_SECRET=tu_secreto
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret

### Inicia el servidor:

En el backend:
npm run start:dev

En el frontend:
npm run dev

## Abre la aplicación en tu navegador en http://localhost:3000.

### 📝 Documentación
La API está documentada con Swagger. Una vez iniciado el backend, accede a la documentación en: http://localhost:3001/api-docs.

### 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar el proyecto o encuentras un problema, abre un issue o envía un pull request.

¡Gracias por apoyar este proyecto! Si te gusta, considera darle una estrella ⭐ en GitHub.

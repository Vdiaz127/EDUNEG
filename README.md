# EDUNEG - Plataforma de Gestión Educativa

## Descripción del Proyecto

EDUNEG es una plataforma integral de gestión educativa diseñada para simplificar y optimizar los procesos académicos. Permite a administradores, profesores y estudiantes gestionar información académica de manera eficiente y colaborativa.

## Características Principales

- **Autenticación de Usuarios**: 
  - Sistema de registro seguro
  - Inicio de sesión con roles diferenciados
  - Gestión de sesiones con JWT
  
- **Dashboards Personalizados**: 
  - **Administrador**: 
    - Gestión de usuarios
    - Control de materias
    - Reportes y estadísticas
  - **Profesor**: 
    - Gestión de cursos
    - Control de calificaciones
    - Manejo de horarios
  - **Estudiante**: 
    - Consulta de materias
    - Visualización de calificaciones
    - Horario personal

## Tecnologías Utilizadas

### Frontend
- React.js con Vite
- React Router para navegación
- Tailwind CSS para estilos
- Axios para peticiones HTTP
- Heroicons para iconografía

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Bcrypt para encriptación
- CORS para seguridad

## Requisitos Previos

- Node.js (v16 o superior)
- npm (v8 o superior)
- MongoDB
- Git

## Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/eduneg.git
cd eduneg
```

### 2. Instalar Dependencias
```bash
# Instalar dependencias del proyecto principal
npm install

# Instalar dependencias del frontend
cd Frontend
npm install
```

### 3. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto:
```
MONGO_URL=tu_url_de_mongodb
JWT_SECRET=tu_secreto_jwt
PORT=5000
```

## Comandos Disponibles

### Desarrollo
```bash
# Iniciar backend y frontend simultáneamente
npm run dev

# Iniciar solo backend
npm run server

# Iniciar solo frontend
npm run client
```

### Producción
```bash
# Construir proyecto
npm run build
```

## Estructura del Proyecto

```
EDUNEG/
│
├── Backend/
│   ├── config/
│   │   └── db.js           # Configuración de MongoDB
│   ├── controllers/
│   │   └── auth.controller.js  # Lógica de autenticación
│   ├── models/
│   │   └── usuario.model.js    # Modelo de usuarios
│   ├── routes/
│   │   ├── auth.routes.js      # Rutas de autenticación
│   │   └── materia.route.js    # Rutas de materias
│   └── app.js             # Punto de entrada del backend
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/    # Componentes reutilizables
│       ├── pages/        # Páginas principales
│       │   ├── admin/    # Vistas de administrador
│       │   ├── profesor/ # Vistas de profesor
│       │   └── estudiante/# Vistas de estudiante
│       └── App.jsx       # Componente principal
│
├── .env                  # Variables de entorno
├── package.json          # Dependencias y scripts
└── README.md            # Este archivo
```

## Seguridad

- **Autenticación**:
  - Tokens JWT para manejo de sesiones
  - Contraseñas hasheadas con bcrypt
  - Rutas protegidas por roles
  
- **Validaciones**:
  - Sanitización de entradas
  - Validación de formularios
  - Protección contra inyección

## Estado del Proyecto

- Autenticación básica
- Dashboards por rol
- Gestión de materias
- Gestión de calificaciones (En desarrollo)
- Sistema de notificaciones (Pendiente)
- Reportes y estadísticas (Pendiente)

## Contribución

1. Fork del proyecto
2. Crear rama de características (`git checkout -b feature/NuevaCaracteristica`)
3. Commit de cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir Pull Request

## Guías de Desarrollo

### Convenciones de Código
- Usar ES6+ features
- Nombres de variables y funciones en camelCase
- Componentes React en PascalCase
- Comentarios descriptivos en funciones principales

### Flujo de Trabajo Git
1. Mantener `main` estable
2. Desarrollar en ramas feature/
3. Revisión de código antes de merge
4. Seguir convenciones de commits

## Reporte de Bugs

Si encuentras un bug, por favor abre un issue con:
1. Descripción del problema
2. Pasos para reproducir
3. Comportamiento esperado
4. Screenshots (si aplica)

## Contacto

- **Equipo de Desarrollo**: 
- **Email**: 
- **LinkedIn**: 

## Licencia

Este proyecto está bajo la Licencia MIT 

---

**Nota**: Este proyecto está en desarrollo activo. Las características y la documentación pueden cambiar.

# EDUNEG
# Proyecto eduneg

## Información del Proyecto
- **Nombre del Proyecto**: eduneg
- **Versión**: 1.0.0
- **Tipo**: Módulo

## Dependencias
- **express**: Framework web para Node.js.
- **mongoose**: ODM para MongoDB.
- **dotenv**: Carga variables de entorno desde un archivo `.env`.
- **nodemon**: Herramienta que reinicia automáticamente la aplicación cuando se detectan cambios en el código.

## Scripts
- **dev**: Inicia el servidor de Express y el frontend con Vite.
- **build**: Instala las dependencias y construye el frontend.

## Instrucciones para Ejecutar el Proyecto
1. **Instalación de Dependencias**:
   ```bash
   npm install
   ```

2. **Construir el Proyecto**:
   ```bash
   npm run build
   ```
   *Nota importante: los cambios en el **frontend** no seran notados si no se ejecuta `npm run build`. previamente*
    <br>

3. **Ejecutar el Proyecto en Modo Desarrollo**:
   ```bash
   npm run dev
   ```
  
Para trabajar en el frontend , muevete a la carpeta `Frontend` (`terminal> cd Frontend`) y ejecuta `npm install` y `npm run dev`, se ejecutara en http://localhost:5173/ y los cambios seran inmediatos al modificar el codigo, pero sin las funcionalidades que retorna el backend. 




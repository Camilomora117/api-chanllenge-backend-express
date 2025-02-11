# ✨ api-chanllenge-backend-express

Autor: Yesid Camilo Mora Barbosa

Email: Yesidmoraa17@outlook.com

##### 🚀 Proyecto Node.js + Express

Este es un proyecto basado en **Node.js y Express**, que utiliza **OpenAPI** para validar solicitudes y **Multer** para la subida de archivos.
Usa la version 18 de node.


#### 📝 API Documentation

A continuacion se mostrara la documentacion de la API

👉 [View OpenAPI Documentation](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/Camilomora117/api-chanllenge-backend-express/main/src/utils/files/oas_api.json)


#### 📦 Instalación

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/Camilomora117/api-chanllenge-backend-express.git
   ```
2. **Instale dependencias**
   ```sh
   npm install
   ```
2. **Ejecucion Proyecto**
   ```sh
   npm run dev
   ```


#### 🔐 Autenticación con JWT (Requerido en todas las solicitudes)

Todas las solicitudes a la API requieren un **token de autenticación** en el encabezado (`Authorization`).  
El token debe ser enviado en el siguiente formato:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYW1pbG8iLCJlbWFpbCI6Illlc2lkbW9yYTExN0BvdXRsb29rLmNvbSIsInJvbGUiOiJkZXYiLCJpYXQiOjE3MzkzMDIyMDUsImV4cCI6MTc0MTg5NDIwNX0.LLeqLlI62_a4HSW-4Kk7MoBKW5Usg5o_jhE1LKWcfw4
```

#### 🛠️ Pruebas con `curl`

A continuación, se presentan ejemplos de cómo probar los **endpoints protegidos** usando `curl`.  
Cada solicitud debe incluir un **token JWT** en el **header `Authorization`**.

### 📂 **1️⃣ Subir un archivo (`POST /upload/:format`)**
Permite subir un archivo a la API en formato **multipart/form-data**.

### 🔹 **Ejemplo de solicitud**
```sh
curl --location 'http://127.0.0.1:5000/upload/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYW1pbG8iLCJlbWFpbCI6Illlc2lkbW9yYTExN0BvdXRsb29rLmNvbSIsInJvbGUiOiJkZXYiLCJpYXQiOjE3MzkzMDIyMDUsImV4cCI6MTc0MTg5NDIwNX0.LLeqLlI62_a4HSW-4Kk7MoBKW5Usg5o_jhE1LKWcfw4' \
--form 'file=@"/ruta/al/archivo.xlsx"'
```

### 📂 **2️⃣ Consultar estado (`GET /status/:idTask`)**
Permite consultar el estado de una tarea

### 🔹 **Ejemplo de solicitud**
```sh
curl --location 'http://127.0.0.1:5000/status/67ab9c47375a0f7f8ad00d55' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjYW1pbG8iLCJlbWFpbCI6Illlc2lkbW9yYTExN0BvdXRsb29rLmNvbSIsInJvbGUiOiJkZXYiLCJpYXQiOjE3MzkzMDIyMDUsImV4cCI6MTc0MTg5NDIwNX0.LLeqLlI62_a4HSW-4Kk7MoBKW5Usg5o_jhE1LKWcfw4'
```

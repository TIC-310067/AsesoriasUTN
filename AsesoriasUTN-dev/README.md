TÍTULO DEL PROYECTO
Sistema de Gestión de Asesorías Académicas

Este proyecto consiste en el desarrollo de una plataforma web que permite gestionar asesorías académicas dentro de una institución educativa. Su objetivo principal es mejorar la organización, comunicación y seguimiento entre asesores y alumnos mediante el uso de tecnologías modernas como React y Firebase.

COMENZANDO 
Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

PRE-REQUISITOS 
Necesitas tener instalado:

 Node.js
 npm (incluido con Node)
 Cuenta en Firebase

ARQUITECTURA GENERAL (3 CAPAS)

        +-----------------------------+
        |   CAPA DE PRESENTACIÓN      |
        |   React (UI, Componentes)   |
        +-------------+---------------+
                      |
                      v
        +-----------------------------+
        |   CAPA DE NEGOCIO           |
        |   Context, Services, Auth   |
        +-------------+---------------+
                      |
                      v
        +-----------------------------+
        |   CAPA DE DATOS             |
        |   Firebase (Auth/Firestore) |
        +-----------------------------+

FLUJO DE AUTENTICACIÓN

Usuario → Login → Firebase Auth | v onAuthStateChanged | v AuthContext |
v App | v Rutas protegidas

DIAGRAMA DE RUTAS

[Usuario NO autenticado] | v Login (/)

[Usuario autenticado] | v /perfil ——> Vista Perfil | v /usuarios —–>
(Solo Admin)

ESTRUCTURA DEL PROYECTO

src/ ├── components/ ├── context/ ├── routes/ ├── services/ ├── views/
├── App.js └── index.js
Ejemplo:
node -v
npm -v

INSTALACIÓN 

 Clonar repositorio:
git clone https://github.com/TIC-310067/AsesoriasUTN/tree/AUT#
cd proyecto

 Instalar dependencias:
npm install

 Configurar variables de entorno (.env):
REACT_APP_API_KEY=xxxx
REACT_APP_AUTH_DOMAIN=xxxx
REACT_APP_PROJECT_ID=xxxx
REACT_APP_STORAGE_BUCKET=xxxx
REACT_APP_MESSAGING_SENDER_ID=xxxx
REACT_APP_APP_ID=xxxx

 Ejecutar el proyecto:
npm start

Demo:
Al iniciar, podrás acceder al login, registrarte e ingresar al sistema.

EJECUTANDO LAS PRUEBAS 
Actualmente las pruebas pueden ejecutarse con:

npm test

Estas verifican el correcto funcionamiento de componentes y lógica.

PRUEBAS END-TO-END 
Verifican el flujo completo del sistema:
 Login
 Navegación
 Acceso a rutas

Ejemplo:
Simular login y acceso a perfil.

PRUEBAS DE ESTILO 
Verifican buenas prácticas de código:
 Estructura
 Sintaxis
 Organización

Ejemplo:
Uso correcto de componentes y hooks.
DESPLIEGUE 
Se puede desplegar en:
 Firebase Hosting
 Vercel

Ejemplo:
npm run build

CONSTRUIDO CON 
 React
 Firebase
 Bootstrap
 React Router

CONTRIBUYENDO 
Puedes contribuir mediante pull requests siguiendo buenas prácticas.

WIKI 
Documentación adicional disponible en el repositorio.


AUTORES 
Jose Manuel Rivas Sierra
Diana Laura Bernal Arias
Anel Elizabeth Moreno Avalos
Juansis Eduardo Hernandez Mayorga
Cesar Andrés Díaz Hernández


LICENCIA 
Proyecto de uso académico.

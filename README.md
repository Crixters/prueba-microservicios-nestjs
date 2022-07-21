# _INTRODUCCIÓN_
Este es un proyecto que consiste en el desarrollo backend basado en microservicios. Se optó por utilizar una arquitectura de microservicios donde las peticiones sean administradas por un API Gateway. A su vez, la comunicación entre la API Gateway y los microservicios se da por medio de un servicio de mensajeria conocido como RabbitMQ, que nos ayuda con el encolamiento de mensajes y optimización. Cada microservicio cuenta con su base de datos independiente para asegurar independencia entre estos. El proyecto cuenta con dockerización para facilitar su ejecución.

## _INSTRUCCIONES PARA EJECUTAR EL PROYECTO_
Para la ejecución del proyecto es necesario saber una serie de anotaciones.
- El proyecto necesita de ciertos puertos disponibles en la máquina que se utilice para la ejecución.

| Servicio | Puerto |
| ------ | ------ |
| Base de datos Microservicio Auth | 5001 |
|Base de datos Microservicio Gestión de Descuentos | 5002 |
| Base de datos Microservicio de Gestión de alquileres | 5003 |
| API-Gateway | 4001 |

- Es necesario tener instalado Docker y mantenerlo en ejecución en el equipo.

Una vez aclaradas las anotaciones, para ejecutar el proyecto debemos usar una terminal para centrarnos en la raíz del proyecto donde se encuentra el archivo `docker-compose.yaml` y ejecutaremos el siguiente comando.

```sh
docker-compose up
```

Lo anterior empezará a descargar las imagenes necesarias y posteriormente levantará cada uno de los servicios, mostrando a su vez todos los logs. 

## _Visualizar la documentación del proyecto_

Para visualizar la documentación del proyecto en Swagger debemos ingresar al siguiente enlace: `http://localhost:4001/api/v1/api-gateway/docs`
En dicha url podremos consumir cada uno de los recursos de la API y ver las entradas y salidas que posee cada uno.

Nota: Si el swagger pide contraseña, las credenciales son las siguientes:
Usuario: microservicios-prueba
Contraseña: yx085q32g2Eu2Cgs

## _RABBITMQ_
Este proyecto se encuentra utilizando una instancia levantada en la nube de rabbitMQ, por lo que los logs de esto no se mostrarán en la terminal local. Sin embargo, es posible ver todas las estadísticas por medio de la página de administración.

Para ver el monitoreo de los servicios en rabbitMQ ingrese a la siguiente página:
`https://www.cloudamqp.com/` y proceda a hacer login con las credenciales proporcionadas por medio del correo donde se envió la resolución de la prueba. (No se comparten dichas credenciales por este README para evitar inconvenientes)

Una vez logeado, seleccione la instancia `prueba-microservicios` que se encuentra en el servidor de AWS US-West-2, y posteriormente, presione click en el botón verde que se encuentra en la parte superior izquierda llamado `RABBITMQ MANAGER`, en esa opción podrá monitorizar el servicio.
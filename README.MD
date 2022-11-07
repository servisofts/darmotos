# Servisofts - Darmotos

![Screenshot 1](./app/public/logo512.png)

## Introducción

Bienvenido al sistema de gestión de ventas de DarMotos

[darmotos.com](https://darmotos.servisofts.com)

El sistema integrado DarMotos cuenta con innumerables opciones para facilitar la gestión de la empresa.

Este sistema es una herramienta indespensable para lograr un manejo eficiente de la información.


### Tecnologías Aplicadas

- Figma, Framer
- HTML5, CSS 3, React-Native
- Java, Python, C#, JavaScript
- MySQL, Postgres, Oracle.
- Git, SVN, JSON.
- Linux server
- Estructura 


### Módulos

- Usuarios
- Roles y permisos
- Sucursales
- Clientes
<!--
- Bancos
- Almacenes
- Productos
- Compra
- Venta
- Cobranza
-->

#### Antes de comenzar.
Con la intención de simplificar el uso del presente documento, es necesario que usted lector, sepa de antemano que cada uno de los procesos que se realizan en el sistema tiene las siguientes opciones comúnes y de esta manera no tener que explicarlas en cada proceso.

#Tareas comúnes:

- Listar.
- Ver como tabla.
- Exportar tabla a excel.
- Regitrar.
- Editar.
- Eliminar.


### Ahora podemos comenzar. 

Para utilizar el sistema es necesario tener una cuenta (Registrada por un adminitrador DM).

Ingresa al sistema con tu usuario y contraseña.

![Login](https://user-images.githubusercontent.com/69025139/200239452-a05105f1-a934-43a4-8d5c-519142a33392.gif)

### Pantalla principal.

Lo primero que verá una vez ingresado al sistema, será una pantalla con diferentes los íconos según sus permisos asignados.

Hasta la última actuaización de este documento la pantalla principal se ve de esta manera (Según cronograma de desarrollo en la etapa correspondiente).

![WhatsApp Image 2022-11-07 at 2 05 38 AM](https://user-images.githubusercontent.com/7370358/200246624-06918a04-bebe-442c-a98c-34d43dd2b01e.jpeg)


## Ajustes
![image](https://user-images.githubusercontent.com/7370358/188761488-7827c45b-e950-4eee-b9be-9d66bd96a49b.png)


### Ingresando a Ajustes encontramos los siguientes íconos.

![image](https://user-images.githubusercontent.com/7370358/188761702-56f9e7ea-7ba0-448f-a3c2-47c52e9ebddb.png)

Datos del rol: Datos del rol es un lugar donde el Administrador de la aplicación podrá registrar los diferentes tipos de datos y documentos para asignar a los diferentes roles de las personas en la app.
(más adelante te explicaremos como manejamos los roles)

Al ingresar a este ícono verás el listado de todos los datos y documentos registrados por los administradores del sistema, como vemos en la siguiente imagen:

![image](https://user-images.githubusercontent.com/7370358/188762084-5631f63d-47b7-49cc-9897-bab0dfb5c665.png)

Dependiendo de nuestro nivel de permisos podremos crear nuevos datos y documentos, editar los actuales, eliminar y ver en forma de tabla para exportar a excel.

![image](https://user-images.githubusercontent.com/7370358/188762235-842949de-1347-4f42-bacf-ef872ccf857f.png)

Los campos necesarios para un Dato o documento son los siguientes:

- Descripcion: Nombre a mostrar del dato o documento.
- Observación: Una explicación breve del dato o documento.
- Tipo: El tipo de dato a solicitar, puede ser un número, un texto, una fecha, imagen, documento, ect...
- Requerido: Al momento de guardar los datos solicitados si este campo es requerido no y lo dejan en blanco el sistema dará una advertencia.
- Caducable: Son daatos o documentos que caducan en el tiempo como la cédula de identidad.

White: Podria aparecerte tanto un sol y white como una luna y dark, que son las dos tonalidades de las aplicaciones de Servisofts Srl. el modo claro y el modo Obscuro.



## Clientes:
![image](https://user-images.githubusercontent.com/7370358/188764097-830025af-23da-4f8a-b8fd-31763cf8b3ca.png)

Inicio del módulo de clientes, podrá ver el perfil previamente parametrizado de sus clientes.


![image](https://user-images.githubusercontent.com/7370358/188764411-bb367161-aa62-434d-a7bd-5f28591d86cc.png)

Lista las personas registradas.

![image](https://user-images.githubusercontent.com/7370358/188764480-86c8d50d-d85a-417a-839f-d8fec54b75c6.png)

Y nos solicita los datos y documentos parametrizados para el rol clientes.

Este es un modulo indispensable para el sistema por el cual mostraremos diferentes tipos de reportes que seguiremos detallando mas adelante.


<!-- 
## Contabilidad
![image](https://user-images.githubusercontent.com/7370358/188764636-3f4781b9-4f4e-4b93-8138-5acb17004cbc.png)


Es un recurso del que se dispone para administrar los gastos e ingresos de una compañía. Cualquier empresa en el desarrollo de su actividad realiza operaciones de compra, venta, financiación como consecuencia de esas actividades su patrimonio varía y obtiene un beneficio o una pérdida.

Todas las empresas son conscientes de que deben gestionar de forma adecuada los parámetros contables. Este concepto involucra tanto a las denominadas pequeñas y medianas empresas (PYMES) como a las grandes multinacionales. Del mismo modo, obedece tanto a razones de índole financiera en términos de asegurar la adecuada rentabilidad, como a disposiciones fiscales, debido a la presión de los fiscos federales, provinciales y locales sobre cada formación corporativa.

Darmotos como empresa no cuenta con un modulo contable financiero en el software, pero como es indispensable para la buena gestion, la plataforma tendra una contabilidad abstracta (por detras), esto quiere decir que la app realizara transacciones contables para la buena gestion de su informacion pero que no mantendra un historico, ni sus respectivos reportes hasta que la empresa decida comprar el modulo contable.



## Inventario
![image](https://user-images.githubusercontent.com/7370358/188765420-c16589b5-765e-4517-8ab2-8f3336e01fa9.png)

(Modulo en desarrollo)
-->


## Roles:
![image](https://user-images.githubusercontent.com/7370358/188765588-575886e9-4970-434b-aaf6-5b34c01f9985.png)

Qué es Rol?

El rol es el papel o función que alguien o algo representa o desempeña, por voluntad propia o por imposición. La palabra, como tal, proviene del inglés  role, que significa 'papel de un actor', y este a su vez viene del francés rôle.

En nuestro caso para intentar explicarlo de una mejor manera, el rol puede compararse con el cargo de una persona en la estructura organizacional.

El rol juega un papel muy importante en el sistema, ya que este se encarga de gestionar el acceso a los permisos y vistas de los diferentes ejecutivos de la empresa, segun el papel que desempeñan.

 - Una vez registrados los usuarios, es necesario asignarle uno o mas roles para gestionar sus 
   permisos de acceso a las diferentes funcionalidades del
   sistema. Por esto se desarrolla un módulo de roles y permisos
   para los usuarios.
      
   Al igual que los usuarios lo primero en ver será la lista y las opciones de crear.
   
   ![Screenshot 1](./img/roles_permisos_list.png)
   
   Al seleccionar un rol ingresará a su panel administrativo donde podrá:
    
    - Editar
    - Eliminar
    - Datos y documentos
    - Usuarios que tienen el rol
    - Permisos del rol
   
   ![Screenshot 1](./img/roles_permisos_perfil.png)



## Sucursales

![image](https://user-images.githubusercontent.com/7370358/188766565-fb9bc90b-2620-4c4b-b8c7-09df0f46af35.png)

- En este icono podra administrar todas las sucursales que guste

![image](https://user-images.githubusercontent.com/7370358/188766693-81543a6a-81da-4b82-85d9-70dfa9cd0e2c.png)



## Usuarios
![Screenshot 1](./img/usuario_icon.png)


 - Para llevar una buena gestion de lo que ocurre en un software
   informático es indispensable el desarrollo de un módulo de
   registro, edición, bloqueo, baja y seguimientos de usuarios.
   <br />
   <br />
   En este caso el usuario administrador ingresa al apartado usuarios:
   <br />
   
   <br />
   <br />
   Al ingresar odrá ver un listado de los usuarios del sistema y si tiene los respectivos permisos, 
   podra crear nuevos y ver en forma de tabla.
   <br />
   <br />
              
   ![Screenshot 1](./img/usuarios_lists.png)
            
   Al seleccionar un usuario podrá dirigirse hasta su perfil, donde podra cambiar su foto, y su respectiva información segun su rol en el sistema,
   ya se una cliente, un empleado un administrador o alguno otro nuevo creado por alguna necesidad futura.
   <br />
   <br />
   ![Screenshot 1](./img/usuario_perfil.png)
   <br />
   <br />
   

## Perfil
![image](https://user-images.githubusercontent.com/7370358/188766910-8a4e6b2d-b9d4-47ce-a9ee-68a356bc5671.png)

En este icono podras ver la informacion de tu usuario logueado al sistema y sus roles asignados.

![image](https://user-images.githubusercontent.com/7370358/188767042-df16ae0e-04c0-4fe1-865f-ed1f911b79d6.png)



## Authors

- Servisofts Srl.

# Desarrollo de Aplicaciones Multiplataforma - Aplicación para sistema de riego con electroválvulas
CEIoT - UBA

El trabajo fue realizado en la carpeta app-fullstack-base-2022-i07.

# Uso de la aplicación
* Fork el repositorio a su perfil.
* Clone el repositorio a su ordenador.
  - git clone https://github.com/XXXX/DAM.git
* Abra la carpeta app-fullstack-base-2022-i07 con un IDE (por ejemplo vscode).
* Abra Docker (Docker Desktop en caso de ejecutar con Windows).
* Dentro de la carpeta ejecute docker-compose up.
* Podrá encontrar la aplicación accediendo en su ordenador a localhost:8100.

# Navegar por la aplicación
* Home page:
-- Encontrará la lista de dispositivos, con su ubicación, última medición y la posibilidad de acceder a más detalles.
![image](https://github.com/joelspak/DAM/assets/63516957/6cc626ed-520e-42d1-9b9c-4fbd793b65a2)

* Al acceder a más detalles ingresará en la página del dispositivo.
  ![image](https://github.com/joelspak/DAM/assets/63516957/1a91b4ca-99bc-4a8e-9425-248160a20746)
El gráfico mostrará la medición actual de presión de la válvula. De aquí usted puede ejecutar tres acciones:
* Abrir la electroválvula: se ejecuta el riego, aliviará la presión del suelo y se guardarán los datos de apertura de válvula en la base de datos. Para cerrar la electroválvula, lo podrá hacer manualmente o puede esperar a que cierre sola automáticamente.Se guardarán luego la maniobra de cierre y la nueva medición en la base de datos.
* Ver todas las mediciones del sensor.
  
 - ![image](https://github.com/joelspak/DAM/assets/63516957/4550546a-c813-4d76-a1c6-61fd73d557cd)

* Ver todos los riegos para esa válvula.
  
- ![image](https://github.com/joelspak/DAM/assets/63516957/5a1243cc-9c3d-45e9-80e7-2591e09e67ec)

# Estructura Ionic del proyecto

![image](https://github.com/joelspak/DAM/assets/63516957/e4813aef-ddf9-4301-a3fa-bbd979418fa8)

# Uso de herramientas en el proyecto
* Directivas estructurales: se utilizaron tres "ngFor" para formar las listas a partir de los datos de la base de datos, en home.page.html, en log-riego.component.html y en mediciones.component.html.
* Directivas de atributo: se utilizó una directiva de atributo que cambia el color de un dispositivo en una lista al pasar el mouse por encima (color de fondo gris). Se utilizó en home.page.html.
* Pipes: se utilizaron algunos pipes ya predefinidos de angular, por ejemplo <h2>{{ dispositivo.valor_ultima_medicion | number: '1.1-2' }} Cb</h2> en home.page.html o un cambio en las variables en log-riego.component.html: <ion-col>{{ riego.apertura === 1 ? 'Apertura de válvula' : 'Cierre de válvula' }}</ion-col>, pero se creó un pipe custom para cambiar el formato de fecha y se utilizó en log-riego.component.html: <ion-col size="3"><h2>{{ riego.fecha | FormatoFecha }}</h2></ion-col>. Este pipe pone la fecha en formato 'dd-MM-yy HH:mm:ss'.
* Servicio para conectar a la API: se encuentra en src/frontend/dam/src/app/services/dispositivo.service'
* API Express: se encuentra en src/backend/routes/dispositivo/index.js








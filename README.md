# City Ways

Una aplicación web y movil que permite a sus usuarios utilizar plazas de aparcamientos que otros usuarios han puesto a su disposición.

## Extras:

- Cliente: </br>
  En la parte del cliente, hemos implementado un sistema de comprobación del JWT almacenado del usuario mediante la librería [@auth0/angular-jwt](https://www.npmjs.com/package/@auth0/angular-jwt) en la inizializacion de la aplicacion gracias al token de Angular [APP_INITIALIZER](https://angular.io/api/core/APP_INITIALIZER). En el tema de la seguridad esta implementado en el HttpInterceptor una redireccion al _home_ en caso de que durante el funcionamiento se borren las credenciales o se le caduque el Token, tambien hemos empledo dos tipos de _guards_ [canLoad](https://angular.io/api/router/CanLoad) y [canActive](https://angular.io/api/router/CanActivate), el primero para controlar que se cargen los diferentes módulos que requieren estar autentautentificado y el segundo para controlar el acceso a las rutas una vez ya cargados los módulos.
  </br>
- Api: </br>
  En la parte de la api hemos trabajado para implementar diversas mejoras como la validacion de los datos recibidos mediante componente de Symfony [Validator](https://symfony.com/doc/current/validation.html), la gestión de los permisos de cada usuario mediante los [Voters](https://symfony.com/doc/current/security/voters.html)

### Instalación:

Para poder ejecutar tanto el backend (api) y el cliente es necesario tener los diferentes archivos con las variables de entorno, para el frontend hay que agregar la carpeta [environments](https://drive.google.com/file/d/1Vgpoy70Hnyoe3s10T3cHXRiDrcAP_FoK/view?usp=sharing) a nivel de _src_ y para el backend hay que agregar el archivo [.env](https://drive.google.com/file/d/1rDUuG9SYZvLNTLFaPgB6UJThMplEDRHG/view?usp=sharing) a nivel de raíz y generar las claves para los tokens JWT con openssl con el valor de la variable `JWT_PASSPHRASE` que se encuentra en el archivo `.env`

### Uso:

- API:

```bash
cd api
# instalar las dependencias
composer install
#inicar el servidor
symfony serve
```

- Cliente:

```bash
cd client
# instalar las dependencias
npm install
#inicar el servidor
npm run start
```

## Metodologías aplicadas:

En cuanto a las diferentes metodologías que hemos puesto en practica durante el proyecto han sido, SCRUM para organizar el trabajo con la herramienta [JIRA](https://iker322.atlassian.net/jira/software/projects/CW/boards/4), en el aspecto técnico nos hemos centrado en seguir el flujo de trabajo de git [gitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow), escribinedo los commits según el estándar de commits de [angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format). En el código nos hemos enfocado crear componentes reutilizables para evitar duplicidad de código, DRY (Don't repeat yourself).

## CI/CD:

Para el depliege de tanto la api (backend) como del cliente (frontend) empleamos [Github Actions](https://github.com/features/actions), que nos ofrece la posibilidad de automatizar el despliege. Los archivos de configuración están en [.github/workflows](./.github/workflows/)

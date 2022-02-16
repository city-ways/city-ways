# City Ways

Una aplicación web y movil que permite a sus usuarios utilizar plazas de aparcamientos que otros usuarios han puesto a su disposición.

## Resumen:

_[en progreso]_

### Instalación:

Para poder ejecutar tanto el backend (api) y el cliente es necesario tener los diferentes archivos con las variables de entorno, para el frontend hay que agregar la carpeta [environments](https://drive.google.com/file/d/1Vgpoy70Hnyoe3s10T3cHXRiDrcAP_FoK/view?usp=sharing) a nivel de _src_ y para el backend hay que agregar el archivo [.env](https://drive.google.com/file/d/1rDUuG9SYZvLNTLFaPgB6UJThMplEDRHG/view?usp=sharing) a nivel de raíz.

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

Para el depliege de tanto la api (backend) como del cliente (frontend, aun pendiente) empleamos [Github Actions](https://github.com/features/actions), que nos ofrece la posibilidad de automatizar el despliege. Los archivos de configuración están en [.github/workflows](./.github/workflows/)

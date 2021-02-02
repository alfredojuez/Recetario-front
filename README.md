# Recetario versión 0.1 beta

Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) version 9.1.13.

# Servidor de desarrollo

Hay que ejecutar 
```
#> ng serve
``` 
para levantar el servidor de desarrollo, aunque tambien tenemos asociado un alias con el comando:
```
#> npm start
``` 
que ejecuta 'ng serve' igualmente.

En cualquier caso, para probar el frontend hay que ir a la URL [http://localhost:4200/](http://localhost:4200/).

Cualquier cambio en el codigo fuente se recargará automáticamente en el navegador.

# Ayuda para la codificación

Podemos crear de manera sencilla componentes con la siguiente instrucción:
```
#> ng generate component component-name
``` 
para crear un nuevo componente. Tambien podremos usar:
```
#> ng generate directive|pipe|service|class|guard|interface|enum|module
```

# Construir el proyecto

Para construir el proyecto, tenemos que ejecutar 
```
#> ng build
```
Esto generará los artefactos que se almacenarán en la carpeta **/dist**. 

Si queremos generar la versión para producción, minimizada hay que usar el parametro  **--prod**.

# Ejecutar test unitarios

Con el parametro  
```
#> ng test
```
Para los tests unitarios hemos usado [Karma](https://karma-runner.github.io).

# Ejecutar tests end-to-end 

Los tests end to end se ejecutarán con el comando:
```
#> ng e2e
```
En este caso usamos [Protractor](http://www.protractortest.org/).

# Más ayudas

Para obtener más ayudas acerca de Angular CLI use:

```
#> ng help
``` 
o vaya al README de [Angular CLI](https://github.com/angular/angular-cli/blob/master/README.md).

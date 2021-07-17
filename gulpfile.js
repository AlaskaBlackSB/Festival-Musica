const {src, dest, watch, series, parallel} = require ('gulp');
const sass = require('gulp-dart-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemap = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');


//Rutas
const paths = {
    imagenes: 'src/img/**/*',
    scss: "./src/scss/app.scss",
    archivos: "./src/scss/**/*.scss",
    js: 'src/js/**/*.js'
}

//Funcion para compilar SASS
function compilarSCSS() {
    return src(paths.scss)   //Encuentra el app.scss
        .pipe( sourcemap.init() )      //Identifica la referencia de los archivos originales
        .pipe( sass() )                            //se compila
        .pipe( postcss( [autoprefixer(), cssnano()] ) ) //se optimiza el codigo
        .pipe( sourcemap.write('.') )   //escribe el mapa en el disco duro
        .pipe( dest("./build/css") );   //se guarda el archivo compilado
}

//Funcion para compilar JavaScript
function compilarJS() {
    return src(paths.js)                //Busca todos los archivos .js
        .pipe( sourcemap.init() )      //Identifica la referencia de los archivos originales
        .pipe( concat('bundle.js') )    //se compilan todos los archivos js en un mismo archivo
        .pipe( terser() )   //Minifica el codigo
        .pipe( sourcemap.write('.') )   //escribe el mapa en el disco duro
        .pipe( rename({suffix: 'min'}) )
        .pipe( dest("./build/js") );    //se guarda el archivo compilado
}

//Funcion para hacer imagenes mas pequeñas de tamaño
function imageMin() {
    return src(paths.imagenes)      //Entra a img y busca en todas las carpetas y busca todas las imagenes
        .pipe( imagemin() )         //Minifica las imagenes
        .pipe( dest('./build/img') ); //Las guarda en dest/img
        // .pipe( notify({message: 'Imagen Minificada'}) );
}

//Funcion que pasa las imagenes a formato webp
function imagenWebp(params) {
    return src(paths.imagenes)          //Entra a img y busca en todas las carpetas y busca todas las imagenes
        .pipe( webp() )                 //convierte la imagen a webp
        .pipe( dest('./build/img') );   
}

//Funcion para que cada vez que se guarde el archivo SCSS se compile automaticamente
function watchArchivos() {
    // *.scss es para poder escuchar todos los archivos con extencion scss 
    // **/ es para poder escuchar todas las carpetas
    watch( paths.archivos, compilarSCSS );
    watch( paths.js, compilarJS );
}

exports.compilarSCSS =  compilarSCSS;
exports.imageMin =  imageMin;
exports.watchArchivos = watchArchivos;
exports.compilarJS =  compilarJS;

exports.default = series(compilarSCSS, compilarJS, imageMin, imagenWebp, watchArchivos);
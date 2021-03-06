var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';

var config = {
    env: 'development',
    production: production,

    src: {
        none: '',
        root: 'src',
        templates: 'src/templates',
        assets: 'src/assets',
        templatesData: 'src/templates/data',
        pagelist: 'src/index.yaml',
        sass: 'src/sass',
        // path for sass files that will be generated automatically via some of tasks
        sassGen: 'src/sass/generated',

        js: 'src/js',
        jsAssets: 'src/js/assets',
        jsTemp: 'src/js/temp',

        img: 'src/img',
        sprite: 'src/img/general/sprite',
        // path to png sources for sprite:png task
        iconsPng: 'src/icons/png',
        // path to svg sources for sprite:svg task
        iconsSvg: 'src/icons/svg',
        // path to svg sources for iconfont task
        iconsFont: 'src/img/icons',
        fonts: 'src/fonts',
        libs: 'src/libs'
    },
    dest: {
        root: destPath,
        html: destPath,
        css: destPath + '/css',
        js: destPath + '/js',
        jsAssets: destPath + '/js/assets',
        jsTemp: destPath + '/js/temp',
        img: destPath + '/img',
        sprite: destPath + '/img/general/sprite',
        fonts: destPath + '/fonts',
        libs: destPath + '/libs'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;

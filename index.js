var _security = require("cloud-out-loud-security");
const swaggerUi = require('swagger-ui-express');

exports._swag = {
    init: function(app, pjson) {
        
        const authenticateJWT = (req, res, next) => {
            _security._jwt.authorize(req, res, next);
        };
        
        const swaggerDocument = require('../swagger/' + process.env.SWAGGER_FILE);
        var showExplorer = false;
        var options = {
            validatorUrl: null
        };
        swaggerDocument.host = process.env.SWAGGER_HOST
        swaggerDocument.info.version = pjson.version
        swaggerDocument.info.description = pjson.description
        swaggerDocument.info.title = pjson.name

        swaggerDocument.basePath = process.env.APP_BASE_PATH
        app.use(process.env.APP_BASE_PATH + '/swagger', authenticateJWT, swaggerUi.serve, swaggerUi.setup(swaggerDocument, showExplorer, options));

    }

}
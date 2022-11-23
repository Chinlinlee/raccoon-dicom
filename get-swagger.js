const swaggerJsDoc = require("swagger-jsdoc");
const fsP = require("fs").promises;

(async () => {
    const swaggerDefinition = {
        info: {
            // API informations (required)
            title: "Raccoon", // Title (required)
            version: "1.0.0", // Version (required)
            description: "Raccoon API" // Description (optional)
        },
        openapi: "3.0.0"
    };

    // Options for the swagger docs
    const options = {
        // Import swaggerDefinitions
        swaggerDefinition,
        // Path to the API docs
        // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
        apis: [
            `${__dirname}/api/**/*.js`,
            `${__dirname}/docs/swagger/parameters/*.yaml`,
            `${__dirname}/docs/swagger/schemas/*.yaml`
        ]
    };

    const swaggerSpec = await swaggerJsDoc(options);
    console.log(JSON.stringify(swaggerSpec, null, 4));
    fsP.writeFile("docs/swagger/openapi.json", JSON.stringify(swaggerSpec, null, 4));
})();

require("module-alias/register");
const fsP = require("fs/promises");
const sequelize = require("./instance");
const sequelizeErd = require("sequelize-erd");


require("./init").then(async()=> {
    const svg = await sequelizeErd({
        source: sequelize
      }); // sequelizeErd() returns a Promise
      await fsP.writeFile("./erd.svg", svg);
});



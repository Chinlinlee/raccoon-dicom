const { pluginGroup, LocalPlugin } = require("../plugins/plugin.class");

class Controller {
    
    /**
     *
     * @param {import('http').IncomingMessage} req
     * @param {import('http').ServerResponse} res
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async preProcess() {
        let currentRouterPlugin = pluginGroup.findLocalPlugin(this.request.originalUrl, this.request.method) || new LocalPlugin();
        
        try {

            for(let preFn of currentRouterPlugin.preFns) {
                await preFn(this.request, this.response);
            }
            
        } catch(e) {
            throw new Error(`pre process error in path "${this.request.originalUrl}", ${e.message}`);
        }
        
    }

    async mainProcess() {}

    async postProcess() {
        let currentRouterPlugin = pluginGroup.findLocalPlugin(this.request.url, this.request.method) || new LocalPlugin();

        try {

            for(let postFn of currentRouterPlugin.postFns) {
                await postFn(this.request, this.response);
            }

        } catch(e) {
            throw new Error(`post process error in path "${this.request.originalUrl}", ${e.message}`);
        }
    }
}

module.exports.Controller = Controller;
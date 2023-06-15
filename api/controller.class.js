const { pipe } = require("../utils/pipe.js");
const { pluginGroup, LocalPlugin } = require("../plugins/plugin.class");

class Controller {
    
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    constructor(req, res) {
        this.request = req;
        this.response = res;
    }

    async preProcess() {
        let currentRouterPlugin = pluginGroup.findLocalPlugin(this.request.originalUrl, this.request.method) || new LocalPlugin();
        
        try {

            for(let preFn of currentRouterPlugin.preFns) {
                if (this.response.headersSent) break;
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

    async doPipeline() {
        await this.preProcess();

        if (this.response.headersSent) return;
        await this.mainProcess();
    
        this.postProcess();
    }

    /**
     * @return {string}
     */
    paramsToString() {
        let strArr = [];
        let keys = Object.keys(this.request.params);
        for(let i = 0 ; i < keys.length; i++) {
            let key = keys[i];
            strArr.push(`${key}: ${this.request.params[key]}`);
        }
        return strArr.join(" ");
    }

    queryToString() {
        let strArr = [];
        let keys = Object.keys(this.request.query);
        for(let i = 0 ; i < keys.length; i++) {
            let key = keys[i];
            strArr.push(`${key}: ${this.request.query[key]}`);
        }
        return strArr.join(" ");
    }
}

module.exports.Controller = Controller;
/**
 * @typedef PluginOptions
 * @property {boolean} enable
 * @property {boolean} before
 * @property {PluginRouter[]} routers
 */

/**
 * @typedef PluginRouter
 * @property {string} path
 * @property {string} method
 * 
 */

const _ = require("lodash");
const regexparam = require("regexparam");

class Plugin {
    /**
     * 
     * @param {string} name 
     * @param {PluginOptions} options 
     */
    constructor(name, options) {
        this.name = name;
        this.options = options;
        this.fns = [];
        this.preProcessGroup = [];
        this.postProcessGroup = [];
    }

    load() {
        try {
            if (!this.options.enable) return;

            let pluginFuncs = require(`./${this.name}`);
            pluginFuncs = this.singleFuncToArray(pluginFuncs);
    
            this.fns = [...pluginFuncs];
            this.checkIsAllFunc();

            if (this.options.before) {
                this.loadPrePlugin_();
            } else {
                this.loadPostPlugin_();
            }
        } catch(e) {
            throw e;
        }
    }

    /**
     * @private
     */
    loadPrePlugin_() {
        for(let fn of this.fns) {
            this.preProcessGroup.push(fn);
        }
    }

    /**
     * @private
     */
    loadPostPlugin_() {
        for(let fn of this.fns) {
            this.postProcessGroup.push(fn);
        }
    }

    singleFuncToArray(funcs) {
        if(!Array.isArray(funcs)) {
            return [funcs];
        }
        return funcs;
    }

    checkIsAllFunc() {
        let isAllFunc = this.fns.every(v => v instanceof Function);

        if (!isAllFunc) {
            throw new Error("The plugin must be function or function array");
        }
    }
    
}

class LocalPlugin {
    constructor(path, method, preFns=[], postFns=[]) {
        this.path = path;
        this.method = method;
        this.preFns = preFns;
        this.postFns = postFns;
    }
}

class PluginGroup {
    constructor() {
        /** @type {LocalPlugin[]} */
        this.plugins = [];
    }


    add(plugin) {
        let localPlugins = this.convertToLocalPlugins(plugin);

        for(let localPlugin of localPlugins) {
            let hitLocalPlugin = this.findLocalPlugin(localPlugin.path, localPlugin.method);
            if (hitLocalPlugin) {
                this.addFnsToExistPlugin(hitLocalPlugin, localPlugin);
            } else {
                this.plugins.push(localPlugin);
            }
        }

    }

    /**
     * 
     * @param {LocalPlugin} hitLocalPlugin
     * @param {LocalPlugin} plugin 
     */
    addFnsToExistPlugin(hitLocalPlugin, plugin) {
        if (plugin.postFns.length > 0) {
            hitLocalPlugin.postFns.push(...plugin.postFns);
        } else if (plugin.preFns.length > 0) {
            hitLocalPlugin.preFns.push(...plugin.preFns);
        }
    }

    /**
     * 
     * @param {Plugin} plugin 
     * @return {LocalPlugin[]}
     */
    convertToLocalPlugins(plugin) {
        let localPlugins = [];
        for(let router of plugin.options.routers) {
            let localPlugin = new LocalPlugin(router.path, router.method, plugin.preProcessGroup, plugin.postProcessGroup);
            localPlugins.push(localPlugin);
        }

        return localPlugins;
    }

    /**
     * @param {string} path
     * @param {string} method
     */
    findLocalPlugin(path, method) {
        return this.plugins.find(
            v => regexparam.parse(v.path).pattern.exec(path) &&
                 v.method.toUpperCase() === method.toUpperCase()
        );
    }
}

module.exports.Plugin = Plugin;
module.exports.LocalPlugin = LocalPlugin;
const pluginGroup = new PluginGroup();
module.exports.pluginGroup = pluginGroup;
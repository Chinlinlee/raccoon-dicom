const SevenZipMin = require("7zip-min");

class SevenZip {

    /** @type { import("@root/utils/typeDef/sevenZip").archiveType } */
    #type;
    /** @type { string } */
    #source;
    /** @type { string } */
    #dest;
    constructor(type = "zip", source = "", dest = "") {
        this.#type = type;
        this.#source = source;
        this.#dest = dest;
        /** @type {string[]} */
        this.cmd = [];
    }

    /**
     * 
     * @param { import("@root/utils/typeDef/sevenZip").archiveType } value
     */
    setType(value) {
        this.#type = value;
        return this;
    }

    setSource(value) {
        this.#source = value;
        return this;
    }

    setDest(value) {
        this.#dest = value;
        return this;
    }

    addCmd(iCmd) {
        this.cmd.push(iCmd);
        return this;
    }

    recursive() {
        if (this.cmd.includes("-r")) throw new Error("already set recursive");
        this.cmd.push("-r");
        return this;
    }

    useFullyQualifiedFilePaths() {
        if (this.cmd.includes("-spf2")) throw new Error("already set useFullyQualifiedFilePaths");
        this.cmd.push("-spf2");
        return this;
    }

    /**
     * 
     * @param {import("@root/utils/typeDef/sevenZip").overwriteMode} mode 
     */
    overwrite(mode) {
        if (this.cmd.find(v => v.startsWith("-ao"))) throw new Error("already set overwrite");
        this.cmd.push(`-ao${mode}`);
        return this;
    }

    /**
     * run 7zip command:
     * 
     * 7z a -t{type} {dest} {source} {...additionalCmd}
     * @returns 
     */
    async pack() {
        return new Promise((resolve, reject) => {
            let cmd = ["a", `-t${this.#type}`, this.#dest, this.#source, ...this.cmd];
            if (!this.#source) cmd = ["a", `-t${this.#type}`, this.#dest, ...this.cmd];
            SevenZipMin.cmd(cmd, err => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }
}

module.exports.SevenZip = SevenZip;
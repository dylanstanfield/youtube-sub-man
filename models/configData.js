// models
var Folder = require('./folder');

class ConfigData {
    constructor(version = 1, folders = [], created = new Date(), lastSaved = null) {
        this.version = version;
        this.folders = folders;
        this.created = created;
        this.lastSaved = lastSaved;
    }

    /**
     * Adds a folder to this config data
     * @param folder
     */
    addFolder(folder) {
        this.folders.push(folder);
    }

    /**
     * Deletes a folder in this config data, given its id
     * @param folderId
     */
    removeFolder(folderId) {

        var didDelete = false;

        if(this.folders) {
            for(let i in this.folders) {
                if(folderId == this.folders[i].id) {
                    this.folders.splice(i, 1);
                    didDelete = true;
                    break;
                }
            }
        }

        if(!didDelete) throw new Error(`Unable to delete folder with id ${folderId}`);
    }

    /**
     * Sets the subIds of a folder in this config data, given the folder id
     * @param folderId
     * @param subIds
     */
    setSubIdsForId(folderId, subIds) {

        let didUpdate = false;

        if(this.folders) {
            for(let i in this.folders) {
                if(folderId == this.folders[i].id) {
                    this.folders[i].subIds = subIds;
                    didUpdate = true;
                    break;
                }
            }
        }

        if(!didUpdate) throw new Error('Unable to set subIds for folderId');
    }

    /**
     * Converts json to a config data object
     * @param json
     * @returns {ConfigData}
     */
    static fromJson(json) {
        let config = new ConfigData(json.version, [], json.created, json.lastSaved);

        for(let folder of json.folders) {
            config.addFolder(Folder.fromJson(folder));
        }

        return config;
    }
}

module.exports = ConfigData;
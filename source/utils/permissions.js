const config = require("../config");

module.exports = {
    isAdmin(id) {
        return config.admins.includes(id);
    },
    isOwner(id) {
        return config.owners.includes(id);
    }
};
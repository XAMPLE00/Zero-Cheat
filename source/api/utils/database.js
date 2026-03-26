let users = {};

module.exports = {
    get(id) {
        return users[id] || { flags: 0 };
    },
    set(id, data) {
        users[id] = data;
    }
};
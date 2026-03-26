let users = {};

module.exports = {
    get(id) {
        return users[id] || {
            flags: 0,
            bans: 0,
            kicks: 0,
            history: []
        };
    },

    addAction(id, action, reason) {
        const user = this.get(id);

        user.history.push({
            action,
            reason,
            time: new Date().toISOString()
        });

        if (action === "ban") user.bans++;
        if (action === "kick") user.kicks++;
        if (action === "flag") user.flags++;

        users[id] = user;
    }
};
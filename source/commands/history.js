const db = require("../utils/database");

function getRisk(user) {
    if (user.bans > 0) return "🔴 High Risk";
    if (user.flags > 5) return "🟡 Suspicious";
    return "🟢 Clean";
}

module.exports = {
    name: "history",

    execute(msg, args) {
        const id = args[0];
        const user = db.get(id);

        msg.reply(`User ${id} | Risk: ${getRisk(user)}`);
    },

    async executeSlash(interaction) {
        const id = interaction.options.getString("userid");
        const user = db.get(id);

        await interaction.reply(
`📊 User ${id}
Bans: ${user.bans}
Kicks: ${user.kicks}
Flags: ${user.flags}
Risk: ${getRisk(user)}`
        );
    }
};
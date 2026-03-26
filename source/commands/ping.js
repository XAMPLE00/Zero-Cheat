module.exports = {
    name: "ping",

    execute(msg) {
        msg.reply("🏓 Pong!");
    },

    async executeSlash(interaction) {
        await interaction.reply("🏓 Pong!");
    }
};
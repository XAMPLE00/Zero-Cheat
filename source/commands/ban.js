const perms = require("../utils/permissions");
const db = require("../utils/database");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ban",

    execute(msg, args) {
        if (!perms.isAdmin(msg.author.id)) return msg.reply("❌ No permission");

        const userId = args[0];
        const reason = args.slice(1).join(" ") || "No reason";

        db.addAction(userId, "ban", reason);

        msg.reply(`🔨 Banned ${userId}`);
    },

    async executeSlash(interaction) {
        if (!perms.isAdmin(interaction.user.id)) {
            return interaction.reply({ content: "❌ No permission", ephemeral: true });
        }

        const userId = interaction.options.getString("userid");
        const reason = interaction.options.getString("reason");

        db.addAction(userId, "ban", reason);

        const embed = new EmbedBuilder()
            .setTitle("🔨 Ban Issued")
            .setColor("Red")
            .addFields(
                { name: "UserId", value: userId },
                { name: "Reason", value: reason },
                { name: "Moderator", value: interaction.user.tag }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
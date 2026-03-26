require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
    new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a player")
        .addStringOption(opt =>
            opt.setName("userid").setDescription("UserId").setRequired(true))
        .addStringOption(opt =>
            opt.setName("reason").setDescription("Reason").setRequired(true)),

    new SlashCommandBuilder()
        .setName("history")
        .setDescription("Check history")
        .addStringOption(opt =>
            opt.setName("userid").setDescription("UserId").setRequired(true)),

    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping bot")
].map(c => c.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
    );

    console.log("✅ Slash commands registered");
})();
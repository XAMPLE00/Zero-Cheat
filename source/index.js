require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Map();

// Load commands
const commandFiles = fs.readdirSync("./source/commands");
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Prefix commands
require(__dirname + "/events/messageCreate.js")(client);

// Slash commands
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command || !command.executeSlash) return;

    try {
        await command.executeSlash(interaction);
    } catch (err) {
        console.error(err);
        interaction.reply({ content: "Error executing command", ephemeral: true });
    }
});

// Start API
require("./api/server")(client);

client.once("ready", () => {
    console.log(`✅ Bot online as ${client.user.tag}`);
});

client.login(process.env.TOKEN);
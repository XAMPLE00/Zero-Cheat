module.exports = (client) => {
    client.on("messageCreate", async (msg) => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith("!")) return;

        const args = msg.content.slice(1).split(" ");
        const cmd = args.shift().toLowerCase();

        const command = client.commands.get(cmd);
        if (!command || !command.execute) return;

        command.execute(msg, args, client);
    });
};
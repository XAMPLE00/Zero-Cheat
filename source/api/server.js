const express = require("express");
const config = require("../config");
const { EmbedBuilder } = require("discord.js");
const db = require("../utils/database");

module.exports = (client) => {
    const app = express();
    app.use(express.json());

    app.post("/log", (req, res) => {
        if (req.headers.authorization !== config.apiKey) {
            return res.sendStatus(403);
        }

        const data = req.body;

        const channel = client.channels.cache.get(config.logChannel);

        db.addAction(data.userId, data.action?.toLowerCase() || "flag", data.type);

        if (channel) {
            const embed = new EmbedBuilder()
                .setTitle("🚨 Anti-Cheat Detection")
                .setColor("Red")
                .addFields(
                    { name: "Player", value: `${data.player} (${data.userId})` },
                    { name: "Type", value: data.type },
                    { name: "Values", value: data.values },
                    { name: "Action", value: data.action },
                    { name: "Server", value: data.jobId }
                )
                .setTimestamp();

            channel.send({ embeds: [embed] });
        }

        res.sendStatus(200);
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`🌐 API running on ${PORT}`);
    });
};
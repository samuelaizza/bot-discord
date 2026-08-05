require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: "cargo",
        description: "Cria a mensagem para receber o cargo"
    }
];

const rest = new REST({ version: "10" })
    .setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Registrando comandos...");

        await rest.put(
            Routes.applicationCommands("1534344182708175061"),
            {
                body: commands
            }
        );

        console.log("Comandos registrados!");
    } catch (error) {
        console.error(error);
    }
})();
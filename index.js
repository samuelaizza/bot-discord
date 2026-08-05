require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


// CONFIGURAÇÕES

const CARGO_ID = "1534342563488731256";
const CANAL_ID = "1534343599389540474";


// BOT ONLINE

client.once("ready", () => {
    console.log(`Bot online como ${client.user.tag}`);
});


// COMANDO PARA CRIAR A MENSAGEM

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    if (message.content === "!cargo") {

        const embed = new EmbedBuilder()

            .setColor("#8b00ff")

            .setTitle("🖤 Ganhe seu cargo exclusivo!")

            .setDescription(
`
Quer fazer parte da comunidade **LARPANDO**?

Siga as regras, participe da comunidade e receba seu cargo de membro.

Clique no botão abaixo para liberar seu acesso.
`
            )

            .setImage("https://media.discordapp.net/attachments/1534347334803132529/1534347409851678780/dff9d4ec-fc56-4c6f-afb9-710617ccc2bb.png")

            .setFooter({
                text: "LARPANDO • Comunidade"
            });


        const botao = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()

                    .setCustomId("receber_cargo")

                    .setLabel("Receber")

                    .setStyle(ButtonStyle.Primary)

            );


        await message.channel.send({
            embeds: [embed],
            components: [botao]
        });

    }

});


// QUANDO CLICAR NO BOTÃO

client.on("interactionCreate", async interaction => {

    if (!interaction.isButton()) return;


    if (interaction.customId === "receber_cargo") {


        if (!interaction.guild) return;


        const cargo = interaction.guild.roles.cache.get(CARGO_ID);


        if (!cargo) {

            return interaction.reply({
                content: "❌ Cargo não encontrado.",
                ephemeral: true
            });

        }


        try {

            await interaction.member.roles.add(cargo);


            await interaction.reply({

                content: "✅ Você recebeu seu cargo com sucesso!",

                ephemeral: true

            });


        } catch (error) {

            console.error(error);

            await interaction.reply({

                content: "❌ Não consegui entregar o cargo. Verifique minhas permissões.",

                ephemeral: true

            });

        }

    }

});


// LOGIN

console.log("Tamanho do token:", process.env.DISCORD_TOKEN?.length);

client.login(process.env.DISCORD_TOKEN);
require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


// CLIENT DO BOT

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});


// CONFIGURAÇÕES

const CARGO_ID = "1534342563488731256";


// BOT ONLINE

client.once("ready", () => {
    console.log(`Bot online como ${client.user.tag}`);
});


// INTERAÇÕES

client.on("interactionCreate", async interaction => {

    try {

        // COMANDO /cargo

        if (interaction.isChatInputCommand()) {


            if (interaction.commandName === "cargo") {


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



                await interaction.reply({

                    embeds: [embed],

                    components: [botao]

                });


                console.log("/cargo executado");


            }

        }



        // BOTÃO RECEBER CARGO

        if (interaction.isButton()) {


            if (interaction.customId === "receber_cargo") {


                const cargo = interaction.guild.roles.cache.get(CARGO_ID);



                if (!cargo) {

                    return interaction.reply({

                        content: "❌ Cargo não encontrado.",

                        ephemeral: true

                    });

                }



                await interaction.member.roles.add(cargo);



                await interaction.reply({

                    content: "✅ Você recebeu seu cargo com sucesso!",

                    ephemeral: true

                });


                console.log("Cargo entregue para:", interaction.user.tag);


            }

        }


    } catch (error) {


        console.error("ERRO NA INTERAÇÃO:", error);



        if (!interaction.replied) {

            await interaction.reply({

                content: "❌ Ocorreu um erro ao executar essa ação.",

                ephemeral: true

            });

        }


    }

});


// LOGIN

client.login(process.env.DISCORD_TOKEN);
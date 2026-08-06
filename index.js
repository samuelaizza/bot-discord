require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");


// CLIENT DO BOT

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds

    ]

});


// CONFIGURAÇÕES

const CARGO_ID = "1534342563488731256";


// SISTEMA CAPTCHA

const captchas = new Map();


// BOT ONLINE

client.once("clientReady", () => {

    console.log(`Bot online como ${client.user.tag}`);

});


// INTERAÇÕES

client.on("interactionCreate", async interaction => {


    try {



        // COMANDO /cargo

        if (interaction.isChatInputCommand()) {


            if (interaction.commandName === "cargo") {



                const embed = new EmbedBuilder()

                    .setColor("#ff0080")

                    .setTitle("🖤 Verificação LARPANDO")

                    .setDescription(
`
Bem-vindo à comunidade **LARPANDO**!

Para receber seu cargo de membro, clique no botão abaixo e complete a verificação.

🔒 Essa etapa existe para evitar bots.
`
                    )

                    .setImage(
"https://cdn.discordapp.com/attachments/1534347334803131256/1534372903188041779/Gemini_Generated_Image_szywz2szywz2szyw.png"
                    )

                    .setFooter({

                        text:"LARPANDO • Verificação"

                    });



                const botao = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setCustomId("verificar")

                            .setLabel("🔒 Verificar")

                            .setStyle(ButtonStyle.Primary)

                    );



                await interaction.reply({

                    embeds:[embed],

                    components:[botao]

                });



            }

        }





        // BOTÃO VERIFICAR

        if (interaction.isButton()) {



            if (interaction.customId === "verificar") {



                const codigo = Math.floor(

                    1000 + Math.random() * 9000

                );



                captchas.set(

                    interaction.user.id,

                    codigo

                );




                const modal = new ModalBuilder()

                    .setCustomId("captcha_modal")

                    .setTitle("Verificação LARPANDO");





                const input = new TextInputBuilder()

                    .setCustomId("codigo")

                    .setLabel("Digite o código mostrado abaixo")

                    .setPlaceholder(`Código: ${codigo}`)

                    .setStyle(TextInputStyle.Short)

                    .setRequired(true);




                const row = new ActionRowBuilder()

                    .addComponents(input);




                modal.addComponents(row);




                await interaction.showModal(modal);





                setTimeout(() => {


                    captchas.delete(interaction.user.id);


                },60000);



            }



        }







        // ENVIO DO CAPTCHA

        if (interaction.isModalSubmit()) {



            if (interaction.customId === "captcha_modal") {



                const resposta =

                    interaction.fields.getTextInputValue(
                        "codigo"
                    );



                const codigo =

                    captchas.get(
                        interaction.user.id
                    );





                if (!codigo) {


                    return interaction.reply({

                        content:
                        "❌ Seu captcha expirou. Clique novamente em verificar.",

                        flags:MessageFlags.Ephemeral

                    });


                }





                if (resposta !== codigo.toString()) {



                    return interaction.reply({

                        content:
                        "❌ Código incorreto.",

                        flags:MessageFlags.Ephemeral

                    });



                }





                captchas.delete(

                    interaction.user.id

                );





                const cargo =

                    interaction.guild.roles.cache.get(
                        CARGO_ID
                    );





                if (!cargo) {


                    return interaction.reply({

                        content:
                        "❌ Cargo não encontrado.",

                        flags:MessageFlags.Ephemeral

                    });



                }







                await interaction.member.roles.add(cargo);







                await interaction.reply({

                    content:
                    "✅ Verificação concluída! Você recebeu seu cargo.",

                    flags:MessageFlags.Ephemeral

                });




            }



        }





    } catch(error) {



        console.error(
            "Erro na interação:",
            error
        );



        if (!interaction.replied) {


            await interaction.reply({

                content:
                "❌ Ocorreu um erro.",

                flags:MessageFlags.Ephemeral

            });



        }


    }



});





// LOGIN

client.login(

    process.env.DISCORD_TOKEN

);
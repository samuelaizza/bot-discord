require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    MessageFlags
} = require("discord.js");


// CLIENT DO BOT

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]

});


// CONFIGURAÇÕES

const CARGO_ID = "1534342563488731256";


// SISTEMA DE CAPTCHA

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

                    .setImage("https://cdn.discordapp.com/attachments/1534347334803132529/1534372903188041779/Gemini_Generated_Image_szywz2szywz2szyw.png")

                    .setFooter({

                        text: "LARPANDO • Verificação"

                    });



                const botao = new ActionRowBuilder()

                    .addComponents(

                        new ButtonBuilder()

                            .setCustomId("verificar")

                            .setLabel("🔒 Verificar")

                            .setStyle(ButtonStyle.Primary)

                    );



                await interaction.reply({

                    embeds: [embed],

                    components: [botao]

                });



            }


        }




        // BOTÃO DE VERIFICAÇÃO

        if (interaction.isButton()) {



            if (interaction.customId === "verificar") {



                const codigo = Math.floor(

                    1000 + Math.random() * 9000

                );



                captchas.set(

                    interaction.user.id,

                    codigo

                );



                await interaction.reply({

                    content:
`
🔒 **Verificação LARPANDO**

Digite o código abaixo no chat:

\`${codigo}\`

Você tem 60 segundos.
`,

                    flags: MessageFlags.Ephemeral

                });



                setTimeout(() => {

                    captchas.delete(interaction.user.id);

                }, 60000);



            }


        }



    } catch(error) {


        console.error("Erro na interação:", error);



        if (!interaction.replied) {


            await interaction.reply({

                content: "❌ Ocorreu um erro.",

                flags: MessageFlags.Ephemeral

            });


        }


    }


});




// RESPOSTA DO CAPTCHA

client.on("messageCreate", async message => {


    if (message.author.bot) return;



    const codigo = captchas.get(message.author.id);



    if (!codigo) return;



    if (message.content === codigo.toString()) {



        captchas.delete(message.author.id);



        const cargo = message.guild.roles.cache.get(CARGO_ID);



        if (!cargo) {


            return message.reply(

                "❌ Cargo não encontrado."

            );


        }



        try {


            await message.member.roles.add(cargo);



            await message.reply(

                "✅ Verificação concluída! Você recebeu seu cargo."

            );



        } catch(error) {


            console.error(error);



            await message.reply(

                "❌ Não consegui entregar o cargo. Verifique minhas permissões."

            );


        }



    } else {



        await message.reply(

            "❌ Código incorreto. Tente novamente."

        );


    }



});



// LOGIN

client.login(process.env.DISCORD_TOKEN);
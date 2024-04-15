import { SlashCommandBuilder } from "discord.js";

const command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    console.log("hey yoooo");
    await interaction.reply("Pong!");
  },
};

export default command;

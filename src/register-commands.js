import { REST, Routes } from "discord.js";

import dotenv from "dotenv";

dotenv.config();

const commandDefinitions = [
  {
    name: "hey",
    description: "Replies with Hey!",
  },
  {
    name: "comp",
    description: "Show a list of competitions",
  },
  {
    name: "premier",
    description: "Show matches for Premier League",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commandDefinitions,
      }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();

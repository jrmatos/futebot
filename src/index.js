import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { getCompetitions, getPremierLeagueMatches } from "./utils/api.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("Hey!");
  }

  if (interaction.commandName === "comp") {
    await interaction.deferReply();

    const result = await getCompetitions();

    if (result?.competitions) {
      const names = result?.competitions
        ?.slice(0, 10)
        .map((r) => `- ${r.name}`)
        .join("\n");

      await interaction.editReply(names);
    } else {
      interaction.reply("Could not find competitions data.");
    }
  }

  if (interaction.commandName === "premier") {
    await interaction.deferReply();

    const result = await getPremierLeagueMatches();

    if (result?.matches) {
      const transformed = result?.matches
        .slice(0, 5)
        .map(
          ({ competition, homeTeam, awayTeam, score, utcDate, matchday }) => ({
            competition,
            homeTeam,
            awayTeam,
            score,
            utcDate,
            matchday,
          })
        );

      const formattedString = formatMatches(transformed);

      await interaction.editReply(formattedString.slice(0, 2000 - 1));
    } else {
      interaction.reply("Could not find competitions data.");
    }
  }
});

function formatMatch(match) {
  return (
    `${match.competition.name} - Matchday ${match.matchday}:\n` +
    `Home Team: ${match.homeTeam.name}\n` +
    `Away Team: ${match.awayTeam.name}\n` +
    `Scores: ${match.score?.fullTime?.home}-${match.score?.fullTime?.away}\n` +
    `Date: ${match.utcDate}\n\n`
  );
}

function formatMatches(matches) {
  let result = "";
  matches.forEach((match) => {
    result += formatMatch(match);
  });
  return result;
}

client.login(process.env.DISCORD_TOKEN);

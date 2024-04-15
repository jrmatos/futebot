import axios from "axios";

async function getCompetitions() {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching competitions:", error.message);
  }
}

async function getPremierLeagueMatches() {
  try {
    const response = await axios.get(
      "https://api.football-data.org/v4/competitions/2021/matches",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_API_TOKEN,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle errors here
    console.error("Error fetching competitions:", error.message);
  }
}

// Call the function to fetch competitions
export { getCompetitions, getPremierLeagueMatches };

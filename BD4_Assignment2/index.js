//npm install express sqlite3 sqlite
//node BD4_Assignment2/initDB.js
//node BD4_Assignment2
const { Console } = require("console");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const { ERROR } = require("sqlite3");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "./BD4_Assignment2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4_Assignment2 => Gaming Community" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
Exercise 1: Get All Games

Objective: Fetch all games from the database.

Query Parameters: None

Tasks: Implement a function to fetch all games.

Example Call:

http://localhost:3000/games

Expected Output:

{
	'games': [
	  { 'id': 1, 'title': 'Valorant', 'genre': 'FPS', 'platform': 'PC', 'rating': 4.5 },
	  { 'id': 2, 'title': 'FIFA 22', 'genre': 'Sports', 'platform': 'Console', 'rating': 4.2 },
	  { 'id': 3, 'title': 'Among Us', 'genre': 'Party', 'platform': 'Mobile', 'rating': 4.0 }
	]
}
*/

// function to fetch all games
async function getAllGames() {
  let query = "SELECT * FROM games";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      console.log("No games found");
      throw new ERROR("No games found");
    }
    return { games: result };
  } catch (error) {
    console.log("Error in fetching all games : ", error.message);
    throw error;
  }
}
//api to get all games
app.get("/games", async (req, res) => {
  try {
    let games = await getAllGames();
    console.log(
      "Successfully fetched " + games.games.length + " games from DB",
    );
    return res.status(200).json(games);
  } catch (error) {
    if (error.message === "No games found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 2: Get Game by ID

Objective: Fetch a specific game by its ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a game by its ID.

Example Call:

http://localhost:3000/games/details/1


Expected Output:

{
	'game': { 'id': 1, 'title': 'Valorant', 'genre': 'FPS', 'platform': 'PC', 'rating': 4.5 }
}


*/
// function to fetch a game by its id
async function getGameById(id) {
  let query = "SELECT * FROM games WHERE id = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.get(query, [id]);
    if (!result || result.length) {
      console.log("No game found with id : " + id);
      throw new ERROR("No game found with id : " + id);
    }
    return { game: result };
  } catch (error) {
    console.log("Error in fetching game by id : " + error.message);
    throw error;
  }
}
//api to get a game by its id
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let game = await getGameById(id);
    console.log("Successfully fetched game with id : " + id);
    return res.status(200).json(game);
  } catch (error) {
    if (error.message === "No game found with id : " + id) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 3: Get Games by Genre

Objective: Fetch games based on their genre.

Query Parameters:

genre (string)

Tasks: Implement a function to fetch games by genre.

Example Call:

http://localhost:3000/games/genre/FPS

Expected Output:

{
	'games': [
	  { 'id': 1, 'title': 'Valorant', 'genre': 'FPS', 'platform': 'PC', 'rating': 4.5 }
	]
}
*/
// function to fetch games by genre
async function getGamesByGenre(genre) {
  let query = "SELECT * FROM games WHERE genre = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, [genre]);
    if (!result || result.length == 0) {
      console.log("No games found with genre : " + genre);
      throw new ERROR("No games found with genre : " + genre);
    }
    return { games: result };
  } catch (error) {
    console.log("Error in fetching games by genre : " + error.message);
    throw error;
  }
}
//api to get games by genre
app.get("/games/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    let games = await getGamesByGenre(genre);
    console.log("Successfully fetched games with genre : " + genre);
    console.log(games.games);
    return res.status(200).json(games);
  } catch (error) {
    if (error.message === "No games found with genre : " + genre) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 4: Get Games by Platform

Objective: Fetch games based on their platform.

Query Parameters:

platform (string)

Tasks: Implement a function to fetch games by platform.

Example Call:

http://localhost:3000/games/platform/PC

Expected Output:

{
	'games': [
	  { 'id': 1, 'title': 'Valorant', 'genre': 'FPS', 'platform': 'PC', 'rating': 4.5 }
	]
}


*/
// function to fetch games by platform
async function getGamesByPlatform(platform) {
  let query = "SELECT * FROM games WHERE platform = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, [platform]);
    if (!result || result.length == 0) {
      console.log("No games found with platform : " + platform);
      throw new ERROR("No games found with platform : " + platform);
    }
    return { games: result };
  } catch (error) {
    console.log("Error in fetching games by platform : " + error.message);
    throw error;
  }
}
//api to get games by platform
app.get("/games/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let games = await getGamesByPlatform(platform);
    console.log("Successfully fetched games with platform : " + platform);
    console.log(games.games);
    return res.status(200).json(games);
  } catch (error) {
    if (error.message === "No games found with platform : " + platform) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 5: Get Games Sorted by Rating

Objective: Fetch games sorted by their rating ( highest to lowest ).

Query Parameters: None

Tasks: Implement a function to fetch games sorted by rating.

Example Call:

http://localhost:3000/games/sort-by-rating

Expected Output:

{
	'games': [
	  { 'id': 1, 'title': 'Valorant', 'genre': 'FPS', 'platform': 'PC', 'rating': 4.5 },
	  { 'id': 2, 'title': 'FIFA 22', 'genre': 'Sports', 'platform': 'Console', 'rating': 4.2 },
	  { 'id': 3, 'title': 'Among Us', 'genre': 'Party', 'platform': 'Mobile', 'rating': 4.0 }
	]
}
*/
// function to fetch games sorted by rating
async function getGamesByRating() {
  let query = "SELECT * FROM games ORDER BY rating DESC";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      console.log("No games found");
      throw new ERROR("No games found");
    }
    return { games: result };
  } catch (error) {
    console.log("Error in fetching games by rating : " + error.message);
    throw error;
  }
}
//api to get games sorted by rating
app.get("/games/sort-by-rating", async (req, res) => {
  try {
    let games = await getGamesByRating();
    console.log("Successfully fetched games sorted by rating");
    console.log(games.games);
    return res.status(200).json(games);
  } catch (error) {
    if (error.message === "No games found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 6: Get All Players

Objective: Fetch all players from the database.

Query Parameters: None

Tasks: Implement a function to fetch all players.

Example Call:

http://localhost:3000/players

Expected Output:

{
	'players': [
	  { 'id': 1, 'name': 'Akash Gupta', 'username': 'AkashGamer', 'platform': 'PC', 'rating': 4.7 },
	  { 'id': 2, 'name': 'Rohit Kumar', 'username': 'RohitPlayz', 'platform': 'Console', 'rating': 4.5 },
	  { 'id': 3, 'name': 'Sneha Singh', 'username': 'SnehaWins', 'platform': 'Mobile', 'rating': 4.6 }
	]
}


*/
// function to fetch all players
async function getAllPlayers() {
  let query = "SELECT * FROM players";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      console.log("No players found");
      throw new ERROR("No players found");
    }
    return { players: result };
  } catch (error) {
    console.log("Error in fetching all players : ", error.message);
    throw error;
  }
}
//api to get all players
app.get("/players", async (req, res) => {
  try {
    let players = await getAllPlayers();
    console.log(
      "Successfully fetched " + players.players.length + " players from DB",
    );
    return res.status(200).json(players);
  } catch (error) {
    if (error.message === "No players found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 7: Get Player by ID

Objective: Fetch a specific player by their ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a player by their ID.

Example Call:

http://localhost:3000/players/details/1

Expected Output:

{
	'player': { 'id': 1, 'name': 'Akash Gupta', 'username': 'AkashGamer', 'platform': 'PC', 'rating': 4.7 }
}


*/
// function to fetch a player by their id
async function getPlayerById(id) {
  let query = "SELECT * FROM players WHERE id = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.get(query, [id]);
    if (!result || result.length) {
      console.log("No player found with id : " + id);
      throw new ERROR("No player found with id : " + id);
    }
    return { player: result };
  } catch (error) {
    console.log("Error in fetching player by id : " + error.message);
    throw error;
  }
}
//api to get a player by its id
app.get("/players/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let player = await getPlayerById(id);
    console.log("Successfully fetched player with id : " + id);
    return res.status(200).json(player);
  } catch (error) {
    if (error.message === "No player found with id : " + id) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 8: Get Players by Platform

Objective: Fetch players based on their platform.

Query Parameters:

platform (string)

Tasks: Implement a function to fetch players by platform.

Example Call:

http://localhost:3000/players/platform/PC

Expected Output:

{
	'players': [
	  { 'id': 1, 'name': 'Akash Gupta', 'username': 'AkashGamer', 'platform': 'PC', 'rating': 4.7 }
	]
}


*/
// function to fetch players by platform
async function getPlayerByPlatform(platform) {
  let query = "SELECT * FROM players WHERE platform = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, [platform]);
    if (!result || result.length == 0) {
      console.log("No players found with platform : " + platform);
      throw new ERROR("No players found with platform : " + platform);
    }
    return { players: result };
  } catch (error) {
    console.log("Error in fetching players by platform : " + error.message);
    throw error;
  }
}
//api to get players by platform
app.get("/players/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    let players = await getPlayerByPlatform(platform);
    console.log("Successfully fetched players with platform : " + platform);
    console.log(players.players);
    return res.status(200).json(players);
  } catch (error) {
    if (error.message === "No players found with platform : " + platform) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 9: Get Players Sorted by Rating

Objective: Fetch players sorted by their rating ( highest to lowest ).

Query Parameters: None

Tasks: Implement a function to fetch players sorted by rating.

Example Call:

http://localhost:3000/players/sort-by-rating

Expected Output:

{
	'players': [
	  { 'id': 1, 'name': 'Akash Gupta', 'username': 'AkashGamer', 'platform': 'PC', 'rating': 4.7 },
	  { 'id': 3, 'name': 'Sneha Singh', 'username': 'SnehaWins', 'platform': 'Mobile', 'rating': 4.6 },
	  { 'id': 2, 'name': 'Rohit Kumar', 'username': 'RohitPlayz', 'platform': 'Console', 'rating': 4.5 }
	]
}


*/
// function to fetch players sorted by rating
async function getPlayerByRating() {
  let query = "SELECT * FROM players ORDER BY rating DESC";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      console.log("No players found");
      throw new ERROR("No players found");
    }
    return { players: result };
  } catch (error) {
    console.log("Error in fetching players by rating : " + error.message);
    throw error;
  }
}
//api to get players sorted by rating
app.get("/players/sort-by-rating", async (req, res) => {
  try {
    let players = await getPlayerByRating();
    console.log("Successfully fetched players sorted by rating");
    console.log(players.players);
    return res.status(200).json(players);
  } catch (error) {
    if (error.message === "No players found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 10: Get All Tournaments

Objective: Fetch all tournaments from the database.

Query Parameters: None

Tasks: Implement a function to fetch all tournaments.

Example Call:

http://localhost:3000/tournaments

Expected Output:

{
	'tournaments': [
	  { 'id': 1, 'name': 'Valorant Championship', 'gameId': 1, 'date': '2022-12-01', 'prizePool': 5000 },
	  { 'id': 2, 'name': 'FIFA World Cup', 'gameId': 2, 'date': '2022-11-15', 'prizePool': 3000},
	{ 'id': 3, 'name': 'Among Us Showdown', 'gameId': 3, 'date': '2022-10-20', 'prizePool': 2000 }
	]
}


*/
// function to fetch all tournaments
async function getAllTournaments() {
  let query = "SELECT * FROM tournaments";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      console.log("No tournaments found");
      throw new ERROR("No tournaments found");
    }
    return { tournaments: result };
  } catch (error) {
    console.log("Error in fetching all tournaments : ", error.message);
    throw error;
  }
}
//api to get all tournaments
app.get("/tournaments", async (req, res) => {
  try {
    let tournaments = await getAllTournaments();
    console.log(
      "Successfully fetched " +
        tournaments.tournaments.length +
        " tournaments from DB",
    );
    return res.status(200).json(tournaments);
  } catch (error) {
    if (error.message === "No tournaments found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 11: Get Tournament by ID

Objective: Fetch a specific tournament by its ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch a tournament by its ID.

Example Call:

http://localhost:3000/tournaments/details/1

Expected Output:

{
	'tournament': { 'id': 1, 'name': 'Valorant Championship', 'gameId': 1, 'date': '2022-12-01', 'prizePool': 5000 }
}


*/
// function to fetch a tournament by its id
async function getTournamentById(id) {
  let query = "SELECT * FROM tournaments WHERE id = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.get(query, [id]);
    if (!result || result.length) {
      console.log("No tournament found with id : " + id);
      throw new ERROR("No tournament found with id : " + id);
    }
    return { tournament: result };
  } catch (error) {
    console.log("Error in fetching tournament by id : " + error.message);
    throw error;
  }
}
//api to get a tournament by its id
app.get("/tournaments/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let tournament = await getTournamentById(id);
    console.log("Successfully fetched tournament with id : " + id);
    console.log(tournament.tournament);
    return res.status(200).json(tournament);
  } catch (error) {
    if (error.message === "No tournament found with id : " + id) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});
/*
Exercise 12: Get Tournaments by Game ID

Objective: Fetch tournaments based on their game ID.

Query Parameters:

id (integer)

Tasks: Implement a function to fetch tournaments by game ID.

Example Call:

http://localhost:3000/tournaments/game/1

Expected Output:

{
	'tournaments': [
	  { 'id': 1, 'name': 'Valorant Championship', 'gameId': 1, 'date': '2022-12-01', 'prizePool': 5000 }
	]
}


*/
// function to fetch tournaments by game id
async function getTournamentByGameId(gameId) {
  let query = "SELECT * FROM tournaments WHERE gameId = ?";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, [gameId]);
    if (!result || result.length == 0) {
      console.log("No tournaments found with game id : " + gameId);
      throw new ERROR("No tournaments found with game id : " + gameId);
    }
    return { tournaments: result };
  } catch (error) {
    console.log("Error in fetching tournaments by game id : " + error.message);
    throw error;
  }
}
//api to get tournaments by game id
app.get("/tournaments/game/:gameId", async (req, res) => {
  let gameId = parseInt(req.params.gameId);
  try {
    let tournaments = await getTournamentByGameId(gameId);
    console.log("Successfully fetched tournaments with game id : " + gameId);
    console.log(tournaments.tournaments);
    return res.status(200).json(tournaments);
  } catch (error) {
    if (error.message === "No tournaments found with game id : " + gameId) {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

/*
Exercise 13: Get Tournaments Sorted by Prize Pool

Objective: Fetch tournaments sorted by their prize pool ( highest to lowest ).

Query Parameters: None

Tasks: Implement a function to fetch tournaments sorted by prize pool.

Example Call:

http://localhost:3000/tournaments/sort-by-prize-pool

Expected Output:

{
	'tournaments': [
	  { 'id': 1, 'name': 'Valorant Championship', 'gameId': 1, 'date': '2022-12-01', 'prizePool': 5000 },
	  { 'id': 2, 'name': 'FIFA World Cup', 'gameId': 2, 'date': '2022-11-15', 'prizePool': 3000 },
	  { 'id': 3, 'name': 'Among Us Showdown', 'gameId': 3, 'date': '2022-10-20', 'prizePool': 2000 }
	]
}


*/
// function to fetch tournaments sorted by prize pool
async function getTournamentByPrizePool() {
  let query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  try {
    if (!db) {
      throw new ERROR("Database not connected");
    }
    let result = await db.all(query, []);
    if (!result || result.length == 0) {
      console.log("No tournaments found");
      throw new ERROR("No tournaments found");
    }
    return { tournaments: result };
  } catch (error) {
    console.log(
      "Error in fetching tournaments by prize pool : " + error.message,
    );
    throw error;
  }
}
//api to get tournaments sorted by prize pool
app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    let tournaments = await getTournamentByPrizePool();
    console.log("Successfully fetched tournaments sorted by prize pool");
    console.log(tournaments.tournaments);
    return res.status(200).json(tournaments);
  } catch (error) {
    if (error.message === "No tournaments found") {
      return res.status(404).json({ status: 404, error: error.message });
    } else {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
});

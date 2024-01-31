import NodeCache from "node-cache";
import getCardQuestion from "./cardQuestion.js";

const gameCache = new NodeCache();

const positionsCard = [
  "Start",
  "Purple Yellow",
  "Purple Orange",
  "Green Red",
  "Chance",
  "Green Yellow",
  "Note",
  "Penalty",
  "Purple Orange",
  "Green Red",
  "Tutorial",
  "Purple Yellow",
  "Chance",
  "Green Orange",
  "Green Red",
  "Penalty",
  "Purple Orange",
  "Purple Red",
  "Note",
  "Green Yellow",
  "Salt Lab",
  "Green Orange",
  "Green Red",
  "Penalty",
  "Purple Orange",
  "Chance",
  "Green Yellow",
  "Purple Red",
  "Note",
  "Purple Yellow",
  "Exam Time",
  "Green Orange",
  "Purple Red",
  "Green Yellow",
  "Note",
  "Chance",
  "Green Red",
  "Purple Yellow",
  "Penalty",
  "Purple Orange",
];

export async function getGame() {
  const game = await gameCache.get("game");

  if (game === undefined) {
    return {
      players: [],
      turn: 0,
      start: false,
      roll: 0,
    };
  }

  return game;
}

export async function joinGame(name) {
  let players = await gameCache.get("players");
  let game = await gameCache.get("game");
  let card = await gameCache.get("card");

  if (players === undefined) {
    players = [];
  }

  if (game === undefined) {
    game = {
      players: [],
      turn: 0,
      start: false,
      roll: 0,
    };
  }

  if (card === undefined) {
    card = getCardQuestion();
    gameCache.set("card", card);
  }

  if (players.includes(name)) {
    return players;
  }

  players.push(name);

  game.players.push({
    name,
    cards: [],
    cash: 50,
    position: 0,
    id: players.length - 1,
  });

  gameCache.set("game", game);
  gameCache.set("players", players);

  return { game, id: players.length - 1 };
}

export async function startGame() {
  let game = await gameCache.get("game");

  game.start = true;

  game.players.forEach((player) => {
    player.position = 0;
  });

  gameCache.set("game", game);

  return game;
}

export async function rollDice(value) {
  let game = await gameCache.get("game");
  let cardQuestion = await gameCache.get("card");
  let card = null;

  // One dice for now
  const player = game.players[game.turn];

  player.position += value;

  if (player.position >= 40) {
    player.position -= 40;
    game.start = false;
  } else {
    // Give random card based on position and remove it from the array

    if (positionsCard[player.position] === "Purple Yellow") {
      card = {
        card: cardQuestion.purple.yellow[
          Math.floor(Math.random() * cardQuestion.purple.yellow.length)
        ],
        cash: 5,
      };
      cardQuestion.purple.yellow.splice(
        cardQuestion.purple.yellow.indexOf(card),
        1
      );
    } else if (positionsCard[player.position] === "Purple Orange") {
      card = {
        card: cardQuestion.purple.orange[
          Math.floor(Math.random() * cardQuestion.purple.orange.length)
        ],
        cash: 10,
      };
      cardQuestion.purple.orange.splice(
        cardQuestion.purple.orange.indexOf(card),
        1
      );
    } else if (positionsCard[player.position] === "Purple Red") {
      card = {
        card: cardQuestion.purple.red[
          Math.floor(Math.random() * cardQuestion.purple.red.length)
        ],
        cash: 20,
      };
      cardQuestion.purple.red.splice(cardQuestion.purple.red.indexOf(card), 1);
    } else if (positionsCard[player.position] === "Green Yellow") {
      card = {
        card: cardQuestion.green.yellow[
          Math.floor(Math.random() * cardQuestion.green.yellow.length)
        ],
        cash: 5,
      };
      cardQuestion.green.yellow.splice(
        cardQuestion.green.yellow.indexOf(card),
        1
      );
    } else if (positionsCard[player.position] === "Green Orange") {
      card = {
        card: cardQuestion.green.orange[
          Math.floor(Math.random() * cardQuestion.green.orange.length)
        ],
        cash: 10,
      };
      cardQuestion.green.orange.splice(
        cardQuestion.green.orange.indexOf(card),
        1
      );
    } else if (positionsCard[player.position] === "Green Red") {
      card = {
        card: cardQuestion.green.red[
          Math.floor(Math.random() * cardQuestion.green.red.length)
        ],
        cash: 20,
      };
      cardQuestion.green.red.splice(cardQuestion.green.red.indexOf(card), 1);
    }
  }

  gameCache.set("game", game);
  gameCache.set("card", cardQuestion);
  gameCache.set("currentCard", card);

  return { game, card };
}

export async function answerQuestion(answer) {
  let game = await gameCache.get("game");
  let card = await gameCache.get("currentCard");

  if (card.card.needProfessor) {
    if (answer === "yes") {
      game.players[game.turn].cash += card.cash;
    } else {
      game.players[game.turn].cash -= 5;
    }
  } else {
    if (card.card.answer.includes(parseInt(answer))) {
      game.players[game.turn].cash += card.cash;
    } else {
      game.players[game.turn].cash -= 5;
    }
  }

  game.turn = (game.turn + 1) % game.players.length;

  gameCache.set("game", game);

  return game;
}

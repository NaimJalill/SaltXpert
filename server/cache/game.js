import NodeCache from "node-cache";
import getCardQuestion from "./cardQuestion.js";
import getCardMore from "./cardMore.js";
import dayjs from "dayjs";

const cache = new NodeCache();

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

async function generateRandomCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let isCodeUnique = false;
  let code = "";
  while (!isCodeUnique) {
    code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }

    isCodeUnique = true;
  }
  return code;
}

export async function joinGame(name) {
  const id = await generateRandomCode(6);
  let game = cache.get("game");

  if (!game || game.end) {
    game = {
      turn: id,
      players: [],
      start: false,
      end: false,
      roll: 0,
      winner: [],
      currentCard: null,
      professor: "",
      timeout: null,
      count: 0,
      side: null,
    };

    const cardQuestion = getCardQuestion();
    const cardMore = getCardMore();

    cache.set("cardQuestion", cardQuestion);
    cache.set("cardMore", cardMore);
  }

  const player = {
    name,
    id,
    cash: 50,
    position: 0,
    cards: [],
    notes: [],
  };

  game.players.push(player);

  cache.set("game", game);

  return { id, game };
}

export async function getGame() {
  return cache.get("game");
}

export async function startGame() {
  const game = cache.get("game");
  game.start = true;
  game.end = false;
  cache.set("game", game);
  return game;
}

export async function clearSide() {
  let game = await cache.get("game");

  const nextPlayer =
    (game.players.findIndex((player) => player.id === game.turn) + 1) %
    game.players.length;
  game.turn = game.players[nextPlayer].id;

  game.side = null;
  game.timeout = null;
  game.count += 1;
  cache.set("game", game);
  return game;
}

export async function getCard(position) {
  let cardMore = await cache.get("cardMore");
  let cardQuestion = await cache.get("cardQuestion");

  let card = null;

  if (position === "Note") {
    const index = Math.floor(Math.random() * cardMore.note.length);

    const note = cardMore.note[index];

    // Remove the note from the array
    cardMore.note.splice(index, 1);

    card = {
      type: "note",
      card: note,
      cash: 0,
    };
  } else if (position === "Chance") {
    const index = Math.floor(Math.random() * cardMore.chance.length);

    const chance = cardMore.chance[index];

    // Remove the chance from the array
    cardMore.chance.splice(index, 1);

    card = {
      type: "chance",
      card: chance,
      cash: 0,
    };
  } else if (position === "Penalty") {
    const index = Math.floor(Math.random() * cardMore.penalty.length);

    const penalty = cardMore.penalty[index];

    // Remove the penalty from the array
    cardMore.penalty.splice(index, 1);

    card = {
      type: "penalty",
      card: penalty,
      cash: 0,
    };
  } else if (position === "Purple Yellow") {
    const index = Math.floor(Math.random() * cardQuestion.purple.yellow.length);

    const question = cardQuestion.purple.yellow[index];

    // Remove the question from the array
    cardQuestion.purple.yellow.splice(index, 1);

    card = {
      type: "purple green",
      card: question,
      cash: 5,
    };
  } else if (position === "Purple Orange") {
    const index = Math.floor(Math.random() * cardQuestion.purple.orange.length);

    const question = cardQuestion.purple.orange[index];

    // Remove the question from the array
    cardQuestion.purple.orange.splice(index, 1);

    card = {
      type: "purple orange",
      card: question,
      cash: 10,
    };
  } else if (position === "Purple Red") {
    const index = Math.floor(Math.random() * cardQuestion.purple.red.length);

    const question = cardQuestion.purple.red[index];

    // Remove the question from the array
    cardQuestion.purple.red.splice(index, 1);

    card = {
      type: "purple red",
      card: question,
      cash: 20,
    };
  } else if (position === "Green Yellow") {
    const index = Math.floor(Math.random() * cardQuestion.green.yellow.length);

    const question = cardQuestion.green.yellow[index];

    // Remove the question from the array
    cardQuestion.green.yellow.splice(index, 1);

    card = {
      type: "green green",
      card: question,
      cash: 5,
    };
  } else if (position === "Green Orange") {
    const index = Math.floor(Math.random() * cardQuestion.green.orange.length);

    const question = cardQuestion.green.orange[index];

    // Remove the question from the array
    cardQuestion.green.orange.splice(index, 1);

    card = {
      type: "green orange",
      card: question,
      cash: 10,
    };
  } else if (position === "Green Red") {
    const index = Math.floor(Math.random() * cardQuestion.green.red.length);

    const question = cardQuestion.green.red[index];

    // Remove the question from the array
    cardQuestion.green.red.splice(index, 1);

    card = {
      type: "green red",
      card: question,
      cash: 20,
    };
  } else if (position === "Exam Time") {
    const listCard = ["purple", "green"];
    const listSalt = ["yellow", "orange", "red"];

    const indexCard = Math.floor(Math.random() * listCard.length);
    const indexSalt = Math.floor(Math.random() * listSalt.length);

    const questions = cardQuestion[listCard[indexCard]][listSalt[indexSalt]];

    const index = Math.floor(Math.random() * questions.length);

    const question = questions[index];

    // Remove the question from the array
    questions.splice(index, 1);

    card = {
      type: "exam",
      card: question,
      cash: 0,
    };
  }

  cache.set("cardMore", cardMore);
  cache.set("cardQuestion", cardQuestion);

  return card;
}

export async function rollDice(value) {
  let game = await cache.get("game");

  game.roll = value;

  const id = game.turn;

  const player = game.players.find((player) => player.id === id);

  player.position += value;

  if (player.position >= 40) {
    player.position -= 40;

    // Find the highest money
    let highestMoney = 0;
    let winner = [];
    game.players.forEach((player) => {
      if (player.cash > highestMoney) {
        highestMoney = player.cash;
        winner = [player.id];
      } else if (player.cash === highestMoney) {
        winner.push(player.id);
      }
    });

    game.winner = winner;
    game.count += 1;

    cache.set("game", game);

    return { game, position: "Start" };
  }

  const position = positionsCard[player.position];

  let card = null;
  if (position === "Tutorial") {
    // 1 minute
    game.timeout = dayjs().add(1, "minute").toDate();

    game.side = "Tutorial";
  } else if (position === "Exam Time") {
    // 3 minutes
    game.side = "Exam Time";
    card = await getCard(position);
    game.timeout = dayjs().add(3, "minute").toDate();
  } else if (position === "Salt Lab") {
    // 2 minutes'
    game.side = "Salt Lab";
  } else {
    card = await getCard(position);

    if (
      position !== "Penalty" &&
      position !== "Chance" &&
      position !== "Note"
    ) {
      // 3 minutes
      game.timeout = dayjs().add(3, "minute").toDate();
    } else {
      game.timeout = null;
    }
  }

  game.currentCard = card;
  game.count += 1;

  cache.set("game", game);

  return { game, position };
}

export async function skipQuestion() {
  let game = await cache.get("game");

  let currentPlayer = game.players.find((player) => player.id === game.turn);

  // get chance card
  let cards = currentPlayer.cards.filter((card) => card.type === "chance");

  // find id 2
  const index = cards.findIndex((card) => card.card.id === 2);

  if (index !== -1) {
    currentPlayer.cards.splice(index, 1);
  }

  const nextPlayer =
    (game.players.findIndex((player) => player.id === game.turn) + 1) %
    game.players.length;
  game.turn = game.players[nextPlayer].id;
  game.currentCard = null;
  game.professor = "";
  game.timeout = null;
  game.count += 1;
  cache.set("game", game);

  return game;
}

export async function answerQuestion(answer) {
  let game = await cache.get("game");
  let card = game.currentCard;

  const indexPlayer = game.players.findIndex(
    (player) => player.id === game.turn
  );

  if (card.card.needProfessor) {
    if (answer === "Yes") {
      game.players[indexPlayer].cash += card.cash;
    } else {
      game.players[indexPlayer].cash -= 5;
    }
  } else {
    if (card.card.answer.includes(parseInt(answer))) {
      game.players[indexPlayer].cash += card.cash;
    } else {
      game.players[indexPlayer].cash -= 5;
    }
  }

  const nextPlayer = (indexPlayer + 1) % game.players.length;
  game.turn = game.players[nextPlayer].id;
  // remove card
  game.currentCard = null;
  game.professor = "";
  game.timeout = null;
  cache.set("game", game);

  return game;
}

export async function acceptCard() {
  let game = await cache.get("game");
  let card = game.currentCard;

  const player = game.players.find((player) => player.id === game.turn);
  const indexPlayer = game.players.findIndex(
    (player) => player.id === game.turn
  );

  if (positionsCard[player.position] === "Note") {
    player.notes.push(card);
    const nextPlayer = (indexPlayer + 1) % game.players.length;
    game.turn = game.players[nextPlayer].id;
    game.currentCard = null;
  } else if (positionsCard[player.position] === "Penalty") {
    if (card.card.start) {
      player.position = 0;
    }
    if (card.card.move !== 0) {
      player.position += card.card.move;

      const position = positionsCard[player.position];
      card = await getCard(position);

      game.currentCard = card;
    } else {
      const nextPlayer = (indexPlayer + 1) % game.players.length;
      game.turn = game.players[nextPlayer].id;
      game.currentCard = null;
    }
    player.cash += card.card.cash;
  } else if (positionsCard[player.position] === "Chance") {
    if (card.card.save) {
      player.cards.push(card);
    }

    if (card.card.move !== 0) {
      player.position += card.card.move;

      const position = positionsCard[player.position];
      card = await getCard(position);

      game.currentCard = card;
    } else {
      const nextPlayer = (indexPlayer + 1) % game.players.length;
      game.turn = game.players[nextPlayer].id;
      game.currentCard = null;
    }

    player.cash += card.card.cash;
  }

  cache.set("game", game);

  return game;
}

export async function setProfessor(value) {
  let game = await cache.get("game");

  game.professor = value;
  game.timeout = null;
  game.count += 1;
  cache.set("game", game);

  return game;
}

export async function endGame() {
  let game = await cache.get("game");
  game = {
    turn: null,
    players: [],
    start: false,
    end: true,
    roll: 0,
    winner: [],
    currentCard: null,
    professor: "",
    timeout: null,
    count: 0,
    side: null,
  };

  const cardQuestion = getCardQuestion();
  const cardMore = getCardMore();

  cache.set("cardQuestion", cardQuestion);
  cache.set("cardMore", cardMore);

  cache.set("game", game);
  return game;
}

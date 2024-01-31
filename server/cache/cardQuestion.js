const purpleYellow = [
  {
    id: 1,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: ["Calcium chloride", "Silver chloride", "Calcium sulphate"],
    answer: [0, 1],
    needProfessor: false,
  },
  {
    id: 2,
    question:
      "Which of the following salts can be prepared by a reaction between an acid and a metal?",
    multipleChoice: ["Sodium carbonate", "Magnesium Sulphate"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 3,
    question: "Is NaNO₃ soluble in water?",
    multipleChoice: ["Yes", "No"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 4,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [
      "Lead (II) chloride",
      "Barium sulphate",
      "Copper (II) carbonate",
      "Silver nitrate",
    ],
    answer: [0, 2],
    needProfessor: false,
  },
];

const purpleOrange = [
  {
    id: 1,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [],
    answer: ["Calcium chloride"],
    needProfessor: true,
  },
  {
    id: 2,
    question:
      "Which of the following salts can be prepared by a reaction between an acid and a metal?",
    multipleChoice: ["Sodium carbonate", "Magnesium Sulphate"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 3,
    question: "Is NaNO₃ soluble in water?",
    multipleChoice: ["Yes", "No"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 4,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [
      "Lead (II) chloride",
      "Barium sulphate",
      "Copper (II) carbonate",
      "Silver nitrate",
    ],
    answer: [0, 2],
    needProfessor: false,
  },
];

const purpleRed = [
  {
    id: 1,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [],
    answer: ["Calcium chloride"],
    needProfessor: true,
  },
  {
    id: 2,
    question:
      "Which of the following salts can be prepared by a reaction between an acid and a metal?",
    multipleChoice: ["Sodium carbonate", "Magnesium Sulphate"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 3,
    question: "Is NaNO₃ soluble in water?",
    multipleChoice: ["Yes", "No"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 4,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [
      "Lead (II) chloride",
      "Barium sulphate",
      "Copper (II) carbonate",
      "Silver nitrate",
    ],
    answer: [0, 2],
    needProfessor: false,
  },
];

const greenYellow = [
  {
    id: 1,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [],
    answer: ["Calcium chloride"],
    needProfessor: true,
  },
  {
    id: 2,
    question:
      "Which of the following salts can be prepared by a reaction between an acid and a metal?",
    multipleChoice: ["Sodium carbonate", "Magnesium Sulphate"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 3,
    question: "Is NaNO₃ soluble in water?",
    multipleChoice: ["Yes", "No"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 4,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [
      "Lead (II) chloride",
      "Barium sulphate",
      "Copper (II) carbonate",
      "Silver nitrate",
    ],
    answer: [0, 2],
    needProfessor: false,
  },
];

const greenOrange = [
  {
    id: 1,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [],
    answer: ["Calcium chloride"],
    needProfessor: true,
  },
  {
    id: 2,
    question:
      "Which of the following salts can be prepared by a reaction between an acid and a metal?",
    multipleChoice: ["Sodium carbonate", "Magnesium Sulphate"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 3,
    question: "Is NaNO₃ soluble in water?",
    multipleChoice: ["Yes", "No"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 4,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [
      "Lead (II) chloride",
      "Barium sulphate",
      "Copper (II) carbonate",
      "Silver nitrate",
    ],
    answer: [0, 2],
    needProfessor: false,
  },
];

const greenRed = [
  {
    id: 1,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [],
    answer: ["Calcium chloride"],
    needProfessor: true,
  },
  {
    id: 2,
    question:
      "Which of the following salts can be prepared by a reaction between an acid and a metal?",
    multipleChoice: ["Sodium carbonate", "Magnesium Sulphate"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 3,
    question: "Is NaNO₃ soluble in water?",
    multipleChoice: ["Yes", "No"],
    answer: [0],
    needProfessor: false,
  },
  {
    id: 4,
    question:
      "By carrying out a simple experiment for the following salt, please identify which salt is soluble?",
    multipleChoice: [
      "Lead (II) chloride",
      "Barium sulphate",
      "Copper (II) carbonate",
      "Silver nitrate",
    ],
    answer: [0, 2],
    needProfessor: false,
  },
];

export default function getCardQuestion() {
  return {
    purple: {
      yellow: purpleYellow,
      orange: purpleOrange,
      red: purpleRed,
    },
    green: {
      yellow: greenYellow,
      orange: greenOrange,
      red: greenRed,
    },
  };
}

const chanceCard = [
  {
    id: 1,
    text: "Congratulations! You've won a chemical innovation competition.",
    note: "You get RM10 from a lab assistant.",
    save: false,
    move: 0,
    cash: 10,
    use: null,
  },
  {
    id: 2,
    text: "Exit the exam room",
    note: "These cards can be stored until needed or sold.",
    save: true,
    move: 0,
    cash: 0,
    use: "Exam Time",
  },
  {
    id: 2,
    text: "Exit the exam room",
    note: "These cards can be stored until needed or sold.",
    save: true,
    move: 0,
    cash: 0,
    use: "Exam Time",
  },
];

const penaltyCard = [
  {
    id: 1,
    text: "You don't wear labcoats when conducting experiments. ",
    note: "Please pay a fine of RM5 to the laboratory assistant. ",
    save: false,
    move: 0,
    cash: -5,
    start: false,
  },
  {
    id: 2,
    text: "Back 2 sites back",
    note: "",
    save: false,
    move: -2,
    cash: 0,
    start: false,
  },
  {
    id: 3,
    text: "You are found to have committed fraud during the game.",
    note: "Please return to the START site",
    save: false,
    move: 0,
    cash: 0,
    start: true,
  },
];

const noteCard = [
  {
    id: 1,
    image: null,
    text: "All sulphate salts are soluble in water at room temperature except lead (II) sulphate.",
  },
  {
    id: 2,
    image: null,
    text: "The final procedure for the preparation of insoluble salts is to dry the salt crystals between two pieces of filter paper.",
  },
  {
    id: 3,
    image: null,
    text: "The following diagram shows the preparation of dissolved salts through the neutralization reaction between acid and alkali.",
  },
  {
    id: 4,
    image: null,
    text: "All nitrate salts are soluble in water",
  },
  {
    id: 5,
    image: null,
    text: "All chloride salts are soluble in water EXCEPT: <br/> - Mercury (I) chloride <br/> - Lead (II) chloride <br/> - Silver chloride",
  },
  {
    id: 6,
    image: null,
    text: "All carbonate salts are insoluble in water EXCEPT: <br/> - Sodium carbonate <br/> - Potassium carbonate <br/> - Ammonium carbonate",
  },
  {
    id: 7,
    image: null,
    text: "The method of preparation of insoluble salts is a double decomposition or precipitation reaction.",
  },
  {
    id: 8,
    image: null,
    text: "The preparation of soluble salts of non-ammonium, sodium and potassium salts is through the reaction: <br/> - Acid + reactive metals <br/> - Acid + metal oxides <br/> - Acid + metal carbonates",
  },
  {
    id: 9,
    image: null,
    text: "9.	The recrystallization process is used to clean the salt that may have contained foreign matter during preparation.",
  },
  {
    id: 10,
    image: null,
    text: "An example of a chemical equation for an insoluble salt is: <br/> BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl",
  },
  {
    id: 11,
    image: null,
    text: "An insoluble salt can be prepared by mixing two salt solutions.",
  },
  {
    id: 12,
    image: null,
    text: "Titration is a process which is involved in acid and alkali neutralization reactions.",
  },
  {
    id: 13,
    image: null,
    text: "Lead (II) iodide can be dissolved in hot water to produce a colorless solution.",
  },
  {
    id: 14,
    image: null,
    text: "All ammonium, sodium and potassium salts are soluble in water.",
  },
  {
    id: 15,
    image: null,
    text: "Nitric acid and powdered copper (II) oxide are needed to prepare insoluble salts of the ammonium, sodium and potassium types.",
  },
  {
    id: 16,
    image: null,
    text: "During recrystallization, the filtrate is heated to obtain a saturated salt solution.",
  },
  {
    id: 17,
    image: null,
    text: "Insoluble salts of the ammonium, sodium and potassium types are prepared by the reaction between acids and metal carbonates. <br/> MgCO₃ + HNO₃ → Mg(NO₃)₂ + CO₂ + H₂O",
  },
  {
    id: 18,
    image: null,
    text: "Insoluble salts of the ammonium, sodium and potassium types are prepared by reactions between acids and reactive metals.<br/> Zn + HCI → ZnCl₂ + H₂",
  },
  {
    id: 19,
    image: null,
    text: "Insoluble salts of the ammonium, sodium and potassium types are prepared by the reaction between acids and metal oxides.<br/> CuO + H₂SO₄ → CuSO₄ + H₂O",
  },
  {
    id: 20,
    image: null,
    text: "The reaction between the acid and the reactive metal produces hydrogen gas.",
  },
];

export default function getCard() {
  return {
    chance: chanceCard,
    penalty: penaltyCard,
    note: noteCard,
  };
}

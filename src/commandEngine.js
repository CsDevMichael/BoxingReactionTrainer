const offenceCombinations = {
  Beginner: [
    ["Jab", "Cross"],
    ["Jab", "Cross", "Lead Hook"],
    ["Jab", "Lead Hook"],
    ["Cross", "Lead Hook"],
    ["Jab", "Cross", "Rear Hook"],
    ["Jab", "Rear Uppercut"]
  ],

  Intermediate: [
    ["Jab", "Cross", "Lead Hook", "Cross"],
    ["Jab", "Cross", "Lead Uppercut", "Lead Hook"],
    ["Jab", "Lead Hook", "Cross", "Rear Hook"],
    ["Cross", "Lead Hook", "Rear Uppercut", "Lead Hook"],
    ["Jab", "Cross", "Rear Hook", "Lead Uppercut"],
    ["Jab", "Rear Uppercut", "Lead Hook", "Cross"]
  ],

  Advanced: [
    ["Jab", "Cross", "Lead Hook", "Cross", "Lead Hook"],
    ["Jab", "Slip Left", "Cross", "Lead Hook", "Rear Hook"],
    ["Jab", "Cross", "Roll", "Lead Hook", "Cross"],
    ["Jab", "Lead Hook", "Cross", "Slip Right", "Cross"],
    ["Cross", "Lead Hook", "Roll", "Rear Uppercut", "Lead Hook"],
    ["Jab", "Cross", "Lead Uppercut", "Lead Hook", "Cross"]
  ]
};


const defenseCombinations = {
  Beginner: [
    ["Slip Left"],
    ["Slip Right"],
    ["Roll"],
    ["Parry"],
    ["Pull Back"]
  ],

  Intermediate: [
    ["Slip Left", "Cross"],
    ["Slip Right", "Cross"],
    ["Parry", "Cross"],
    ["Roll", "Lead Hook"],
    ["Pull Back", "Cross"]
  ],

  Advanced: [
    ["Slip Left", "Cross", "Lead Hook"],
    ["Slip Right", "Cross", "Rear Hook"],
    ["Parry", "Cross", "Lead Hook"],
    ["Roll", "Rear Uppercut", "Lead Hook"],
    ["Pull Back", "Cross", "Lead Hook"],
    ["Slip Left", "Cross", "Roll", "Lead Hook"]
  ]
};


const mixedCombinations = {
  Beginner: [
    ["Jab", "Cross", "Slip Left"],
    ["Jab", "Cross", "Slip Right"],
    ["Jab", "Lead Hook", "Roll"],
    ["Cross", "Parry"],
    ["Jab", "Pull Back"]
  ],

  Intermediate: [
    ["Jab", "Cross", "Slip Left", "Cross"],
    ["Jab", "Cross", "Slip Right", "Lead Hook"],
    ["Jab", "Lead Hook", "Roll", "Cross"],
    ["Cross", "Parry", "Lead Hook", "Cross"],
    ["Jab", "Pull Back", "Cross", "Lead Hook"]
  ],

  Advanced: [
    ["Jab", "Cross", "Slip Left", "Cross", "Lead Hook"],
    ["Jab", "Lead Hook", "Roll", "Cross", "Rear Hook"],
    ["Cross", "Parry", "Lead Hook", "Cross", "Slip Right"],
    ["Jab", "Cross", "Pull Back", "Cross", "Lead Hook"],
    ["Jab", "Slip Left", "Cross", "Roll", "Lead Hook"],
    ["Cross", "Lead Hook", "Slip Right", "Rear Uppercut", "Cross"]
  ]
};


function getRandomCombination(combinations) {
  const randomIndex = Math.floor(
    Math.random() * combinations.length
  );

  return combinations[randomIndex];
}


function getCommandPool(difficulty, mode) {
  if (mode === "Offence") {
    return offenceCombinations[difficulty];
  }

  if (mode === "Defence") {
    return defenseCombinations[difficulty];
  }

  return mixedCombinations[difficulty];
}


export function generateCommand(difficulty, mode) {
  const pool = getCommandPool(difficulty, mode);

  return getRandomCombination(pool);
}


function getHandName(hand, stance) {
  if (hand === "Lead") {
    return stance === "Southpaw" ? "Right" : "Left";
  }

  if (hand === "Rear") {
    return stance === "Southpaw" ? "Left" : "Right";
  }

  return hand;
}


function translateCommand(command, stance) {

  if (command === "Lead Hook") {
    return `${getHandName("Lead", stance)} Hook`;
  }

  if (command === "Rear Hook") {
    return `${getHandName("Rear", stance)} Hook`;
  }

  if (command === "Lead Uppercut") {
    return `${getHandName("Lead", stance)} Uppercut`;
  }

  if (command === "Rear Uppercut") {
    return `${getHandName("Rear", stance)} Uppercut`;
  }

  return command;
}


export function formatCommand(command, stance) {
  return command
    .map(singleCommand =>
      translateCommand(singleCommand, stance)
    )
    .join(" → ");
}
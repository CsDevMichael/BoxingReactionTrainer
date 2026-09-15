import { useEffect, useState } from 'react';

const trainingCombinations = {
  Beginner: {
    Offence: [
      "Jab → Cross",
      "Jab → Jab → Cross",
      "Jab → Cross → Lead Hook"
    ],

    Defence: [
      "Slip Left",
      "Slip Right",
      "Roll"
    ],

    Both: [
      "Jab → Cross → Slip Left",
      "Jab → Slip Right → Cross",
      "Jab → Cross → Roll"
    ]
  },

  Intermediate: {
    Offence: [
      "Jab → Cross → Lead Hook → Cross",
      "Jab → Cross → Rear Hook",
      "Jab → Lead Hook → Cross → Lead Hook"
    ],

    Defence: [
      "Slip Left → Slip Right → Cross",
      "Roll → Lead Hook → Cross",
      "Parry → Cross → Slip Right"
    ],

    Both: [
      "Jab → Cross → Slip Left → Lead Hook",
      "Jab → Slip Right → Cross → Roll",
      "Jab → Cross → Roll → Lead Hook"
    ]
  },

  Advanced: {
    Offence: [
      "Jab → Cross → Lead Hook → Rear Uppercut → Lead Hook",
      "Jab → Slip → Cross → Lead Hook → Rear Hook",
      "Double Jab → Cross → Lead Uppercut → Lead Hook"
    ],

    Defence: [
      "Slip Left → Slip Right → Roll → Counter Cross",
      "Parry → Slip Right → Roll → Counter Hook",
      "Pull Back → Cross → Slip Left → Lead Hook"
    ],

    Both: [
      "Jab → Cross → Slip Left → Lead Hook → Roll → Cross",
      "Jab → Slip Right → Cross → Roll → Lead Hook",
      "Double Jab → Slip Left → Cross → Pull Back → Lead Hook"
    ]
  }
};

const roundDurations = {
  Beginner: 60,
  Intermediate: 90,
  Advanced: 120
};

const combinationIntervals = {
  Beginner: 5000,
  Intermediate: 4000,
  Advanced: 3000
};

function TrainingScreen({ difficulty, mode, stance }) {

  const [round, setRound] = useState(1);

  const [timeLeft, setTimeLeft] = useState(
    roundDurations[difficulty]
  );

  const combinations =
    trainingCombinations[difficulty][mode];

  const [combination, setCombination] = useState(
    combinations[
      Math.floor(Math.random() * combinations.length)
    ]
  );
  const [combinationId, setCombinationId] = useState(0);

  useEffect(() => {

    const combinationTimer = setInterval(() => {

      const newCombination =
        combinations[
          Math.floor(Math.random() * combinations.length)
        ];

      setCombination(newCombination);
setCombinationId((previousId) => previousId + 1);

    }, combinationIntervals[difficulty]);

    return () => clearInterval(combinationTimer);

  }, [difficulty, mode]);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((previousTime) => {

        if (previousTime <= 1) {

          setRound((previousRound) => previousRound + 1);

          return roundDurations[difficulty];
        }

        return previousTime - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [difficulty]);

  return (
    <div className="training-screen">

      <div className="round-info">

        <div className="round-number">
          ROUND {round}
        </div>

        <div className="timer">
          {timeLeft}s
        </div>

      </div>

      <div
        key={combinationId}
        className="training-command"
      >
        {combination}
      </div>

    </div>
  );
}

export default TrainingScreen;
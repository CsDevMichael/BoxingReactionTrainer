import { useEffect, useState } from 'react';

const trainingCombinations = {
  Beginner: {
    Offence: [
      "Jab → Cross",
      "Jab → Jab → Cross",
      "Jab → Cross → Lead Hook",
      "Jab → Lead Hook",
      "Cross → Lead Hook",
      "Jab → Cross → Jab",
      "Jab → Rear Uppercut",
      "Lead Hook → Cross",
      "Jab → Lead Hook → Cross",
      "Double Jab → Cross"
    ],

    Defence: [
      "Slip Left",
      "Slip Right",
      "Roll",
      "Parry",
      "Pull Back",
      "Slip Left → Slip Right",
      "Slip Right → Slip Left",
      "Roll → Roll",
      "Parry → Slip Left",
      "Slip Right → Roll"
    ],

    Both: [
      "Jab → Cross → Slip Left",
      "Jab → Slip Right → Cross",
      "Jab → Cross → Roll",
      "Jab → Slip Left → Cross",
      "Jab → Cross → Slip Right",
      "Jab → Roll → Cross",
      "Jab → Slip Right → Lead Hook",
      "Cross → Slip Left → Cross",
      "Jab → Roll → Lead Hook",
      "Double Jab → Slip Right → Cross"
    ]
  },

  Intermediate: {
    Offence: [
      "Jab → Cross → Lead Hook → Cross",
      "Jab → Cross → Rear Hook",
      "Jab → Lead Hook → Cross → Lead Hook",
      "Double Jab → Cross → Lead Hook",
      "Jab → Cross → Lead Uppercut → Lead Hook",
      "Jab → Lead Hook → Rear Uppercut → Cross",
      "Jab → Cross → Lead Hook → Rear Hook",
      "Cross → Lead Hook → Cross → Lead Hook",
      "Double Jab → Cross → Rear Uppercut",
      "Jab → Rear Uppercut → Lead Hook → Cross"
    ],

    Defence: [
      "Slip Left → Slip Right → Cross",
      "Roll → Lead Hook → Cross",
      "Parry → Cross → Slip Right",
      "Slip Left → Cross → Slip Right",
      "Slip Right → Cross → Roll",
      "Pull Back → Cross → Lead Hook",
      "Parry → Slip Left → Cross",
      "Roll → Cross → Slip Right",
      "Slip Left → Roll → Cross",
      "Pull Back → Lead Hook → Cross"
    ],

    Both: [
      "Jab → Cross → Slip Left → Lead Hook",
      "Jab → Slip Right → Cross → Roll",
      "Jab → Cross → Roll → Lead Hook",
      "Double Jab → Slip Left → Cross → Lead Hook",
      "Jab → Slip Right → Cross → Lead Hook",
      "Jab → Cross → Slip Left → Cross",
      "Jab → Roll → Cross → Lead Hook",
      "Jab → Slip Left → Cross → Roll",
      "Cross → Slip Right → Lead Hook → Cross",
      "Double Jab → Cross → Slip Left → Lead Hook"
    ]
  },

  Advanced: {
    Offence: [
      "Jab → Cross → Lead Hook → Rear Uppercut → Lead Hook",
      "Jab → Slip → Cross → Lead Hook → Rear Hook",
      "Double Jab → Cross → Lead Uppercut → Lead Hook",
      "Jab → Cross → Lead Hook → Rear Hook → Cross",
      "Double Jab → Cross → Lead Hook → Rear Uppercut",
      "Jab → Lead Hook → Cross → Lead Uppercut → Cross",
      "Jab → Cross → Rear Uppercut → Lead Hook → Cross",
      "Lead Hook → Cross → Lead Hook → Rear Uppercut → Cross",
      "Jab → Rear Uppercut → Lead Hook → Cross → Lead Hook",
      "Double Jab → Cross → Lead Hook → Cross → Rear Hook"
    ],

    Defence: [
      "Slip Left → Slip Right → Roll → Counter Cross",
      "Parry → Slip Right → Roll → Counter Hook",
      "Pull Back → Cross → Slip Left → Lead Hook",
      "Slip Left → Roll → Slip Right → Cross",
      "Parry → Cross → Slip Left → Roll",
      "Pull Back → Slip Right → Cross → Lead Hook",
      "Slip Right → Roll → Cross → Slip Left",
      "Parry → Slip Left → Roll → Cross",
      "Slip Left → Cross → Roll → Lead Hook",
      "Pull Back → Slip Right → Roll → Cross"
    ],

    Both: [
      "Jab → Cross → Slip Left → Lead Hook → Roll → Cross",
      "Jab → Slip Right → Cross → Roll → Lead Hook",
      "Double Jab → Slip Left → Cross → Pull Back → Lead Hook",
      "Jab → Cross → Roll → Lead Hook → Slip Right → Cross",
      "Jab → Slip Left → Cross → Roll → Lead Hook → Cross",
      "Double Jab → Cross → Slip Right → Lead Hook → Roll → Cross",
      "Jab → Lead Hook → Slip Left → Cross → Roll → Lead Hook",
      "Jab → Cross → Pull Back → Lead Hook → Slip Right → Cross",
      "Jab → Slip Right → Cross → Lead Hook → Roll → Cross",
      "Double Jab → Cross → Slip Left → Roll → Lead Hook → Cross"
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

const restDuration = 30;

function TrainingScreen({ difficulty, mode, stance }) {

  const [round, setRound] = useState(1);

  const [phase, setPhase] = useState("roundIntro");

  const [timeLeft, setTimeLeft] = useState(3);

  const combinations =
    trainingCombinations[difficulty][mode];

  const [combination, setCombination] = useState(
    combinations[
      Math.floor(Math.random() * combinations.length)
    ]
  );

  const [combinationId, setCombinationId] = useState(0);

  /*
    ROUND INTRO
  */

  useEffect(() => {

    if (phase !== "roundIntro") {
      return;
    }

    const introTimer = setTimeout(() => {

      setPhase("training");

      setTimeLeft(
        roundDurations[difficulty]
      );

    }, 3000);

    return () => clearTimeout(introTimer);

  }, [phase, difficulty]);


  /*
    COMBINATION TIMER
  */

  useEffect(() => {

    if (phase !== "training") {
      return;
    }

    const combinationTimer = setInterval(() => {

      const newCombination =
        combinations[
          Math.floor(Math.random() * combinations.length)
        ];

      setCombination(newCombination);

      setCombinationId(
        (previousId) => previousId + 1
      );

    }, combinationIntervals[difficulty]);

    return () => clearInterval(combinationTimer);

  }, [phase, difficulty, mode]);


  /*
    TRAINING ROUND TIMER
  */

  useEffect(() => {

    if (phase !== "training") {
      return;
    }

    const timer = setInterval(() => {

      setTimeLeft((previousTime) => {

        if (previousTime <= 1) {

          setPhase("rest");

          return restDuration;
        }

        return previousTime - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [phase, difficulty]);


  /*
    REST TIMER
  */

  useEffect(() => {

    if (phase !== "rest") {
      return;
    }

    if (timeLeft <= 1) {

      setRound(
        (previousRound) => previousRound + 1
      );

      setPhase("roundIntro");

      setTimeLeft(3);

      return;
    }

    const restTimer = setTimeout(() => {

      setTimeLeft(
        (previousTime) => previousTime - 1
      );

    }, 1000);

    return () => clearTimeout(restTimer);

  }, [phase, timeLeft]);


  /*
    SCREEN
  */

  return (
    <div className="training-screen">

      {phase === "roundIntro" && (

        <div className="round-intro">
          ROUND {round}
        </div>

      )}


      {phase === "training" && (

        <>
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

        </>

      )}


      {phase === "rest" && (

        <div className="rest-screen">

          <div className="rest-title">
            REST
          </div>

          <div className="rest-timer">
            {timeLeft}s
          </div>

          <div className="rest-message">
            Breathe. Recover. Get ready.
          </div>

        </div>

      )}

    </div>
  );
}

export default TrainingScreen;
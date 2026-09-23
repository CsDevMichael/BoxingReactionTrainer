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
  Beginner: 10,
  Intermediate: 15,
  Advanced: 20
};


const combinationIntervals = {
  Beginner: 5000,
  Intermediate: 4000,
  Advanced: 3000
};


const restDuration = 30;

const countdownDuration = 3;

const roundIntroDuration = 3;


/*
  SOUND ENGINE
*/

function playSound(type) {

  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  const audioContext = new AudioContext();

  const oscillator =
    audioContext.createOscillator();

  const gainNode =
    audioContext.createGain();


  oscillator.connect(gainNode);

  gainNode.connect(audioContext.destination);


  let frequency = 600;
  let duration = 0.12;


  if (type === "countdown") {
    frequency = 600;
    duration = 0.12;
  }


  if (type === "start") {
    frequency = 900;
    duration = 0.25;
  }


  if (type === "combination") {
    frequency = 500;
    duration = 0.08;
  }


  if (type === "rest") {
    frequency = 400;
    duration = 0.35;
  }


  if (type === "complete") {
    frequency = 800;
    duration = 0.5;
  }


  oscillator.frequency.value = frequency;

  oscillator.type = "sine";


  gainNode.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );


  gainNode.gain.exponentialRampToValueAtTime(
    0.15,
    audioContext.currentTime + 0.01
  );


  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + duration
  );


  oscillator.start();

  oscillator.stop(
    audioContext.currentTime + duration
  );


  oscillator.onended = () => {
    audioContext.close();
  };

}


/*
  TRAINING SCREEN
*/

function TrainingScreen({
  difficulty,
  mode,
  stance,
  rounds,
  onBackToSetup
}) {

  const combinations =
    trainingCombinations[difficulty][mode];


  const [round, setRound] = useState(1);

  const [phase, setPhase] =
    useState("countdown");


  const [timeLeft, setTimeLeft] =
    useState(countdownDuration);


  const [combination, setCombination] =
    useState(
      combinations[
        Math.floor(
          Math.random() * combinations.length
        )
      ]
    );


  const [combinationId, setCombinationId] =
    useState(0);


  /*
    COUNTDOWN
  */

  useEffect(() => {

    if (phase !== "countdown") {
      return;
    }


    if (timeLeft <= 0) {

      playSound("start");

      setPhase("roundIntro");

      setTimeLeft(roundIntroDuration);

      return;

    }


    playSound("countdown");


    const timer = setTimeout(() => {

      setTimeLeft(
        (previousTime) =>
          previousTime - 1
      );

    }, 1000);


    return () => clearTimeout(timer);

  }, [phase, timeLeft]);


  /*
    ROUND INTRO
  */

  useEffect(() => {

    if (phase !== "roundIntro") {
      return;
    }


    const timer = setTimeout(() => {

      setPhase("training");

      setTimeLeft(
        roundDurations[difficulty]
      );

      playSound("start");

    }, roundIntroDuration * 1000);


    return () => clearTimeout(timer);

  }, [phase, difficulty]);


  /*
    TRAINING TIMER
  */

  useEffect(() => {

    if (phase !== "training") {
      return;
    }


    const timer = setInterval(() => {

      setTimeLeft((previousTime) => {

        if (previousTime <= 1) {

          clearInterval(timer);


          /*
            FINAL ROUND
          */

          if (round === rounds) {

            playSound("complete");

            setPhase("complete");

            return 0;

          }


          /*
            MORE ROUNDS
          */

          playSound("rest");

          setPhase("rest");

          return restDuration;

        }


        return previousTime - 1;

      });

    }, 1000);


    return () => clearInterval(timer);

  }, [
    phase,
    difficulty,
    round,
    rounds
  ]);


  /*
    COMBINATION TIMER
  */

  useEffect(() => {

    if (phase !== "training") {
      return;
    }


    const timer = setInterval(() => {

      const newCombination =
        combinations[
          Math.floor(
            Math.random() * combinations.length
          )
        ];


      setCombination(newCombination);


      setCombinationId(
        (previousId) =>
          previousId + 1
      );


      playSound("combination");

    }, combinationIntervals[difficulty]);


    return () => clearInterval(timer);

  }, [
    phase,
    difficulty,
    mode
  ]);


  /*
    REST TIMER
  */

  useEffect(() => {

    if (phase !== "rest") {
      return;
    }


    if (timeLeft <= 0) {

      setRound(
        (previousRound) =>
          previousRound + 1
      );


      setPhase("roundIntro");

      setTimeLeft(
        roundIntroDuration
      );

      return;

    }


    const timer = setTimeout(() => {

      setTimeLeft(
        (previousTime) =>
          previousTime - 1
      );

    }, 1000);


    return () =>
      clearTimeout(timer);

  }, [
    phase,
    timeLeft
  ]);


  /*
    COMPLETION SCREEN
  */

  if (phase === "complete") {

    return (

      <div className="training-screen">

        <div className="complete-screen">

          <div className="complete-icon">
            🥊
          </div>


          <div className="complete-title">
            TRAINING COMPLETE
          </div>


          <div className="complete-subtitle">
            Session finished. Great work.
          </div>


          <div className="session-summary">

            <div className="summary-item">
              <span>Difficulty</span>
              <strong>{difficulty}</strong>
            </div>


            <div className="summary-item">
              <span>Mode</span>
              <strong>{mode}</strong>
            </div>


            <div className="summary-item">
              <span>Stance</span>
              <strong>{stance}</strong>
            </div>


            <div className="summary-item">
              <span>Rounds</span>
              <strong>{rounds}</strong>
            </div>

          </div>


          <div className="complete-buttons">

            <button
              className="complete-button"
              onClick={onBackToSetup}
            >
              Train Again
            </button>

          </div>

        </div>

      </div>

    );

  }


  /*
    MAIN SCREEN
  */

  return (

    <div className="training-screen">


      {phase === "countdown" && (

        <div className="countdown-screen">

          <div className="countdown-label">
            GET READY
          </div>


          <div
            key={timeLeft}
            className="countdown-number"
          >
            {timeLeft}
          </div>

        </div>

      )}


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
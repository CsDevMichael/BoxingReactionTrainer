import { useEffect, useState } from "react";
import {
  generateCommand,
  formatCommand
} from "./commandEngine";
import { playSound } from "./audioEngine";


const roundDurations = {
  Beginner: 30,
  Intermediate: 45,
  Advanced: 60
};


const combinationTiming = {
  Beginner: {
    min: 4000,
    max: 6000
  },

  Intermediate: {
    min: 3000,
    max: 5000
  },

  Advanced: {
    min: 2000,
    max: 4000
  }
};


const restDuration = 30;
const countdownDuration = 3;
const roundIntroDuration = 3;


function TrainingScreen({
  difficulty,
  mode,
  stance,
  rounds,
  onBackToSetup
}) {

  const [round, setRound] = useState(1);

  const [phase, setPhase] =
    useState("countdown");

  const [timeLeft, setTimeLeft] =
    useState(countdownDuration);

  const [combination, setCombination] =
    useState(
      generateCommand(
        difficulty,
        mode
      )
    );

  const [combinationId, setCombinationId] =
    useState(0);


  /*
   * COUNTDOWN
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
        previousTime =>
          previousTime - 1
      );

    }, 1000);

    return () => clearTimeout(timer);

  }, [
    phase,
    timeLeft
  ]);


  /*
   * ROUND INTRO
   */

  useEffect(() => {

    if (phase !== "roundIntro") {
      return;
    }

    if (timeLeft <= 0) {

      playSound("start");

      setPhase("training");

      setTimeLeft(
        roundDurations[difficulty]
      );

      setCombination(
        generateCommand(
          difficulty,
          mode
        )
      );

      setCombinationId(
        previousId =>
          previousId + 1
      );

      return;
    }

    const timer = setTimeout(() => {

      setTimeLeft(
        previousTime =>
          previousTime - 1
      );

    }, 1000);

    return () =>
      clearTimeout(timer);

  }, [
    phase,
    timeLeft,
    difficulty,
    mode
  ]);


  /*
   * TRAINING TIMER
   */

  useEffect(() => {

    if (phase !== "training") {
      return;
    }

    if (timeLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => {

      setTimeLeft(previousTime => {

        if (previousTime <= 1) {

          if (round >= rounds) {

            playSound("complete");

            setPhase("complete");

            return 0;
          }

          playSound("rest");

          setPhase("rest");

          return restDuration;
        }

        return previousTime - 1;
      });

    }, 1000);

    return () =>
      clearTimeout(timer);

  }, [
    phase,
    timeLeft,
    round,
    rounds
  ]);


  /*
   * NEW BOXING COMMAND
   */

  useEffect(() => {

    if (phase !== "training") {
      return;
    }

    const timing =
      combinationTiming[difficulty];

    const delay =
      Math.floor(
        Math.random() *
        (timing.max - timing.min + 1)
      ) + timing.min;

    const timer = setTimeout(() => {

      const newCommand =
        generateCommand(
          difficulty,
          mode
        );

      setCombination(newCommand);

      setCombinationId(
        previousId =>
          previousId + 1
      );

      playSound("combination");

    }, delay);

    return () =>
      clearTimeout(timer);

  }, [
    phase,
    difficulty,
    mode,
    combinationId
  ]);


  /*
   * REST TIMER
   */

  useEffect(() => {

    if (phase !== "rest") {
      return;
    }

    if (timeLeft <= 0) {

      setRound(
        previousRound =>
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
        previousTime =>
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
   * COMPLETION SCREEN
   */

  if (phase === "complete") {

    return (
      <div className="complete-screen">

        <div className="complete-icon">
          🥊
        </div>

        <h1 className="complete-title">
          TRAINING COMPLETE
        </h1>

        <p className="complete-subtitle">
          Session finished. Great work.
        </p>

        <div className="session-summary">

          <div className="summary-item">
            <span>Difficulty</span>
            <strong>
              {difficulty}
            </strong>
          </div>

          <div className="summary-item">
            <span>Mode</span>
            <strong>
              {mode}
            </strong>
          </div>

          <div className="summary-item">
            <span>Stance</span>
            <strong>
              {stance}
            </strong>
          </div>

          <div className="summary-item">
            <span>Rounds</span>
            <strong>
              {rounds}
            </strong>
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
    );
  }


  /*
   * COUNTDOWN SCREEN
   */

  if (phase === "countdown") {

    return (
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
    );
  }


  /*
   * ROUND INTRO SCREEN
   */

  if (phase === "roundIntro") {

    return (
      <div className="round-intro">

        <div className="round-intro-label">
          ROUND
        </div>

        <div className="round-intro-number">
          {round}
        </div>

      </div>
    );
  }


  /*
   * REST SCREEN
   */

  if (phase === "rest") {

    return (
      <div className="rest-screen">

        <div className="rest-title">
          REST
        </div>

        <div className="rest-timer">
          {timeLeft}
        </div>

        <div className="rest-message">
          Recover. Get ready for the next round.
        </div>

      </div>
    );
  }


  /*
   * TRAINING SCREEN
   */

  return (
    <div className="training-screen">

      <div className="round-info">

        <div className="round-number">
          ROUND {round} / {rounds}
        </div>

        <div className="timer">
          {timeLeft}
        </div>

      </div>

      <div
        key={combinationId}
        className="training-command"
      >
        {formatCommand(
          combination,
          stance
        )}
      </div>

    </div>
  );
}


export default TrainingScreen;
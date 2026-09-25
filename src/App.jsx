import { useState } from "react";
import { unlockAudio } from "./audioEngine";
import TrainingSetup from "./TrainingSetup";
import TrainingScreen from "./TrainingScreen";
import Statistics from "./Statistics";
import "./App.css";

function App() {
  const [trainingStarted, setTrainingStarted] =
    useState(false);

  const [showStatistics, setShowStatistics] =
    useState(false);

  const [trainingSettings, setTrainingSettings] =
    useState({
      difficulty: null,
      mode: null,
      stance: null,
      rounds: null
    });

  const [statistics, setStatistics] =
    useState({
      totalSessions: 0,
      totalRounds: 0,
      totalTrainingSeconds: 0,

      difficulties: {
        Beginner: 0,
        Intermediate: 0,
        Advanced: 0
      },

      modes: {
        Defence: 0,
        Offence: 0,
        Both: 0
      },

      stances: {
        Orthodox: 0,
        Southpaw: 0
      }
    });

  function startTraining(settings) {
    unlockAudio();

    setTrainingSettings(settings);
    setTrainingStarted(true);
    setShowStatistics(false);
  }

  function completeTraining() {
    const {
      difficulty,
      mode,
      stance,
      rounds
    } = trainingSettings;

    const roundDuration = {
      Beginner: 30,
      Intermediate: 45,
      Advanced: 60
    };

    const restDuration = 30;

    const trainingSeconds =
      roundDuration[difficulty] * rounds +
      restDuration * (rounds - 1);

    setStatistics(previous => ({
      ...previous,

      totalSessions:
        previous.totalSessions + 1,

      totalRounds:
        previous.totalRounds + rounds,

      totalTrainingSeconds:
        previous.totalTrainingSeconds +
        trainingSeconds,

      difficulties: {
        ...previous.difficulties,

        [difficulty]:
          previous.difficulties[difficulty] + 1
      },

      modes: {
        ...previous.modes,

        [mode]:
          previous.modes[mode] + 1
      },

      stances: {
        ...previous.stances,

        [stance]:
          previous.stances[stance] + 1
      }
    }));
  }

  function backToSetup() {
    setTrainingStarted(false);
    setShowStatistics(false);
  }

  function openStatistics() {
    setShowStatistics(true);
    setTrainingStarted(false);
  }

  function backFromStatistics() {
    setShowStatistics(false);
  }

  return (
    <div className="app">

      {showStatistics && (
        <Statistics
          statistics={statistics}
          onBack={backFromStatistics}
        />
      )}

      {!trainingStarted &&
        !showStatistics && (
          <>
            <h1>
              Boxing Reaction Trainer
            </h1>

            <p>
              Train your reactions. Improve your boxing.
            </p>

            <TrainingSetup
              title="Choose Your Training"
              onStartTraining={startTraining}
            />

     <button
  className="statistics-button"
  onClick={openStatistics}
>
  VIEW STATISTICS
</button>
          </>
        )}

      {trainingStarted && (
        <TrainingScreen
          difficulty={
            trainingSettings.difficulty
          }

          mode={
            trainingSettings.mode
          }

          stance={
            trainingSettings.stance
          }

          rounds={
            trainingSettings.rounds
          }

          onBackToSetup={backToSetup}

          onTrainingComplete={
            completeTraining
          }
        />
      )}

    </div>
  );
}

export default App;
import { useState } from 'react';

function TrainingSetup({ title, onStartTraining }) {

  const difficulties = [
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  const modes = [
    "Defence",
    "Offence",
    "Both"
  ];

  const stances = [
    "Orthodox",
    "Southpaw"
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedStance, setSelectedStance] = useState(null);

  function handleStartTraining() {

    const settings = {
      difficulty: selectedDifficulty,
      mode: selectedMode,
      stance: selectedStance
    };

    onStartTraining(settings);
  }

  return (
    <div>

      <h2>{title}</h2>

      <h2>Difficulty</h2>

      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          className={
            selectedDifficulty === difficulty
              ? "selected"
              : ""
          }
          onClick={() => setSelectedDifficulty(difficulty)}
        >
          {difficulty}
        </button>
      ))}

      <h2>Training Mode</h2>

      {modes.map((mode) => (
        <button
          key={mode}
          className={
            selectedMode === mode
              ? "selected"
              : ""
          }
          onClick={() => setSelectedMode(mode)}
        >
          {mode}
        </button>
      ))}

      <h2>Stance</h2>

      {stances.map((stance) => (
        <button
          key={stance}
          className={
            selectedStance === stance
              ? "selected"
              : ""
          }
          onClick={() => setSelectedStance(stance)}
        >
          {stance}
        </button>
      ))}

      <div className="start-container">
        <button
          className="start-button"
          onClick={handleStartTraining}
          disabled={
            !selectedDifficulty ||
            !selectedMode ||
            !selectedStance
          }
        >
          Start Training
        </button>
      </div>

    </div>
  );
}

export default TrainingSetup;
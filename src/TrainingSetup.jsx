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

  const roundOptions = [3, 5, 8, 10];

  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedStance, setSelectedStance] = useState(null);

  const [selectedRounds, setSelectedRounds] = useState(null);

  const [customSelected, setCustomSelected] = useState(false);
  const [customRounds, setCustomRounds] = useState("");

  function selectRound(rounds) {
    setSelectedRounds(rounds);
    setCustomSelected(false);
    setCustomRounds("");
  }

  function selectCustom() {
    setCustomSelected(true);
    setSelectedRounds(null);
    setCustomRounds("");
  }

  function handleCustomRoundsChange(event) {

    const value = event.target.value;

    setCustomRounds(value);

    const rounds = Number(value);

    if (value === "") {
      setSelectedRounds(null);
    } else if (rounds >= 1 && rounds <= 20) {
      setSelectedRounds(rounds);
    }
  }

  function handleStartTraining() {

    onStartTraining({
      difficulty: selectedDifficulty,
      mode: selectedMode,
      stance: selectedStance,
      rounds: selectedRounds
    });
  }

  const canStart =
    selectedDifficulty &&
    selectedMode &&
    selectedStance &&
    selectedRounds >= 1 &&
    selectedRounds <= 20;

  return (
    <div>

      <h2>{title}</h2>

      <h2>Difficulty</h2>

      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          className={selectedDifficulty === difficulty ? "selected" : ""}
          onClick={() => setSelectedDifficulty(difficulty)}
        >
          {difficulty}
        </button>
      ))}

      <h2>Training Mode</h2>

      {modes.map((mode) => (
        <button
          key={mode}
          className={selectedMode === mode ? "selected" : ""}
          onClick={() => setSelectedMode(mode)}
        >
          {mode}
        </button>
      ))}

      <h2>Stance</h2>

      {stances.map((stance) => (
        <button
          key={stance}
          className={selectedStance === stance ? "selected" : ""}
          onClick={() => setSelectedStance(stance)}
        >
          {stance}
        </button>
      ))}

      <h2>Rounds</h2>

      {roundOptions.map((rounds) => (
        <button
          key={rounds}
          className={
            !customSelected && selectedRounds === rounds
              ? "selected"
              : ""
          }
          onClick={() => selectRound(rounds)}
        >
          {rounds}
        </button>
      ))}

      <button
        className={customSelected ? "selected" : ""}
        onClick={selectCustom}
      >
        Custom
      </button>

      {/* Custom input stays visible whenever Custom is selected */}
      {customSelected && (
        <div className="custom-rounds">

          <input
            type="number"
            min="1"
            max="20"
            placeholder="Enter rounds"
            value={customRounds}
            onChange={handleCustomRoundsChange}
          />

        </div>
      )}

      <div className="start-container">

        <button
          className="start-button"
          onClick={handleStartTraining}
          disabled={!canStart}
        >
          Start Training
        </button>

      </div>

    </div>
  );
}

export default TrainingSetup;
function Statistics({ statistics, onBack }) {
  const {
    totalSessions,
    totalRounds,
    totalTrainingSeconds,
    difficulties,
    modes,
    stances
  } = statistics;

  const minutes = Math.floor(
    totalTrainingSeconds / 60
  );

  const seconds = String(
    totalTrainingSeconds % 60
  ).padStart(2, "0");

  return (
    <div className="statistics-screen">

      <div className="statistics-title">
        🥊 TRAINING STATISTICS
      </div>

      <div className="statistics-summary">

        <div className="stat-card">
          <div className="stat-label">
            TOTAL SESSIONS
          </div>

          <div className="stat-value">
            {totalSessions}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            TOTAL ROUNDS
          </div>

          <div className="stat-value">
            {totalRounds}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            TOTAL TRAINING TIME
          </div>

          <div className="stat-value">
            {minutes}:{seconds}
          </div>
        </div>

      </div>

      <div className="statistics-sections">

        <div className="statistics-section">
          <h3>DIFFICULTY</h3>

          <p>
            Beginner: {difficulties.Beginner}
          </p>

          <p>
            Intermediate: {difficulties.Intermediate}
          </p>

          <p>
            Advanced: {difficulties.Advanced}
          </p>
        </div>

        <div className="statistics-section">
          <h3>MODE</h3>

          <p>
            Defence: {modes.Defence}
          </p>

          <p>
            Offence: {modes.Offence}
          </p>

          <p>
            Both: {modes.Both}
          </p>
        </div>

        <div className="statistics-section">
          <h3>STANCE</h3>

          <p>
            Orthodox: {stances.Orthodox}
          </p>

          <p>
            Southpaw: {stances.Southpaw}
          </p>
        </div>

      </div>

      <button
        className="start-button"
        onClick={onBack}
      >
        BACK TO TRAINING
      </button>

    </div>
  );
}

export default Statistics;
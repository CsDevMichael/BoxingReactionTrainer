import { useState } from 'react';
import TrainingSetup from './TrainingSetup';
import TrainingScreen from './TrainingScreen';
import './App.css';

function App() {

  const [trainingStarted, setTrainingStarted] = useState(false);

  const [trainingSettings, setTrainingSettings] = useState({
    difficulty: null,
    mode: null,
    stance: null
  });

  function startTraining(settings) {
    setTrainingSettings(settings);
    setTrainingStarted(true);
  }

  return (
    <div className="app">

      <h1>Boxing Reaction Trainer</h1>

      <p>Train your reactions. Improve your boxing.</p>

      {!trainingStarted && (
        <TrainingSetup
          title="Choose Your Training"
          onStartTraining={startTraining}
        />
      )}

      {trainingStarted && (
        <TrainingScreen
          difficulty={trainingSettings.difficulty}
          mode={trainingSettings.mode}
          stance={trainingSettings.stance}
        />
      )}

    </div>
  );
}

export default App;
const sounds = {
  countdown: new Audio(),
  start: new Audio(),
  combination: new Audio(),
  rest: new Audio(),
  complete: new Audio()
};

// Generate a tiny WAV beep in memory
function createBeep(frequency, duration) {
  const sampleRate = 44100;
  const samples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);

  function writeString(offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");

  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);

  writeString(36, "data");
  view.setUint32(40, samples * 2, true);

  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;

    const envelope =
      Math.min(1, time * 100) *
      Math.min(1, (duration - time) * 100);

    const value =
      Math.sin(2 * Math.PI * frequency * time) *
      0.25 *
      envelope;

    view.setInt16(44 + i * 2, value * 32767, true);
  }

  return new Blob([buffer], {
    type: "audio/wav"
  });
}

function setupSounds() {
  const urls = {
    countdown: URL.createObjectURL(
      createBeep(600, 0.12)
    ),

    start: URL.createObjectURL(
      createBeep(900, 0.25)
    ),

    combination: URL.createObjectURL(
      createBeep(700, 0.18)
    ),

    rest: URL.createObjectURL(
      createBeep(400, 0.35)
    ),

    complete: URL.createObjectURL(
      createBeep(800, 0.5)
    )
  };

  Object.keys(sounds).forEach(type => {
    sounds[type].src = urls[type];
    sounds[type].preload = "auto";
  });
}

setupSounds();

export function unlockAudio() {
  Object.values(sounds).forEach(audio => {
    audio.load();
  });
}

export function playSound(type) {
  const audio = sounds[type];

  if (!audio) {
    return;
  }

  audio.pause();
  audio.currentTime = 0;

  const playPromise = audio.play();

  if (playPromise) {
    playPromise.catch(() => {});
  }
}
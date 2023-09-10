let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceselect = document.querySelector("select");
const button = document.querySelector("button");
const speedControl = document.querySelector("#speed-control"); // Add an input for speed control

// Register the event handler before fetching voices
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  // Populate the voice select dropdown with available voices
  voiceselect.innerHTML = ""; // Clear previous options
  voices.forEach((voice, i) => {
    voiceselect.options[i] = new Option(voice.name, i);
  });

  // Set a default voice if available (e.g., first voice in the list)
  if (voices.length > 0) {
    speech.voice = voices[0];
  }
};

voiceselect.addEventListener("change", () => {
  // Update the selected voice when the user chooses a voice from the dropdown
  speech.voice = voices[voiceselect.value];

  // Manually update the selected option's label to match the chosen voice
  voiceselect.options[voiceselect.selectedIndex].text = speech.voice.name;
});

speedControl.addEventListener("input", () => {
  // Update the speech rate (speed) when the user adjusts the slider
  const rate = parseFloat(speedControl.value);
  speech.rate = rate;
  document.querySelector("#speed-label").textContent = `Speed: ${rate.toFixed(1)}`;
});

button.addEventListener("click", () => {
  const textarea = document.querySelector("textarea");
  const text = textarea.value.trim();

  // Check if there is text entered
  if (text !== "") {
    speech.text = text;

    // Disable the button while speaking
    button.disabled = true;

    // Speak the text
    window.speechSynthesis.speak(speech);

    // Enable the button when speaking finishes
    speech.onend = () => {
      button.disabled = false;
    };
  } else {
    console.error("Please enter text to speak.");
  }
});

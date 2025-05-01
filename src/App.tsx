import { initializeApp } from "firebase/app";
import "./App.css";

import ChordForm, { FormData } from "./components/ChordForm";
import FretBoard from "./components/FretBoard";
import { firebaseConfig } from "./firebaseConfig";
import { useValidNotes } from "./hooks/useValidNotes";

// Initialize Firebase with the provided configuration
initializeApp(firebaseConfig);

/**
 * The main application component.
 * Manages the state of the chord and valid notes using the `useValidNotes` hook.
 */
function App() {
  const { setChord, currentValidNotes } = useValidNotes();

  /**
   * Handles form submission by updating the chord state.
   * @param data - The form data containing the chord input.
   */
  const handleSubmit = (data: FormData) => {
    setChord(data.chord);
  };

  return (
    <>
      {/* Form for inputting chords */}
      <ChordForm onSubmit={handleSubmit} />

      {/* Fretboard visualization of valid notes */}
      <FretBoard validNotes={currentValidNotes} />
    </>
  );
}

export default App;

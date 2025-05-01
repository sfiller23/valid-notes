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
  const { currentValidNotes, resetValidNotes, getNotes } = useValidNotes();

  /**
   * Handles form submission by updating the chord state.
   * @param data - The form data containing the chord input.
   */
  const handleSubmit = (data: FormData) => {
    getNotes(data.chord);
  };

  return (
    <div id="app-container">
      {/* Form for inputting chords */}
      <ChordForm onSubmit={handleSubmit} resetValidNotes={resetValidNotes} />

      {/* Fret board visualization of valid notes */}
      <FretBoard validNotes={currentValidNotes} />
    </div>
  );
}

export default App;

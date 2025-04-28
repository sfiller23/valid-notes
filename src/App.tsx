import { initializeApp } from "firebase/app";
import "./App.css";

import ChordForm from "./components/ChordForm";
import FretBoard from "./components/FretBoard";
import { firebaseConfig } from "./firebaseConfig";
import { useValidNotes } from "./hooks/useValidNotes";

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  const { setChord, currentValidNotes, getNotes, chord } = useValidNotes();

  return (
    <>
      <ChordForm setChord={setChord} getNotes={getNotes} chord={chord} />

      <FretBoard validNotes={currentValidNotes} />
    </>
  );
}

export default App;

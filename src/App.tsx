import { initializeApp } from "firebase/app";
import "./App.css";

import ChordForm, { FormData } from "./components/ChordForm";
import FretBoard from "./components/FretBoard";
import { firebaseConfig } from "./firebaseConfig";
import { useValidNotes } from "./hooks/useValidNotes";

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  const { setChord, currentValidNotes } = useValidNotes();
  const handleSubmit = (data: FormData) => {
    setChord(data.chord);
  };
  return (
    <>
      <ChordForm onSubmit={handleSubmit} />
      <FretBoard validNotes={currentValidNotes} />
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import {
  CyclicLinkedList,
  Node as Gnode,
  Intervals,
  MusicalScale,
  notes,
} from "./utils/note";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiJC1Xh8vA-tmIbfzJPEdRz21C1UGvwV4",
  authDomain: "valid-notes.firebaseapp.com",
  projectId: "valid-notes",
  storageBucket: "valid-notes.firebasestorage.app",
  messagingSenderId: "1601744131",
  appId: "1:1601744131:web:1e4b87e7620392944e8d36"
};

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  const [chord, setChord] = useState<string>("");
  const [currentValidNotes, setCurrentValidNotes] = useState<Set<string>>(
    new Set<string>()
  );

  const numRows = 6;
  const numColumns = 12;

  const tuning: string[] = ["E", "A", "D", "G", "B", "E"];

  const fretBoardNotes = new CyclicLinkedList();

  fretBoardNotes.buildList(notes);

  const currentScaleSchema: Intervals = [2, 2, 1, 2, 2, 2, 1];

  const generateAllScales = () => {
    const allScales: string[][] = [];

    notes.forEach((note) => {
      const scale = new MusicalScale(note, currentScaleSchema);
      allScales.push(scale.getNotes());
    });

    return allScales;
  };

  const allScalesMatrix = generateAllScales();

  const validNotes = new Set<string>();

  const getNotes = () => {
    const currentChord = chord.toUpperCase().split(",");

    const validScales = allScalesMatrix.filter((scale) => {
      return currentChord.every((note) => scale.includes(note));
    });

    validScales.forEach((scale) => {
      scale.forEach((note) => {
        validNotes.add(note);
      });
    });

    setCurrentValidNotes(validNotes);
  };

  const renderGrid = () => {
    const grid = [];

    for (let row = 1; row < numRows + 1; row++) {
      const rowItems = [];
      const currentNode: Gnode | null = fretBoardNotes.getNextNode(
        tuning[row - 1]
      );

      const currentRow = new CyclicLinkedList(currentNode);
      for (let col = numColumns; col > 0; col--) {
        rowItems.push(
          <span key={`${row}-${col}`} className="grid-item">
            <button
              style={{
                backgroundColor: `${
                  currentValidNotes.has(
                    currentRow?.getNodeByIndex(col)?.value as string
                  )
                    ? "green"
                    : "grey"
                }`,
                margin: "5px",
              }}
              type="button"
            >
              <div>{col}</div>
              <div>{currentRow.getNodeByIndex(col)?.value}</div>
            </button>
          </span>
        );
      }

      grid.push(
        <div key={row} className="grid-row">
          {rowItems}
        </div>
      );
    }

    return grid;
  };

  return (
    <>
      <label htmlFor="chord">Please Input Chord Notes : </label>
      <input
        id="chord"
        type="text"
        value={chord}
        onChange={(e) => {
          setChord(e.target.value);
        }}
      />
      <button
        style={{ margin: "5px", backgroundColor: "blue" }}
        onClick={getNotes}
        type="button"
      >
        Get Notes
      </button>
      <div className="grid-container">{renderGrid()}</div>
    </>
  );
}

export default App;

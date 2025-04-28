import { initializeApp } from "firebase/app";
import { useState } from "react";
import "./App.css";

import { MusicalLinkedList } from "./classes/MusicalLinkedList";
import { MusicalScale } from "./classes/MusicalScale";
import { NoteNode } from "./classes/NoteNode";
import Frets from "./components/Frets";
import Note from "./components/Note";
import {
  fretBoardNotes,
  fretsNum,
  majorScaleSchema,
  notes,
  standardTuning,
  stringsNum,
} from "./constants/guitarConst";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

function App() {
  const [chord, setChord] = useState<string>("");
  const [currentValidNotes, setCurrentValidNotes] = useState<Set<string>>(
    new Set<string>()
  );

  const generateAllScales = () => {
    const allScales: string[][] = [];

    notes.forEach((note) => {
      const scale = new MusicalScale(note, majorScaleSchema);
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

  fretBoardNotes.buildList(notes);

  const renderGrid = () => {
    const grid = [];

    for (let string = 1; string < stringsNum + 1; string++) {
      const rowItems = [];
      const firstNote: NoteNode | null = fretBoardNotes.getNextNode(
        standardTuning[string - 1]
      );

      const stringNotes = new MusicalLinkedList(firstNote);
      for (let fret = fretsNum; fret > 0; fret--) {
        rowItems.push(
          <>
            <Note
              string={string}
              fret={fret}
              validNotes={currentValidNotes}
              stringNotes={stringNotes}
            />
            {fret === 1 && (
              <Note
                string={string}
                fret={fret}
                validNotes={currentValidNotes}
                stringNotes={stringNotes}
                isOpenString
              />
            )}
          </>
        );
      }

      grid.push(
        <div key={`${string}num`} className="grid-row">
          {string === 1 && <Frets fretsNum={fretsNum} />}
          {rowItems}
        </div>
      );
    }

    return grid;
  };

  return (
    <>
      <div id="input-header">
        <label htmlFor="chord">
          Please Input Chord Notes <b>separated by a comma</b>:
        </label>
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
      </div>
      <div id="guitar-container">
        <div className="grid-container">{renderGrid()}</div>
        <div id="stopper"></div>
      </div>
    </>
  );
}

export default App;

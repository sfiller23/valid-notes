import { Fragment } from "react";
import { MusicalLinkedList } from "../classes/MusicalLinkedList";
import { NoteNode } from "../classes/NoteNode";
import {
  fretBoardNotes,
  fretsNum,
  notes,
  standardTuning,
  stringsNum,
} from "../constants/guitarConst";
import Frets from "./Frets";
import Note from "./Note";

const FretBoard = (props: { validNotes: Set<string> }) => {
  const { validNotes } = props;
  const renderGrid = () => {
    const grid = [];

    fretBoardNotes.buildList(notes);

    for (let string = 1; string < stringsNum + 1; string++) {
      const rowItems = [];
      const firstNote: NoteNode | null = fretBoardNotes.getNextNode(
        standardTuning[string - 1]
      );

      const stringNotes = new MusicalLinkedList(firstNote);
      for (let fret = fretsNum; fret > 0; fret--) {
        rowItems.push(
          <Fragment key={`${string}-${fret}-fragment`}>
            <Note
              string={string}
              fret={fret}
              validNotes={validNotes}
              stringNotes={stringNotes}
            />
            {fret === 1 && (
              <Note
                string={string}
                fret={fret}
                validNotes={validNotes}
                stringNotes={stringNotes}
                isOpenString
              />
            )}
          </Fragment>
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
    <div id="guitar-container">
      <div className="grid-container">{renderGrid()}</div>
      <div id="stopper"></div>
    </div>
  );
};

export default FretBoard;

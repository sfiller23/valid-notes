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

interface FretBoardProps {
  validNotes: Set<string>; // The set of valid notes to display on the fret board
}

/**
 * A component for rendering a guitar fret board.
 * Displays valid notes based on the provided `validNotes` prop.
 */
const FretBoard = (props: FretBoardProps) => {
  const { validNotes } = props;
  /**
   * Renders the grid of strings and frets for the fret board.
   * @returns An array of JSX elements representing the fret board grid.
   */
  const renderGrid = () => {
    const grid = [];

    fretBoardNotes.buildList(notes);

    for (let string = 1; string < stringsNum + 1; string++) {
      const stringItems = [];
      const firstNote: NoteNode | null = fretBoardNotes.getNextNode(
        standardTuning[string - 1]
      );

      const stringNotes = new MusicalLinkedList(firstNote);
      for (let fret = fretsNum; fret > 0; fret--) {
        stringItems.push(
          <Fragment key={`${string}-${fret}-fragment`}>
            <Note
              string={string}
              fret={fret}
              validNotes={validNotes}
              stringNotes={stringNotes}
            />
            {fret === 1 && ( // The open string notes
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
          {stringItems}
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

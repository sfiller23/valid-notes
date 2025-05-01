import { MusicalLinkedList } from "../classes/MusicalLinkedList";
import {
  guitarOctavesMap,
  guitarOpenStringsMap,
} from "../constants/guitarConst";
import { playGuitarNote } from "../utils/functions";

interface NoteProps {
  string: number; // The string number of the note (1 = highest string)
  fret: number; // The fret number of the note
  validNotes: Set<string>; // The set of valid notes to highlight
  stringNotes: MusicalLinkedList; // The linked list of notes for the string
  isOpenString?: boolean; // Whether the note is an open string
}

/**
 * A component for rendering a single note on the fretboard.
 * Highlights the note if it is part of the valid notes and plays the note sound when clicked.
 */
const Note = (props: NoteProps) => {
  const { string, fret, validNotes, stringNotes, isOpenString } = props;

  /**
   * Determines the CSS class for the note based on whether it is valid.
   * If the note is in the `validNotes` set, it is marked as "valid"; otherwise, "not-valid".
   */
  const classString = validNotes.has(
    stringNotes?.getNodeByIndex(fret)?.value as string
  )
    ? "valid"
    : "not-valid";

  /**
   * Constructs the sound string for the note to be played.
   * - For open strings, it uses the `guitarOpenStringsMap` to determine the octave.
   * - For fretted notes, it uses the `guitarOctavesMap` to determine the octave.
   */
  const soundString = isOpenString
    ? `${stringNotes.getNodeByIndex(fret + 11)?.value}${
        guitarOpenStringsMap[fret - 1]
      }`
    : `${stringNotes.getNodeByIndex(fret)?.value}${
        guitarOctavesMap[string - 1][fret - 1]
      }`;

  return (
    <span
      className={!isOpenString ? "grid-item" : "grid-item open-strings"} // Apply different styles for open strings
    >
      <span id="string"></span>
      <button
        className={`guitar-button ${classString}`} // Apply the valid/not-valid class
        type="button"
        onClick={() => playGuitarNote(soundString)} // Play the note sound when clicked
      >
        <div>
          {/* Display the note value */}
          {stringNotes.getNodeByIndex(isOpenString ? fret + 11 : fret)?.value}
        </div>
      </button>
    </span>
  );
};

export default Note;

import { MusicalLinkedList } from "../classes/MusicalLinkedList";
import {
  guitarOctavesMap,
  guitarOpenStringsMap,
} from "../constants/guitarConst";
import { playGuitarNote } from "../utils/functions";

interface NoteProps {
  string: number;
  fret: number;
  validNotes: Set<string>;
  stringNotes: MusicalLinkedList;
  isOpenString?: boolean;
}

const Note = (props: NoteProps) => {
  const { string, fret, validNotes, stringNotes, isOpenString } = props;

  const soundString = isOpenString
    ? `${stringNotes.getNodeByIndex(fret + 11)?.value}${
        guitarOpenStringsMap[fret - 1]
      }`
    : `${stringNotes.getNodeByIndex(fret)?.value}${
        guitarOctavesMap[string - 1][fret - 1]
      }`;
  return (
    <span
      key={`${string}-${fret}`}
      className={!isOpenString ? "grid-item" : "grid-item open-strings"}
    >
      <span id="string"></span>
      <button
        className="guitar-button"
        style={{
          backgroundColor: `${
            validNotes.has(stringNotes?.getNodeByIndex(fret)?.value as string)
              ? "green"
              : "grey"
          }`,
          margin: "5px",
          opacity: 0.6,
        }}
        type="button"
        onClick={() => playGuitarNote(soundString)}
      >
        <div>
          {stringNotes.getNodeByIndex(isOpenString ? fret + 11 : fret)?.value}
        </div>
      </button>
    </span>
  );
};

export default Note;

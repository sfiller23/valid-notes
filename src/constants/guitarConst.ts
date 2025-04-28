import { MusicalLinkedList } from "../classes/MusicalLinkedList";

export const notes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];
export const standardTuning: string[] = ["E", "A", "D", "G", "B", "E"];

export const majorScaleSchema: number[] = [2, 2, 1, 2, 2, 2, 1];

export const guitarOctavesMap = [
  [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3],
  [2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4],
  [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5],
];

export const guitarOpenStringsMap = [2, 2, 3, 3, 3, 4];

export const stringsNum = 6;
export const fretsNum = 12;

export const fretBoardNotes = new MusicalLinkedList();

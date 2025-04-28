import { notes } from "../constants/guitarConst";

export class MusicalScale {
  private root: string;
  private intervals: number[];
  private notes: string[];

  constructor(root: string, intervals: number[]) {
    let currentIndex = notes.indexOf(root);
    const scaleNotes = [
      root,
      ...intervals.map((interval) => {
        const noteIndex = (currentIndex + interval) % notes.length;
        currentIndex = noteIndex;
        return notes[noteIndex];
      }),
    ];
    scaleNotes.pop();
    this.notes = scaleNotes;
    this.root = root;
    this.intervals = intervals;
  }

  getNotes(): string[] {
    return this.notes;
  }

  getRoot(): string {
    return this.root;
  }

  getIntervals(): number[] {
    return this.intervals;
  }

  // for future use:
  //   addNote(note: Note): void {
  //     this.notes.push(note);
  //   }

  //   removeNoteAtIndex(index: number): void {
  //     this.notes.splice(index, 1);
  //   }

  //   getNoteAtIndex(index: number): Note {
  //     return this.notes[index];
  //   }

  //   getNoteCount(): number {
  //     return this.notes.length;
  //   }

  //   getFrequencies(): number[] {
  //     return this.notes.map((note) => note.getFrequency());
  //   }

  //   getDurations(): number[] {
  //     return this.notes.map((note) => note.getDuration());
  //   }

  //   getVolumes(): number[] {
  //     return this.notes.map((note) => note.getVolume());
  //   }

  //   getSustains(): { volume: number; duration: number }[] {
  //     return this.notes.map((note) => note.getSustain());
  //   }
}

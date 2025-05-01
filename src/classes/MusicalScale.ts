import { notes } from "../constants/guitarConst";

/**
 * Represents a musical scale.
 * A musical scale is defined by a root note and a schema of intervals
 * that determine the notes in the scale.
 */
export class MusicalScale {
  private root: string; // The root note of the scale (e.g., "C")
  private intervals: number[]; // The intervals defining the scale (e.g., major scale schema)
  private notes: string[]; // The notes in the scale, derived from the root and intervals

  /**
   * Initializes a musical scale with a root note and intervals.
   * @param root - The root note of the scale (e.g., "C").
   * @param intervals - An array of intervals defining the scale (e.g., [2, 2, 1, 2, 2, 2, 1] for a major scale).
   */
  constructor(root: string, intervals: number[]) {
    let currentIndex = notes.indexOf(root); // Find the index of the root note in the notes array

    // Generate the notes of the scale based on the intervals
    const scaleNotes = [
      root, // Start with the root note
      ...intervals.map((interval) => {
        const noteIndex = (currentIndex + interval) % notes.length; // Wrap around using modulo
        currentIndex = noteIndex; // Update the current index for the next interval
        return notes[noteIndex]; // Add the note at the calculated index
      }),
    ];

    scaleNotes.pop(); // Remove the duplicate root note at the end of the scale
    this.notes = scaleNotes; // Assign the generated notes to the class property
    this.root = root; // Set the root note
    this.intervals = intervals; // Set the intervals
  }

  /**
   * Retrieves the notes in the scale.
   * @returns An array of notes in the scale.
   */
  getNotes(): string[] {
    return this.notes;
  }

  /**
   * Retrieves the root note of the scale.
   * @returns The root note of the scale.
   */
  getRoot(): string {
    return this.root;
  }

  /**
   * Retrieves the intervals used to construct the scale.
   * @returns An array of intervals defining the scale.
   */
  getIntervals(): number[] {
    return this.intervals;
  }

  // Future methods for extended functionality:

  // /**
  //  * Adds a new note to the scale.
  //  * @param note - The note to add.
  //  */
  // addNote(note: Note): void {
  //   this.notes.push(note);
  // }

  // /**
  //  * Removes a note from the scale at the specified index.
  //  * @param index - The index of the note to remove.
  //  */
  // removeNoteAtIndex(index: number): void {
  //   this.notes.splice(index, 1);
  // }

  // /**
  //  * Retrieves the note at the specified index in the scale.
  //  * @param index - The index of the note to retrieve.
  //  * @returns The note at the specified index.
  //  */
  // getNoteAtIndex(index: number): Note {
  //   return this.notes[index];
  // }

  // /**
  //  * Retrieves the total number of notes in the scale.
  //  * @returns The number of notes in the scale.
  //  */
  // getNoteCount(): number {
  //   return this.notes.length;
  // }

  // /**
  //  * Retrieves the frequencies of the notes in the scale.
  //  * @returns An array of frequencies corresponding to the notes in the scale.
  //  */
  // getFrequencies(): number[] {
  //   return this.notes.map((note) => note.getFrequency());
  // }

  // /**
  //  * Retrieves the durations of the notes in the scale.
  //  * @returns An array of durations corresponding to the notes in the scale.
  //  */
  // getDurations(): number[] {
  //   return this.notes.map((note) => note.getDuration());
  // }

  // /**
  //  * Retrieves the volumes of the notes in the scale.
  //  * @returns An array of volumes corresponding to the notes in the scale.
  //  */
  // getVolumes(): number[] {
  //   return this.notes.map((note) => note.getVolume());
  // }

  // /**
  //  * Retrieves the sustain properties (volume and duration) of the notes in the scale.
  //  * @returns An array of objects containing the sustain properties of the notes.
  //  */
  // getSustains(): { volume: number; duration: number }[] {
  //   return this.notes.map((note) => note.getSustain());
  // }
}

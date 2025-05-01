import Soundfont from "soundfont-player";
import { MusicalScale } from "../classes/MusicalScale";
import { majorScaleSchema, notes } from "../constants/guitarConst";

/**
 * Plays a guitar note using the "acoustic_guitar_nylon" soundfont.
 * This function uses the Web Audio API to generate the sound of the note.
 * @param note - The note to play (e.g., "C", "D#", "G").
 * @returns A promise that resolves when the note is played.
 */
export const playGuitarNote = async (note: string): Promise<void> => {
  // Create a new audio context for playing the note
  const audioContext = new (window.AudioContext || window.AudioContext)();

  // Load the acoustic guitar soundfont
  const guitar = await Soundfont.instrument(
    audioContext,
    "acoustic_guitar_nylon"
  );

  // Play the specified note
  guitar.play(note);
};

/**
 * Generates all possible major scales based on the musical notes and the major scale schema.
 * This function iterates over all notes and creates a major scale for each one.
 * @returns An array of arrays, where each inner array represents a major scale.
 */
export const generateAllScales = (): string[][] => {
  const allScales: string[][] = []; // Initialize an empty array to store all scales

  // Iterate over all notes and generate a major scale for each
  notes.forEach((note) => {
    const scale = new MusicalScale(note, majorScaleSchema); // Create a scale with the major schema
    allScales.push(scale.getNotes()); // Add the scale's notes to the list
  });

  return allScales; // Return the array of all generated scales
};

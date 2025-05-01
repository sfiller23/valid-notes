import { useEffect, useState } from "react";
import { generateAllScales } from "../utils/functions";

/**
 * Custom hook for managing and calculating valid musical notes based on a chord.
 * This hook computes valid notes dynamically whenever the chord changes.
 */
export const useValidNotes = () => {
  const [chord, setChord] = useState<string>(""); // The current chord input by the user
  const [currentValidNotes, setCurrentValidNotes] = useState<Set<string>>(
    new Set<string>()
  ); // The set of valid notes based on the chord

  useEffect(() => {
    // Split the chord into individual notes and convert to uppercase for consistency
    const currentChord = chord.toUpperCase().split(",");

    // Generate all possible scales (e.g., major, minor, etc.)
    const allScalesMatrix = generateAllScales();

    const validNotes = new Set<string>();

    // Filter scales that include all notes in the current chord
    const validScales = allScalesMatrix.filter((scale) => {
      return currentChord.every((note) => scale.includes(note));
    });

    // Add all notes from the valid scales to the validNotes set
    validScales.forEach((scale) => {
      scale.forEach((note) => {
        validNotes.add(note);
      });
    });

    // Update the state with the computed valid notes
    setCurrentValidNotes(validNotes);
  }, [chord]); // Recompute valid notes whenever the chord changes

  return { setChord, currentValidNotes }; // Expose the setter and the computed notes
};

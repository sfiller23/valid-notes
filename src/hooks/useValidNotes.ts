import { useCallback, useState } from "react";
import { generateAllScales } from "../utils/functions";

export const useValidNotes = () => {
  const [chord, setChord] = useState<string>("");
  const [currentValidNotes, setCurrentValidNotes] = useState<Set<string>>(
    new Set<string>()
  );

  const getNotes = useCallback(() => {
    const currentChord = chord.toUpperCase().split(",");

    const allScalesMatrix = generateAllScales();

    const validNotes = new Set<string>();

    const validScales = allScalesMatrix.filter((scale) => {
      return currentChord.every((note) => scale.includes(note));
    });

    validScales.forEach((scale) => {
      scale.forEach((note) => {
        validNotes.add(note);
      });
    });

    setCurrentValidNotes(validNotes);
  }, [chord]);
  return { setChord, currentValidNotes, getNotes, chord };
};

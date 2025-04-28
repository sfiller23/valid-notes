import { useState } from "react";
import { MusicalScale } from "../classes/MusicalScale";
import { majorScaleSchema, notes } from "../constants/guitarConst";

export const useValidNotes = () => {
  const [chord, setChord] = useState<string>("");
  const [currentValidNotes, setCurrentValidNotes] = useState<Set<string>>(
    new Set<string>()
  );

  const generateAllScales = () => {
    const allScales: string[][] = [];

    notes.forEach((note) => {
      const scale = new MusicalScale(note, majorScaleSchema);
      allScales.push(scale.getNotes());
    });

    return allScales;
  };

  const getNotes = () => {
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
  };
  return { setChord, currentValidNotes, getNotes, chord };
};

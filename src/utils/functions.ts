import Soundfont from "soundfont-player";
import { MusicalScale } from "../classes/MusicalScale";
import { majorScaleSchema, notes } from "../constants/guitarConst";

export const playGuitarNote = async (note: string): Promise<void> => {
  const audioContext = new (window.AudioContext || window.AudioContext)();

  const guitar = await Soundfont.instrument(
    audioContext,
    "acoustic_guitar_nylon"
  );

  guitar.play(note);
};

export const generateAllScales = () => {
  const allScales: string[][] = [];

  notes.forEach((note) => {
    const scale = new MusicalScale(note, majorScaleSchema);
    allScales.push(scale.getNotes());
  });

  return allScales;
};

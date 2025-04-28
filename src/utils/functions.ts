import Soundfont from "soundfont-player";

export const playGuitarNote = async (note: string): Promise<void> => {
  const audioContext = new (window.AudioContext || window.AudioContext)();

  const guitar = await Soundfont.instrument(
    audioContext,
    "acoustic_guitar_nylon"
  );

  guitar.play(note);
};

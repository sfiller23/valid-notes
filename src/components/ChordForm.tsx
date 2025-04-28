import { useCallback, useDeferredValue, useMemo } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  chord: string;
}

interface ChordFormProps {
  setChord: React.Dispatch<React.SetStateAction<string>>;
  getNotes: () => void;
  chord: string;
}

const ChordForm = (props: ChordFormProps) => {
  const { setChord, getNotes, chord } = props;
  const currentChord = useDeferredValue(chord);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setChord(data.chord);
  };

  const getHashedNotes = useCallback(getNotes, [chord]);

  useMemo(() => {
    if (currentChord) {
      getHashedNotes();
    }
  }, [currentChord, getHashedNotes]);

  return (
    <>
      {isSubmitted && errors.chord && (
        <p style={{ color: "red" }}>{errors.chord.message}</p>
      )}
      <div id="input-header">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="chord">
            Please Input Chord Notes <b>separated by a comma</b>:
          </label>
          <input
            id="chord"
            type="text"
            {...register("chord", {
              required: "Chord is required", // Validation rule: required
              pattern: {
                value: /^[A-Ga-g](#|b)?(,\s*[A-Ga-g](#|b)?)*$/, // Updated regex for chords separated by commas
                message:
                  "Invalid chord format. Use notes like A, B, C#, etc., separated by commas.",
              },
            })}
            onChange={() => clearErrors()}
          />
          <button
            style={{ margin: "5px", backgroundColor: "blue" }}
            type="submit"
          >
            Get Notes
          </button>
        </form>
      </div>
    </>
  );
};

export default ChordForm;

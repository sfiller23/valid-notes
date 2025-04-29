import { useEffect } from "react";
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setChord(data.chord);
  };

  useEffect(() => {
    if (chord) {
      getNotes();
    }
  }, [chord, getNotes]);

  return (
    <>
      {isSubmitted && errors.chord && (
        <p id="form-error">{errors.chord.message}</p>
      )}
      <form id="chords-form" onSubmit={handleSubmit(onSubmit)}>
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
        <button id="submit-button" type="submit">
          Get Notes
        </button>
      </form>
    </>
  );
};

export default ChordForm;

import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface FormData {
  chord: string; // Represents the chord input by the user
}

interface ChordFormProps {
  onSubmit: (data: FormData) => void; // Callback for handling form submission
  resetValidNotes: () => void;
}

/**
 * A form component for inputting musical chords.
 * Uses `react-hook-form` for form validation and submission handling.
 */
const ChordForm = (props: ChordFormProps) => {
  const { onSubmit, resetValidNotes } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<FormData>();

  /**
   * Clears validation errors when the input changes.
   */
  const handleChange = () => {
    clearErrors();
  };

  /**
   * Clears fret board on errors.
   */
  useEffect(() => {
    if (errors.chord) {
      resetValidNotes();
    }
  }, [errors.chord, resetValidNotes]);

  return (
    <>
      {/* Display validation errors after form submission */}
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
            required: "Chord is required", // Validation rule: required field
            pattern: {
              value: /^[A-Ga-g](#|b)?(,\s*[A-Ga-g](#|b)?)*$/, // Regex for valid chord format
              message:
                "Invalid chord format. Use notes like A, B, C#, etc., separated by commas.",
            },
          })}
          onChange={handleChange}
        />
        <button id="submit-button" type="submit">
          Get Notes
        </button>
      </form>
    </>
  );
};

export default ChordForm;

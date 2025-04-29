import { useForm } from "react-hook-form";

export interface FormData {
  chord: string;
}

interface ChordFormProps {
  onSubmit: (data: FormData) => void;
}

const ChordForm = (props: ChordFormProps) => {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    clearErrors,
  } = useForm<FormData>();

  const handleChange = () => {
    clearErrors();
  };

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

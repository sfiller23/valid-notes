/**
 * A component for rendering the fret numbers at the top of the fretboard.
 * Displays the fret numbers in descending order, starting from the highest fret.
 */
const Frets = (props: { fretsNum: number }) => {
  const { fretsNum } = props;

  /**
   * Generates the fret number header for the fretboard.
   * Creates a span element for each fret number in descending order.
   * @returns An array of JSX elements representing the fret numbers.
   */
  const guitarHeader = () => {
    const header = [];
    for (let fret = fretsNum; fret > 0; fret--) {
      header.push(
        <span key={fret} className="fret-number-item">
          {fret}
        </span>
      );
    }
    return header;
  };

  return <div className="fret-number">{guitarHeader()}</div>;
};

export default Frets;

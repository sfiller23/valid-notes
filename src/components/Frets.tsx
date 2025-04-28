const Frets = (props: { fretsNum: number }) => {
  const { fretsNum } = props;
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

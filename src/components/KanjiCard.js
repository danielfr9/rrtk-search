import ClipboardCopy from "./ClipboardCopy";

const KanjiCard = ({ kanji }) => {
  return (
    <div className="flex flex-col p-4 border-2 border-dashed hover:border-transparent hover:bg-slate-200 group">
      <div className="flex justify-between">
        <h2 className="font-bold">
          RTK: {`${kanji.rtkNumber ? kanji.rtkNumber : "Primitive Element"}`}
        </h2>
        {kanji.kanjiDesign && <ClipboardCopy value={kanji.kanjiDesign} />}
      </div>
      {kanji.kanjiDesign && (
        <h3 className="text-6xl my-8 text-center">{kanji.kanjiDesign}</h3>
      )}
      <h3 className="capitalize font-semibold my-4">
        {kanji.keywords.primary}
        {kanji.keywords.secondary.length > 0
          ? `; ${kanji.keywords.secondary.join(", ")}`
          : null}
      </h3>
      {kanji.primitiveDesc && <p className="italic">{kanji.primitiveDesc}</p>}
    </div>
  );
};

export default KanjiCard;

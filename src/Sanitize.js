import { useState } from "react/cjs/react.development";
import { rrtk } from "./rrtk-data";

const Sanitize = () => {
  const [data, setData] = useState(rrtk);

  const handleSanitize = () => {
    const result = rrtk.map((kanji) => {
      const keywords = kanji.kanjiKeywords.split(";");
      const primary = keywords[0];
      let arrSecondary = [];

      if (keywords.length > 1)
        arrSecondary = keywords[1].split(",").map((elem) => elem.trim());

      const newKanjiObj = {
        rtkNumber: kanji.rtkNumber,
        kanjiDesign: kanji.kanjiDesign,
        keywords: {
          primary: primary,
          secondary: arrSecondary,
        },
        primitiveDesc: kanji.primitiveDesc,
      };
      return newKanjiObj;
    });

    console.log(rrtk);
    console.log(result);
  };

  return (
    <div>
      <button
        onClick={handleSanitize}
        className="bg-teal-700 p-3 m-4 text-white"
      >
        Sanitize
      </button>
      {data.map((kanji) => (
        <div>
          <h2 className="font-bold">
            RRTK: {`${kanji.rtkNumber ? kanji.rtkNumber : "Primitive Element"}`}
          </h2>
          {kanji.kanjiDesign && (
            <h3 className="text-6xl my-8 text-center">{kanji.kanjiDesign}</h3>
          )}
          <h3 className="capitalize font-semibold my-4">
            {kanji.kanjiKeywords}
          </h3>
          <p className="italic">{kanji.primitiveDesc}</p>
        </div>
      ))}
    </div>
  );
};

export default Sanitize;

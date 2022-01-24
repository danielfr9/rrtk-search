import { BsTranslate } from "react-icons/bs";

const NotFound = () => {
  return (
    <div className="flex flex-col grow justify-center items-center border-2 border-dashed">
      <h1 className="font-semibold text-3xl italic mb-3 text-slate-500">
        No Kanji Found
      </h1>
      <BsTranslate size="4rem" className="text-slate-500" />
    </div>
  );
};

export default NotFound;

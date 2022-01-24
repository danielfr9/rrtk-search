import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { useEffect } from "react/cjs/react.development";

const promptMessage = "Copy the kanji";
const successMessage = "Kanji copied to clipboard!";

const ClipboardCopy = ({ value }) => {
  const [message, setMessage] = useState(promptMessage);

  useEffect(() => {
    setTimeout(() => {
      setMessage(promptMessage);
    }, 2000);
  }, [message]);

  return (
    <div className="relative">
      <BiCopy
        name="copy-to-clipboard"
        size="2rem"
        className="text-slate-300 group-hover:text-slate-800 cursor-pointer peer"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setMessage(successMessage);
        }}
      />
      <span className="absolute whitespace-nowrap rounded top-10 right-0 w-fit p-2 bg-slate-900 text-white opacity-0 peer-hover:opacity-60">
        {message}
      </span>
    </div>
  );
};

export default ClipboardCopy;

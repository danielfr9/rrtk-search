import { Tooltip } from "@mantine/core";
import { FloatingPosition } from "@mantine/core/lib/Floating/types";
import { useClipboard } from "@mantine/hooks";
import { BiCopy } from "react-icons/bi";

interface IProps {
  text: string;
  label: string;
  position?: FloatingPosition;
}

const ClipboardButton = ({ text, label, position = "left" }: IProps) => {
  const clipboard = useClipboard({ timeout: 1500 });

  return (
    <Tooltip
      offset={10}
      label={clipboard.copied ? "Copied" : label}
      // color={clipboard.copied ? "blue" : "cyan"}
      position={position}
      withArrow
      events={{ hover: true, focus: true, touch: true }}
      classNames={{
        tooltip: `${clipboard.copied ? "bg-sky-600" : "bg-blue-600"}`,
      }}
    >
      <button>
        <BiCopy
          onClick={() => clipboard.copy(text)}
          className="w-6 h-6 text-gray-400 cursor-pointer"
        />
      </button>
    </Tooltip>
  );
};

export default ClipboardButton;

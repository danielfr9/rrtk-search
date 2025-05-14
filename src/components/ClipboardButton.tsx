import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CopyIcon } from "lucide-react";

interface IProps {
  text: string;
  label: string;
  position?: "top" | "right" | "bottom" | "left";
}

const ClipboardButton = ({ text, label, position = "top" }: IProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={handleCopy}
          className="p-2"
          aria-label={label}
        >
          <CopyIcon className="w-6 h-6 text-gray-400" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={position}>
        {copied ? "Copied" : label}
      </TooltipContent>
    </Tooltip>
  );
};

export default ClipboardButton;

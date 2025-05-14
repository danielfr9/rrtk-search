import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useClipboard } from "@/hooks/use-clipboard";
import { toast } from "sonner";

interface IProps {
  text: string;
  label: string;
  position?: "top" | "right" | "bottom" | "left";
}

const ClipboardButton = ({ text, label, position = "top" }: IProps) => {
  const clipboard = useClipboard({ timeout: 500 });

  const handleCopy = () => {
    clipboard.copy(text);
    toast.success("Copied to clipboard");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="p-2 cursor-pointer"
          aria-label={label}
        >
          <CopyIcon className="w-6 h-6 text-gray-400" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={position}>
        {clipboard.copied ? "Copied" : label}
      </TooltipContent>
    </Tooltip>
  );
};

export default ClipboardButton;

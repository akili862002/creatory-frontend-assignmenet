import { cn } from "@/utils/classnames.utils";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { CopyIcon, TickIcon } from "./CopyableText.icons";

interface ICopyableTextProps {
  className?: string;
  children: string;
}

const CopyableText: React.FC<ICopyableTextProps> = ({
  className,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(children);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={cn("relative group truncate", className)}>
      {children}
      <button
        type="button"
        className="absolute top-0 bottom-0 right-0 hidden h-full px-2 bg-white group-hover:block"
        onClick={handleCopy}
        title="Copy"
      >
        {copied ? <TickIcon /> : <CopyIcon />}
      </button>
    </div>
  );
};

export default CopyableText;

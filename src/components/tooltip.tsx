import { TbHandClick } from "react-icons/tb";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import React from "react";

type TooltipComponentProps = {
  data: any;
  tooltip: string;
  children: React.ReactNode;
}

export function TooltipComponent(props: TooltipComponentProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex items-center text-lg text-gray-400">
          {props.children}
          <span>
            {props.data}
          </span>
          <TooltipContent>
            {props.tooltip}
          </TooltipContent>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
}
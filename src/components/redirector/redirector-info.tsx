import { LiaLayerGroupSolid } from "react-icons/lia";
import { TooltipComponent } from "../tooltip";
import { TbHandClick } from "react-icons/tb";
import { Redirector } from "@/domain/@types";

type RedirectorInfoProps = {
  redirector: Redirector
}

export function RedirectorInfo({ redirector }: RedirectorInfoProps) {
  return (
    <div className="w-full flex gap-8 items-center">
      <TooltipComponent tooltip="Grupos" data={redirector.groups.length}>
        <LiaLayerGroupSolid />
      </TooltipComponent>
      <TooltipComponent tooltip="Cliques" data={redirector.totalClicks ?? 0}>
        <TbHandClick />
      </TooltipComponent>
    </div>
  );
}
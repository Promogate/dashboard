import { ReactNode } from "react";

type GroupHeaderProps = {
  title: string;
  children: ReactNode;
}

export function GroupHeader({ title, children }: GroupHeaderProps) {
  return (
    <div className="w-full flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
      <div className="flex gap-2 items-center">
        {children}
      </div>
    </div>
  );
}
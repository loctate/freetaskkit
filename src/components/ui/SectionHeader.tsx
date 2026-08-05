import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

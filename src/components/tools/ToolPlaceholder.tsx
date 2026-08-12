interface ToolPlaceholderProps {
  title?: string;
}

export function ToolPlaceholder({
  title = "Tool workspace coming soon",
}: ToolPlaceholderProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
        ⚙
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-950">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
        The reusable FreeTaskKit tool engine is ready. The actual tool logic
        will be added in the next development stage.
      </p>
    </div>
  );
}

import clsx from "clsx";

export function KpiCard({
  label,
  valor,
  sub,
  tone = "default",
  icon,
}: {
  label: string;
  valor: string;
  sub?: string;
  tone?: "default" | "verde" | "amarelo" | "vermelho" | "brand";
  icon?: React.ReactNode;
}) {
  const toneClasses: Record<string, string> = {
    default: "text-slate-900",
    verde: "text-verde",
    amarelo: "text-amber-600",
    vermelho: "text-vermelho",
    brand: "text-brand-500",
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <div className={clsx("mt-1.5 text-2xl font-bold tabular-nums", toneClasses[tone])}>{valor}</div>
      {sub && <div className="mt-0.5 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

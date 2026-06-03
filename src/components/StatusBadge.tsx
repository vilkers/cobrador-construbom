import { Classificacao } from "@/lib/types";
import { labelClassificacao } from "@/lib/format";
import clsx from "clsx";

const styles: Record<Classificacao, string> = {
  verde: "bg-green-100 text-green-800 border-green-200",
  amarelo: "bg-amber-100 text-amber-800 border-amber-200",
  vermelho: "bg-red-100 text-red-800 border-red-200",
  cinza: "bg-gray-100 text-gray-700 border-gray-200",
};

const dot: Record<Classificacao, string> = {
  verde: "bg-verde",
  amarelo: "bg-amarelo",
  vermelho: "bg-vermelho",
  cinza: "bg-cinza",
};

export function StatusBadge({ classificacao }: { classificacao: Classificacao }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[classificacao]
      )}
    >
      <span className={clsx("h-2 w-2 rounded-full", dot[classificacao])} />
      {labelClassificacao[classificacao]}
    </span>
  );
}

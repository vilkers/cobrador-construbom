"use client";

import { useState } from "react";
import { Cliente, Tom } from "@/lib/types";
import { gerarMensagem } from "@/lib/cobranca";
import { telefoneWhatsApp, labelTom } from "@/lib/format";
import { X, Copy, Check, MessageCircle } from "lucide-react";
import clsx from "clsx";

const toms: Tom[] = ["amigavel", "lembrete", "firme"];

export function MensagemModal({
  cliente,
  open,
  onClose,
}: {
  cliente: Cliente;
  open: boolean;
  onClose: () => void;
}) {
  const [tom, setTom] = useState<Tom>(cliente.preferencia.tom);
  const [copiado, setCopiado] = useState(false);

  if (!open) return null;

  const mensagem = gerarMensagem(cliente, tom);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensagem);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = mensagem;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  };

  const whatsappUrl = `https://wa.me/${telefoneWhatsApp(cliente.telefone)}?text=${encodeURIComponent(
    mensagem
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <h3 className="font-semibold text-slate-900">Mensagem de cobrança</h3>
            <p className="text-xs text-slate-500">{cliente.nome}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="mb-1 text-xs font-medium text-slate-600">Tom da mensagem</div>
          <div className="mb-3 flex gap-2">
            {toms.map((t) => (
              <button
                key={t}
                onClick={() => setTom(t)}
                className={clsx(
                  "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition",
                  tom === t
                    ? "border-brand-500 bg-brand-50 text-brand-600"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                {labelTom[t]}
              </button>
            ))}
          </div>

          <textarea
            readOnly
            value={mensagem}
            className="h-64 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-800 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 border-t border-slate-200 p-4">
          <button
            onClick={copiar}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copiado ? <Check className="h-4 w-4 text-verde" /> : <Copy className="h-4 w-4" />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

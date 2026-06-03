import { SEED_CLIENTES } from "@/lib/seed";
import FichaClient from "./FichaClient";

// Gera as páginas das fichas no build (necessário para o site estático).
export function generateStaticParams() {
  return SEED_CLIENTES.map((c) => ({ id: c.id }));
}

export default function FichaPage({ params }: { params: { id: string } }) {
  return <FichaClient id={params.id} />;
}

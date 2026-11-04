// Monta o link do WhatsApp. Sem número (pendente), o link abre o WhatsApp para escolher o contato.
export function linkWhatsApp(mensagem: string, numero: string | null): string {
  const digitos = (numero ?? '').replace(/\D/g, '');
  return `https://wa.me/${digitos}?text=${encodeURIComponent(mensagem)}`;
}

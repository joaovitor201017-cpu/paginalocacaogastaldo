// Número no formato internacional exigido pelo wa.me (55 + DDD + número). Vazio se pendente.
export function numeroWhatsApp(numero: string | null): string {
  const digitos = (numero ?? '').replace(/\D/g, '');
  if (!digitos) return '';
  return digitos.startsWith('55') && digitos.length > 11 ? digitos : `55${digitos}`;
}

// Monta o link do WhatsApp. Sem número (pendente), o link abre o WhatsApp para escolher o contato.
export function linkWhatsApp(mensagem: string, numero: string | null): string {
  return `https://wa.me/${numeroWhatsApp(numero)}?text=${encodeURIComponent(mensagem)}`;
}

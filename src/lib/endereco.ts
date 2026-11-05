// Endereço estruturado (igual ao Google Meu Negócio) e suas formas de exibição
export interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

// "Av. ..., 1395 - Sl 65B - Paraíso"
export const ruaEBairro = (e: Endereco): string => `${e.logradouro} - ${e.bairro}`;

// "Av. ..., 1395 - Sl 65B - Paraíso, Santo André - SP, 09751-000"
export const enderecoCompleto = (e: Endereco): string => `${ruaEBairro(e)}, ${e.cidade} - ${e.uf}, ${e.cep}`;

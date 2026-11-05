// Calcula a altura de uma logo para que logos largas e quadradas tenham peso visual parecido:
// todas ocupam aproximadamente a mesma área (largura × altura), limitada a uma altura máxima.
export function alturaLogo(largura: number, altura: number, { area, max }: { area: number; max: number }): number {
  const proporcao = largura / altura;
  return Math.round(Math.min(max, Math.sqrt(area / proporcao)));
}

/**
 * Configurações iniciais do jogo
 * tabuleiro representa o tabuleiro com uma matriz 3x3
 * quem começar jogando é o jogador "humano"
 */
export default class Configuracao {
  tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  maquina = "O";
  jogador = "X";
  inicia = this.jogador;
}

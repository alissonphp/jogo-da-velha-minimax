import Configuracao from "./configuracao";

export default class Minimax {
  tabuleiro: any;
  configuracao: Configuracao = new Configuracao();

  constructor(tabuleiro: string[]) {
    this.tabuleiro = tabuleiro;
  }

  pesquisarMelhorMovimento() {
    let melhorCenario = -Infinity;
    let movimento;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tabuleiro[i][j] == "") {
          this.tabuleiro[i][j] = this.configuracao.maquina;
          let score = this.minimax(0, false);
          this.tabuleiro[i][j] = "";
          if (score > melhorCenario) {
            melhorCenario = score;
            movimento = { i, j };
          }
        }
      }
    }
    this.tabuleiro[movimento.i][movimento.j] = this.configuracao.maquina;
    currentPlayer = this.configuracao.jogador;
  }

  minimax(profundidade: number, maximizar: boolean) {
    let result = checkWinner();
    if (result !== null) {
      return this.configuracao.pontos[result];
    }

    if (maximizar) {
      let melhorCenario = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.tabuleiro[i][j] == "") {
            this.tabuleiro[i][j] = this.configuracao.maquina;
            let score = this.minimax(profundidade + 1, false);
            this.tabuleiro[i][j] = "";
            melhorCenario = Math.max(score, melhorCenario);
          }
        }
      }
      return melhorCenario;
    } else {
      let melhorCenario = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.tabuleiro[i][j] == "") {
            this.tabuleiro[i][j] = this.configuracao.jogador;
            let score = this.minimax(profundidade + 1, true);
            this.tabuleiro[i][j] = "";
            melhorCenario = Math.min(score, melhorCenario);
          }
        }
      }
      return melhorCenario;
    }
  }
}

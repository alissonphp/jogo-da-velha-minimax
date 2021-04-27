import Configuracao from "./configuracao";
import VerificarVitoria from "./verificar-vitoria";

export default class Minimax {
  tabuleiro: any;
  configuracao: Configuracao = new Configuracao();
  verificador: VerificarVitoria;

  constructor(tabuleiro: string[][]) {
    this.tabuleiro = tabuleiro;
    this.verificador = new VerificarVitoria(this.tabuleiro);
  }

  pesquisarMelhorMovimento() {
    let melhorCenario = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tabuleiro[i][j] == "") {
          this.tabuleiro[i][j] = this.configuracao.maquina;
          let score = this.minimax(0, false);
          this.tabuleiro[i][j] = "";
          if (score > melhorCenario) {
            melhorCenario = score;
            this.tabuleiro[i][j] = this.configuracao.maquina;
          }
        }
      }
    }
  }

  minimax(profundidade: number, maximizar: boolean) {
    const checarGanhador: string = this.verificador.verificar();
    if (checarGanhador !== null) {
      if (checarGanhador == "X") {
        return -10;
      } else if (checarGanhador == "0") {
        return 10;
      } else {
        return 0;
      }
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

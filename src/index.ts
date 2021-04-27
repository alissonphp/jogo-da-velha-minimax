import { Command, flags } from "@oclif/command";
import cli from "cli-ux";

import Configuracao from "./lib/configuracao";
import Minimax from "./lib/minimax";

class JogoDaVelha extends Command {
  static description =
    "Jogo da velha aplicando o algoritimo minimax para a disciplina de Estruturas de Dados Avançadas";

  nome: string = "";

  configuracao = new Configuracao();
  tabuleiro = this.configuracao.tabuleiro;
  jogada: string = this.configuracao.jogador;

  static flags = {
    version: flags.version({ char: "v" }),
    ajuda: flags.help({ char: "h" }),
  };

  static args = [{ name: "jogar" }];

  async run() {
    const { args } = this.parse(JogoDaVelha);

    if (args.jogar === "jogar") {
      this.log("Vamos começar!!");
      this.nome = await cli.prompt("Qual o seu nome jogador(a)?");
      this.log(
        `Beleza ${this.nome}, pra começar deixa eu te mostrar o tabuleiro`
      );
      console.table(this.tabuleiro);
      this.log(
        "Você começa jogando! Para marcar uma posição no tabuleiro, informe a coordenada X,Y. Exemplo: 1,1 para marcar no centro"
      );
      await this.turno();
    }
  }

  async turno() {
    if (this.jogada == this.configuracao.jogador) {
      const movimento = await cli.prompt("Qual a sua jogada?");
      const i = parseInt(movimento.split(",")[0]);
      const j = parseInt(movimento.split(",")[1]);

      if (this.tabuleiro[i][j] == "") {
        this.tabuleiro[i][j] = this.configuracao.jogador;
        this.jogada = this.configuracao.maquina;

        const minimax: Minimax = new Minimax(this.tabuleiro);
        minimax.pesquisarMelhorMovimento();
        this.tabuleiro = minimax.tabuleiro;
        this.jogada = this.configuracao.jogador;
        
      } else {
        console.error("Jogada não disponível, tente outra posição!");
      }
      console.table(this.tabuleiro);
      await this.turno();
    }
  }
}

export = JogoDaVelha;

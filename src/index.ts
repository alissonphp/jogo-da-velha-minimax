import { Command, flags } from "@oclif/command";
import cli from "cli-ux";
import * as notifier from "node-notifier";

import Configuracao from "./lib/configuracao";
import VerificarVitoria from "./lib/verificar-vitoria";

class JogoDaVelha extends Command {
  static description =
    "Jogo da velha aplicando o algoritimo minimax para a disciplina de Estruturas de Dados Avançadas";

  nome: string = "";

  configuracao = new Configuracao();

  static flags = {
    version: flags.version({ char: "v" }),
    ajuda: flags.help({ char: "h" }),
  };

  static args = [{ name: "jogar" }];

  async run() {
    const { args } = this.parse(JogoDaVelha);

    if (args.jogar) {
      this.log("Vamos começar!!");
      this.nome = await cli.prompt("Qual o seu nome jogador(a)?");
      this.log(
        `Beleza ${this.nome}, pra começar deixa eu te mostrar o tabuleiro`
      );
      console.table(this.configuracao.tabuleiro);
      this.log(
        "Você começa jogando! Para marcar uma posição no tabuleiro, informe a coordenada X,Y. Exemplo: 1,1 para marcar no centro"
      );
      const move = await cli.prompt("Qual a sua jogada?");
    }
  }
}

export = JogoDaVelha;

export default class VerificarVitoria {
  ganhador: string = "";
  espacos: number = 0;
  tabuleiro: string[];

  constructor(tabuleiro: string[]) {
    this.tabuleiro = tabuleiro;
  }

  verificar(): string {
    this.linha();
    this.coluna();
    this.diagonal();
    this.verificarEspacos();
    return this.ganhadorOuEmpate();
  }

  condicaoBase(a: string, b: string, c: string): boolean {
    return (a != "" || a != undefined) && a == b && b == c;
  }

  //verificando se em alguma das 3 linhas da matriz existem elementos iguais
  linha(): void {
    for (let i = 0; i < 3; ++i) {
      if (
        this.condicaoBase(
          this.tabuleiro[i][0],
          this.tabuleiro[i][1],
          this.tabuleiro[i][2]
        )
      ) {
        this.ganhador = this.tabuleiro[i][0];
      }
    }
  }

  //verificando se em alguma das 3 colunas da matriz existem elementos iguais
  coluna(): void {
    for (let i = 0; i < 3; ++i) {
      if (
        this.condicaoBase(
          this.tabuleiro[0][i],
          this.tabuleiro[1][i],
          this.tabuleiro[2][i]
        )
      ) {
        this.ganhador = this.tabuleiro[0][i];
      }
    }
  }

  //verificando se em alguma das 2 diagonais possíveis da matriz existem elementos iguais
  diagonal(): void {
    //primeira diagonal
    if (
      this.condicaoBase(
        this.tabuleiro[0][0],
        this.tabuleiro[1][1],
        this.tabuleiro[2][2]
      )
    ) {
      this.ganhador = this.tabuleiro[0][0];
    }

    //segunda diagonal
    if (
      this.condicaoBase(
        this.tabuleiro[2][0],
        this.tabuleiro[1][1],
        this.tabuleiro[0][2]
      )
    ) {
      this.ganhador = this.tabuleiro[2][0];
    }
  }

  //verifica quantos espaços vazios ainda existem na matriz (opções de jogada)
  verificarEspacos(): void {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.tabuleiro[i][j] == "") {
          this.espacos++;
        }
      }
    }
  }

  //verifica se, ao esgotar as opções, temos um vencedor ou um empate entre o jogador e a máquina
  ganhadorOuEmpate(): string {
    return this.ganhador == "" && this.espacos == 0 ? "empatou" : this.ganhador;
  }
}

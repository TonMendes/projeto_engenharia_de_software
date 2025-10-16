class Game {
  constructor({ id, nome, desenvolvedor, anoLancamento, plataforma, status, imagemCapa }) {
    this.id = id;
    this.nome = nome;
    this.desenvolvedor = desenvolvedor || null;
    this.anoLancamento = anoLancamento || null;
    this.plataforma = plataforma;
    this.status = status;
    this.imagemCapa = imagemCapa || null;
  }

  static validate(data) {
    const errors = [];

    if (!data.nome || data.nome.trim() === '') {
      errors.push('Nome é obrigatório');
    }

    if (!data.plataforma || data.plataforma.trim() === '') {
      errors.push('Plataforma é obrigatória');
    }

    if (!data.status || data.status.trim() === '') {
      errors.push('Status é obrigatório');
    }

    const validStatuses = ['Jogando', 'Finalizado', 'Backlog'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push('Status deve ser: Jogando, Finalizado ou Backlog');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      desenvolvedor: this.desenvolvedor,
      anoLancamento: this.anoLancamento,
      plataforma: this.plataforma,
      status: this.status,
      imagemCapa: this.imagemCapa
    };
  }
}

module.exports = Game;

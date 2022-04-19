// Coloque aqui suas actions
export const SALVAR_EMAIL = 'SALVAR_EMAIL';

export const salvarEmail = (payload) => ({
  type: SALVAR_EMAIL,
  payload,
});

export const PEGAR_MOEDA = 'PEGAR_MOEDA';

export const pegarMoeda = (payload) => ({
  type: PEGAR_MOEDA,
  payload,
});

export const SALVA_FORM = 'SALVA_FORM';

export const salvaForm = (payload) => ({
  type: SALVA_FORM,
  payload,
});
export const DELETA_DESPESA = 'DELETA_DESPESA';

export const deletaDespesa = (payload) => ({
  type: DELETA_DESPESA,
  payload,
});

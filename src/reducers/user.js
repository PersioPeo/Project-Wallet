// Esse reducer será responsável por tratar as informações da pessoa usuária
const ESTADO_INICIAL = {

  email: '',

};

const userReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
  case 'SALVAR_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
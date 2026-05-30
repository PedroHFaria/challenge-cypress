export const API_BASE_URL = 'https://serverest.dev';

export const API_MESSAGES = {
  successfulCreation: 'Cadastro realizado com sucesso',
  invalidCredentials: 'Email e/ou senha inválidos',
  missingToken:
    'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
  duplicateEmail: 'Este email já está sendo usado',
  cartCancelled: 'Registro excluído com sucesso. Estoque dos produtos reabastecido',
  cartNotFound: 'Carrinho não encontrado',
};

export const USER_REQUIRED_FIELD_ERRORS = {
  nome: 'nome é obrigatório',
  email: 'email é obrigatório',
  password: 'password é obrigatório',
  administrador: 'administrador é obrigatório',
};

export const PRODUCT_REQUIRED_FIELD_ERRORS = {
  nome: 'nome é obrigatório',
  preco: 'preco é obrigatório',
  descricao: 'descricao é obrigatório',
  quantidade: 'quantidade é obrigatório',
};

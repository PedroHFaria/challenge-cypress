import { API_BASE_URL } from '../../utils/constants';

export function apiRequest(options, retries = 5) {
  return cy.request(options).then((response) => {
    if ([503, 429].includes(response.status) && retries > 0) {
      return apiRequest(options, retries - 1);
    }

    return cy.wrap(response);
  });
}

export function buildAuthHeaders(token) {
  return token ? { Authorization: token } : undefined;
}

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export function buildUserPayload(user) {
  return {
    nome: user.name,
    email: user.email,
    password: user.password,
    administrador: user.isAdmin ? 'true' : 'false',
  };
}

export function buildProductPayload(product) {
  return {
    nome: product.name,
    preco: product.price,
    descricao: product.description,
    quantidade: product.quantity,
  };
}

export function buildCartPayload(productId, quantity = 1) {
  return {
    produtos: [
      {
        idProduto: productId,
        quantidade: quantity,
      },
    ],
  };
}

import {
  apiRequest,
  apiUrl,
  buildUserPayload,
  buildProductPayload,
} from './environment';

export function loginViaApi(user, retries = 8) {
  return apiRequest({
    method: 'POST',
    url: apiUrl('/login'),
    body: {
      email: user.email,
      password: user.password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 401 && retries > 0) {
      return loginViaApi(user, retries - 1);
    }

    return cy.wrap(response);
  });
}

export function cancelCart(token) {
  return apiRequest({
    method: 'DELETE',
    url: apiUrl('/carrinhos/cancelar-compra'),
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
}

export function deleteUserById(userId, token) {
  return apiRequest({
    method: 'DELETE',
    url: apiUrl(`/usuarios/${userId}`),
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
}

export function deleteProductById(productId, token) {
  return apiRequest({
    method: 'DELETE',
    url: apiUrl(`/produtos/${productId}`),
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
}

export function registerUserViaApi(user) {
  return apiRequest({
    method: 'POST',
    url: apiUrl('/usuarios'),
    body: buildUserPayload(user),
    failOnStatusCode: false,
  });
}

export function createProductViaApi(product, token) {
  return apiRequest({
    method: 'POST',
    url: apiUrl('/produtos'),
    headers: { Authorization: token },
    body: buildProductPayload(product),
    failOnStatusCode: false,
  });
}

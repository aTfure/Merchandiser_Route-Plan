// Contains the actual API call implementation using httpClient and URLs
import httpClient from "./httpClient";
import { URL } from "./url";

// Auth requests
export const authRequests = {
  login: (credentials) => httpClient.post(URL.LOGIN, credentials),
  logout: () => httpClient.post(URL.LOGOUT),
  refreshToken: (refreshToken) =>
    httpClient.post(URL.REFRESH_TOKEN, { refresh_token: refreshToken }),
  register: (userData) => httpClient.post(URL.REGISTER, userData),
  getCurrentUser: () => httpClient.get(URL.ME),
  changePassword: (passwordData) =>
    httpClient.post(URL.CHANGE_PASSWORD, passwordData),
  resetPassword: (email) => httpClient.post(URL.RESET_PASSWORD, { email }),
  resetPasswordConfirm: (data) =>
    httpClient.post(URL.RESET_PASSWORD_CONFIRM, data),
};

// Merchandiser requests
export const merchandiserRequests = {
  getAll: (params) => httpClient.get(URL.MERCHANDISERS, { params }),
  getById: (id) => httpClient.get(URL.MERCHANDISER_BY_ID(id)),
  create: (data) => httpClient.post(URL.MERCHANDISERS, data),
  update: (id, data) => httpClient.patch(URL.MERCHANDISER_BY_ID(id), data),
  delete: (id) => httpClient.delete(URL.MERCHANDISER_BY_ID(id)),
  bulkDelete: (ids) =>
    httpClient.post(`${URL.MERCHANDISERS}bulk-delete/`, { ids }),
};

// Outlet requests
export const outletRequests = {
  getAll: (params) => httpClient.get(URL.OUTLETS, { params }),
  getById: (id) => httpClient.get(URL.OUTLET_BY_ID(id)),
  create: (data) => httpClient.post(URL.OUTLETS, data),
  update: (id, data) => httpClient.patch(URL.OUTLET_BY_ID(id), data),
  delete: (id) => httpClient.delete(URL.OUTLET_BY_ID(id)),
  bulkDelete: (ids) => httpClient.post(`${URL.OUTLETS}bulk-delete/`, { ids }),
  assignMerchandiser: (data) => httpClient.post(URL.OUTLET_MERCHANDISERS, data),
};

// Channel requests
export const channelRequests = {
  getAll: (params) => httpClient.get(URL.CHANNELS_TYPES, { params }),
  getById: (id) => httpClient.get(URL.CHANNEL_TYPE_BY_ID(id)),
  create: (data) => httpClient.post(URL.CHANNELS_TYPES, data),
  update: (id, data) => httpClient.patch(URL.CHANNEL_TYPE_BY_ID(id), data),
  delete: (id) => httpClient.delete(URL.CHANNEL_TYPE_BY_ID(id)),
};

// Route Requests
export const routeRequests = {
  getAll: (params) => httpClient.get(URL.ROUTE, { params }),
  getById: (id) => httpClient.get(URL.ROUTE_BY_ID(id)),
  create: (data) => httpClient.post(URL.ROUTE, data),
  update: (id, data) => httpClient.patch(URL.ROUTE_BY_ID(id), data),
  delete: (id) => httpClient.delete(URL.ROUTE_BY_ID(id)),
  addOutlets: (id, data) => httpClient.post(URL.ADD_OUTLETS_TO_ROUTE(id), data),
  resendRouteEmail: (id) => httpClient.post(URL.ROUTE_RESEND_EMAIL(id)),
};

// Just contains URL constants and patterns;

const BASE_URL = "";

export const URL = {
  // Auth endpoints
  LOGIN: `/auth/login/`,
  LOGOUT: `auth/logout/`,
  REFRESH_TOKEN: `auth/authtoken/tokenproxy/`,
  REGISTER: `/auth/register/`,
  ME: `/auth/me/`,
  CHANGE_PASSWORD: `/auth/change_password/`,
  RESET_PASSWORD: `/auth/reset_password/`,
  RESET_PASSWORD_CONFIRM: `/auth/reset_password_confirm/`,

  // Merchandiser endpoints
  MERCHANDISERS: `/api/merchandisers/`,
  MERCHANDISER_BY_ID: (id) => `/api/merchandisers/${id}/`,

  // Outlet endpoints
  OUTLETS: `/api/outlets/`,
  OUTLET_BY_ID: (id) => `/api/outlets/${id}/`,
  OUTLET_MERCHANDISERS: `/api/outlets-merchandisers/`,

  // Channel endpoints
  CHANNELS_TYPES: `/api/channel-types/`,
  CHANNEL_TYPE_BY_ID: (id) => `/api/channel-types/${id}/`,

  // Group endpoints
  GROUPS: `/api/auth/group/`,
  GROUP_BY_ID: (id) => `/api/auth/group/${id}/`,

  // Routes endpoints
  ROUTE: `/api/routes/`,
  ROUTE_BY_ID: (id) => `/api/routes/${id}/`,
  ADD_OUTLETS_TO_ROUTE: (id) => `/api/routes/${id}/add_outlets/`,
};

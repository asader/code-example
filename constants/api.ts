const API_PREFIX = '/api/v2';
const BASE_URL = `${process.env.API_BASE_URL || '/S7WMediaService'}${API_PREFIX}`;

export const API = {
  BASE: () => {
    return (BASE_URL);
  },
  LOGIN: () => `${API.BASE()}/login/`,
  LOGOUT: () => `${API.BASE()}/logout/`,
  PROXY: '/api/proxy/',
  WYSIWYG: {
    BASE: () => `${API.BASE()}/wysiwyg`,
    SAVE: () => `${API.WYSIWYG.BASE()}/save`,
  },
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

const authApi = axios.create({
    baseURL: 'http://localhost:2000/api/', 
    headers: {
      'Content-Type': 'application/json',
    },
  });
  

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await authApi.post('/auth/refresh-token', { refreshToken });

    const { accessToken } = response.data;

    localStorage.setItem('accessToken', accessToken);

    console.log('Access token refreshed successfully');
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    throw new Error('Failed to refresh access token');
  }
};

api.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Access token expired. Attempting to refresh...');
      
      try {
        const newAccessToken = await refreshAccessToken();

        const originalRequest = error.config;
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing access token', refreshError);
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);


export const login = async (email, password) => {
    try {
      const response = await authApi.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const register = async (userData) => {
    try {
      const response = await authApi.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };


export const getProducts = async (page = 1, search = '') => {
    try {
      let url = `products?page=${page}`;
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }
      localStorage.getItem('accessToken');

      const response = await api.get(url);
      console.log('✅ Réponse reçue de l\'API :', response.data);
  
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des produits :', error.response?.data || error.message);
      throw error;
    }
  };
  

export const addProduct = async (productData) => {
  try {
    const response = await api.post('products', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


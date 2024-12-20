// utils/api.js

export const apiFetch = async (url, method = 'GET', body = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API Fetch Error:', error.message);
      throw error;
    }
  };
  
  // Wrapper functions for specific methods
  export const getData = async (url) => apiFetch(url, 'GET');
  export const postData = async (url, body) => apiFetch(url, 'POST', body);
  export const patchData = async (url, body) => apiFetch(url, 'PATCH', body);
  
const envConfig = {
  API_BASE_URL: (process.env.VITE_API_BASE_URL as string) || 'http://localhost:5000/api/v1',
};

export default envConfig;

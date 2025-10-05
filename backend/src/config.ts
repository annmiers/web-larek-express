import 'dotenv/config';

const config = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  mongodb: {
    url: process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
  },
};

export default config;

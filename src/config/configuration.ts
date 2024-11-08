// Arquivo de configurações de variaveis de ambiente

export default () => ({
  port: parseInt(process.env.APP_PORT),
  database: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
});

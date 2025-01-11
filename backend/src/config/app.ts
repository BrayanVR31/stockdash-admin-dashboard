const { APP_HOST = "localhost", APP_PORT = 3000 } = process.env;

const settings = () => ({
  server: {
    hostname: APP_HOST,
    port: APP_PORT,
  },
});

export { settings };

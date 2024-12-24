module.exports = {
  apps: [
    {
      name: "test-server",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment_variable",
      },
    },
  ],
};

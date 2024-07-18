module.exports = {
  apps: [
    {
      name: "Line Strike Showdown - Server",
      cwd: "./line-strike-server",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
      interpreter: "node@18.12.0",
    },
    {
      name: "Line Strike Showdown - Client",
      cwd: "./line-strike-client",
      script: "npm",
      args: "run dev",
      interpreter: "node@18.12.0",
    },
  ],
};

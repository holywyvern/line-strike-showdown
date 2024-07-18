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
    },
    {
      name: "Line Strike Showdown - Client",
      cwd: "./line-strike-client",
      script: "npm",
      args: "run dev",
    },
  ],
};

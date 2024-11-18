// pm2 start ecosystem.config.js --env production
module.exports = {
  apps: [
    {
      name: "aic-new", // Name of the application
      script: "npm", // Use npm to run the script
      args: "start", // Command to start the app
      cwd: ".", // Current working directory
      interpreter: "none", // No need for an interpreter since npm handles it
      watch: false, // Disable watch to avoid unnecessary restarts
      env: {
        NODE_ENV: "production", // Environment variable for production
      },
      env_development: {
        NODE_ENV: "development", // Environment variable for development
      },
    },
  ],
};

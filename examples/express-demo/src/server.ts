import app from './app';
import { config } from './config';

/**
 * Starts the Express server.
 */
const startServer = () => {
  try {
    app.listen(config.port, () => {
      console.log(`[Server] ${config.appName} is running on http://localhost:${config.port}`);
      console.log(`[Environment] ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('[Error] Failed to start server:', error);
    process.exit(1);
  }
};

// Handle Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[Server] SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

startServer();

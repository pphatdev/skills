import app from './app';

/**
 * Cloudflare Worker entry point using ES Modules.
 */
export default {
  fetch: app.fetch,
};

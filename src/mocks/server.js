import { setupServer } from 'msw';
import { handlers } from './handlers';

console.log('server file');

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);

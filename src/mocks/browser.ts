// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Crea el Worker con los handlers que definimos
export const worker = setupWorker(...handlers);

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Enable more verbose logging in development
if (!window.location.href.includes('localhost')) {
  // Production logging
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
} else {
  // Development logging - add extra debugging info
  const originalError = console.error;
  console.error = (...args) => {
    originalError('DEBUG:', new Date().toISOString(), ...args);
  };

  const originalWarn = console.warn;
  console.warn = (...args) => {
    originalWarn('DEBUG:', new Date().toISOString(), ...args);
  };

  const originalLog = console.log;
  console.log = (...args) => {
    originalLog('DEBUG:', new Date().toISOString(), ...args);
  };
}

// Bootstrap with error handling
bootstrapApplication(App, appConfig)
  .then(success => {
    console.log('Application bootstrapped successfully');
  })
  .catch((err) => {
    console.error('Error bootstrapping application:', err);
    // Additional error reporting
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
      // In production, we might want to send error reports to a service
      console.error('Application failed to bootstrap');
    }
  });

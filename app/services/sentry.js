import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { isLocal } from '@utils';

export function initSentry() {
  if (!isLocal()) {
    Sentry.init({
      environment: 'development',
      dsn: process.env.SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0
    });
  }
}
export function reportError(error, errorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}

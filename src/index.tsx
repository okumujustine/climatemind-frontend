import React from 'react';
import ReactDOM from 'react-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import { NotificationProvider } from './contexts/notifications';
import QueryProvider from './contexts/queryClient';
import { AlignmentProvider } from './contexts/alignment';
import { QuestionsProvider } from './contexts/questions';
import { ResponsesProvider } from './contexts/responses';
import { SessionProvider } from './contexts/session';
import AuthProvider from './contexts/auth';
import { getAppSetting } from './getAppSetting';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

const sentryDsn = getAppSetting('REACT_APP_SENTRY_DSN');
const [, origin] = window.location.origin.split('://');

console.log('origin:', origin)
Sentry.init({
  dsn: sentryDsn,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: origin,
  release: '%REACT_APP_RELEASE_VERSION%',
});

// .env.development Allows you to hide devtools
const showRQTools = getAppSetting('REACT_APP_SHOW_RQ_TOOLS');

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider>
      <AuthProvider>
        <NotificationProvider>
          {showRQTools && <ReactQueryDevtools initialIsOpen={false} />}
          <SessionProvider>
            <AlignmentProvider>
              <QuestionsProvider>
                <ResponsesProvider>
                  <App />
                </ResponsesProvider>
              </QuestionsProvider>
            </AlignmentProvider>
          </SessionProvider>
        </NotificationProvider>
      </AuthProvider>
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

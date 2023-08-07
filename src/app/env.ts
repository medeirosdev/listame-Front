import Config from 'react-native-config';

export const env = {
  CURRENT_ENVIRONMENT: getEnv('CURRENT_ENVIRONMENT') as
    | 'production'
    | 'development',
  BASE_API_URL: getEnv('BASE_API_URL'),
  REDUX_LOGGER_ENABLED: getEnv('REDUX_LOGGER_ENABLED') === 'true',
  GOOGLE_ANDROID_CLIENT_ID: getEnv('GOOGLE_ANDROID_CLIENT_ID'),
  GOOGLE_IOS_CLIENT_ID: getEnv('GOOGLE_IOS_CLIENT_ID'),
  GOOGLE_WEB_CLIENT_ID: getEnv('GOOGLE_WEB_CLIENT_ID'),
  FACEBOOK_APP_ID: getEnv('FACEBOOK_APP_ID'),
};

function getEnv(name: string, isRequired = true) {
  const value = Config[name];

  if (isRequired && value === undefined) {
    console.error(
      `Required environment variable ${name} not defined. Set it on .env to run the app.`,
    );
  }

  return value;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from '@cometchat/chat-uikit-react';

export const COMETCHAT_CONSTANTS = {
  APP_ID: '2658082094ba2b89',
  REGION: 'us',
  AUTH_KEY: '18311d0f0e64f3e4dd32054a44d17ed5263de2ec',
};

const UID = 'cometchat-uid-1'; 

const mountApp = () => {
  const root = createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

const initializeAndLogin = async () => {
  if (
    COMETCHAT_CONSTANTS.APP_ID &&
    COMETCHAT_CONSTANTS.REGION &&
    COMETCHAT_CONSTANTS.AUTH_KEY
  ) {
    const uiKitSettings = new UIKitSettingsBuilder()
      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
      .setRegion(COMETCHAT_CONSTANTS.REGION)
      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
      .subscribePresenceForAllUsers()
      .build();

    try {
      await CometChatUIKit.init(uiKitSettings);
      console.log('CometChat initialized');

      const loggedInUser = await CometChatUIKit.getLoggedinUser();
      if (!loggedInUser) {
        const user = await CometChatUIKit.login(UID);
        console.log('Login successful:', user);
      } else {
        console.log('User already logged in:', loggedInUser);
      }

      mountApp();
    } catch (error) {
      console.error('CometChat init/login failed:', error);
    }
  } else {
    console.warn('Missing CometChat credentials');
    mountApp();
  }
};

initializeAndLogin();

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from '@cometchat/chat-uikit-react';

// Your CometChat credentials
export const COMETCHAT_CONSTANTS = {
  APP_ID: '2649604c7fc34a0b',
  REGION: 'us',
  AUTH_KEY: 'f19f572789e80ba241c2ff9220bbd9829eb376d0',
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

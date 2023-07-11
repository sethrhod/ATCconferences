import React, { useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

async function checkInternetConnection() {

  const [connectionError, setConnectionError] = useState(false);

  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    setConnectionError(true);
  } else {
    setConnectionError(false);
  }
  return connectionError;
};

export default checkInternetConnection;
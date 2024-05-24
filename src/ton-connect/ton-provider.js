'use client';

import PropTypes from 'prop-types';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

export function TonProvider({ children }) {
  return <TonConnectUIProvider manifestUrl="https://www.dev-sprint-2.xoffer.io/assets/data/tonconnect-manifest.json">
    {children}
  </TonConnectUIProvider>;
}

TonProvider.propTypes = {
  children: PropTypes.node,
};

import 'antd/dist/antd.css';
import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';

import { ConfigProvider } from 'antd';
import { JalaliLocaleListener } from 'antd-jalali';
import { DirectionType } from 'antd/lib/config-provider';
import fa_IR from 'antd/lib/locale/fa_IR';

function MyApp({ Component, pageProps }: AppProps) {
  const [direction, setDirection] = React.useState<DirectionType>('rtl');
  const [locale, setLocale] = React.useState(fa_IR);

  return (
    <ConfigProvider locale={locale} direction={direction}>
      <JalaliLocaleListener />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;

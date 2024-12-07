// pages/_app.tsx
import type { AppProps } from 'next/app';

type PageWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
  };
};

export default function App({ Component, pageProps }: PageWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

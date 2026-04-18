import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ margin: 0, minHeight: '100vh', background: '#f4f1ea' }}>
      <Component {...pageProps} />
    </div>
  );
}

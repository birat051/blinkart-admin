import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import PageHeader from '@/components/Header'
import { HomeContentContainer } from '@/styles/global.style';
import MainPageLinks from '@/components/MenuSection';


type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
  };
};

export default function App({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) {
  if(Component.getLayout)
  {
    return (
      <SessionProvider session={session}>
      <PageHeader />
      <Component {...pageProps} />
      </SessionProvider>
    )
  }
  return ( 
  <SessionProvider session={session}>
  <PageHeader />
  <HomeContentContainer>
  <MainPageLinks/>
  <Component {...pageProps} />
  </HomeContentContainer>
  </SessionProvider> )
}

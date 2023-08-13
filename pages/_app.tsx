import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import PageHeader from '@/components/Header'
import { HomeContentContainer } from '@/styles/global.style';
import MainPageLinks from '@/components/MenuSection';
import { useEffect,  useState } from 'react';
import MobileMenuSection from '@/components/MobileMenuSection';


type AppPropsWithLayout = AppProps & {
  Component: {
    getLayout?: (page: React.ReactNode) => React.ReactNode;
  };
};

export default function App({ Component, pageProps: { session, ...pageProps }}: AppPropsWithLayout) {
  const [navBarVisible, setnavBarVisible] = useState(false)
  const changeNavBarVisible=(value:boolean)=>{
    setnavBarVisible(value)
  }
  if(Component.getLayout)
  {
    return (
      <SessionProvider session={session}>
      <PageHeader changeNavBarVisible={changeNavBarVisible}/>
      <Component {...pageProps} />
      </SessionProvider>
    )
  }
  return ( 
  <SessionProvider session={session}>
  <PageHeader changeNavBarVisible={changeNavBarVisible}/>
  <HomeContentContainer>
  {navBarVisible && <MobileMenuSection changeNavbarVisible={changeNavBarVisible}/>}
  <MainPageLinks />
  <Component {...pageProps} />
  </HomeContentContainer>
  </SessionProvider> )
}

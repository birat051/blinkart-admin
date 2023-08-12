import Head from 'next/head'
import {HomePageRightColumn } from '@/styles/global.style'

export default function Home() {

  return (
    <>
      <Head>
        <title>Blinkart Admin Panel</title>
        <meta name="description" content="Admin Panel for Blinkart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <HomePageRightColumn>
        </HomePageRightColumn>
    </>
  )
}

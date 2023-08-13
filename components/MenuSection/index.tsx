import React, { useEffect, useRef } from 'react'
import { MainPageLinkContainer, MenuLink, MenuLinkNav } from './MainPageLink.style'
import UserNameSection from '../UserNameSection'
import { useSession } from 'next-auth/react'
import { faBagShopping, faBlog, faChartSimple, faClose, faCommentsDollar, faPowerOff, faSquarePlus, faStore } from '@fortawesome/free-solid-svg-icons'
import { User } from 'next-auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RouteHelper } from '@/services/RouteHelper'
import { useRouter } from 'next/router'
import '../../util/FontAwesomeConfig'
import { signOut } from 'next-auth/react'
import { MobileIcon } from '../Header/Header.style'

export interface CustomUser extends User {
  id: string;
  role: string;
  seller:string;
}


function MainPageLinks() {
  const { data: session} = useSession()
  const userRole=(session?.user as CustomUser)?.role
  const router=useRouter()
  const sellerMenulinks=[
    {
      label: "Dashboard",
      icon: faChartSimple,
      link: '/'
    },
    {
      label: "Products",
      icon: faBagShopping,
      link: RouteHelper.getAllProductsRoute()
    },
    {
      label: "Add Products",
      icon: faSquarePlus,
      link: RouteHelper.getAddProductsRoute()
    },
  ]
  const adminMenuLinks=[
    {
      label: "Dashboard",
      icon: faChartSimple,
      link: '/'
    },
    {
      label: "Banners",
      icon: faBlog,
      link: RouteHelper.getAllBannersRoute()
    },
    {
      label: "Add Banners",
      icon: faSquarePlus,
      link: RouteHelper.getAddBannersRoute()
    },
    {
      label: "Offers",
      icon: faCommentsDollar,
      link: RouteHelper.getAllOffersRoute()
    },
    {
      label: "Add Offers",
      icon: faSquarePlus,
      link: RouteHelper.getAddOffersRoute()
    },
    {
      label: "Categories",
      icon: faStore,
      link: RouteHelper.getAllCategoryRoute()
    },
    {
      label: "Add Category",
      icon: faSquarePlus,
      link: RouteHelper.getAddCategoryRoute()
    },
  ]
  const signOutHandler=async ()=>{
    await signOut()
  }
  return (
    <MainPageLinkContainer>
        <UserNameSection email={session?.user?.email??''} name={session?.user?.name??''}/>
        <ul>
          {userRole==="seller" && sellerMenulinks.map((link)=>{
              return (
                <MenuLink key={link.label} className={router.pathname===link.link?'active':''}>
                  <FontAwesomeIcon icon={link.icon}   style={{flex:1,width:'20px',height:'20px'}}/>
                  <MenuLinkNav href={router.pathname!==link.link?link.link:'#'}>{link.label}</MenuLinkNav>
                </MenuLink>
              )
          })}
          {userRole==="admin" && adminMenuLinks.map((link)=>{
              return (
                <MenuLink key={link.label} className={router.pathname===link.link?'active':''}>
                  <FontAwesomeIcon icon={link.icon}   style={{flex:1,width:'20px',height:'20px'}}/>
                  <MenuLinkNav href={router.pathname===link.link?link.link:'#'}>{link.label}</MenuLinkNav>
                </MenuLink>
              )
          })}
          <MenuLink>
            <FontAwesomeIcon icon={faPowerOff}   style={{flex:1,width:'20px',height:'20px'}}/>
            <button onClick={signOutHandler}>Logout</button>
          </MenuLink>
        </ul>
    </MainPageLinkContainer>
  )
}

export default MainPageLinks
import Image from "next/image"
import img from '../../public/blinkart.png'
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { HeaderContainer, ImageComponent, MobileIcon } from "./Header.style"
import { RouteHelper } from "@/services/RouteHelper"
import { faBars } from "@fortawesome/free-solid-svg-icons"

type headerPropType={
  changeNavBarVisible: (value:boolean)=>void
}
function PageHeader(props:headerPropType) {
  const { data: session, status } = useSession()

  const router=useRouter()

  const handleLoginClick = () => {
    router.push(RouteHelper.getLoginRoute())
  };

  const signOutHandler=async ()=>{
    await signOut()
  }
  
  return (
        <HeaderContainer>
            <ImageComponent>
                <Image src={img} alt='Blinkart logo' height='25' onClick={()=>router.push('/')} style={{cursor: 'pointer'}} placeholder = 'blur' />
            </ImageComponent>
            <MobileIcon icon={faBars} onClick={()=>props.changeNavBarVisible(true)} />
        </HeaderContainer>
    )
}

export default PageHeader
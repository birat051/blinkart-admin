import Image from "next/image"
import img from '../../public/blinkart.png'
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"
import { HeaderContainer, ImageComponent } from "./Header.style"
import { RouteHelper } from "@/services/RouteHelper"


function PageHeader() {
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
            {/* <LoginButton /> */}
            {status==="unauthenticated" && <button onClick={handleLoginClick}>Login</button>}
            {status==="authenticated" && session && <button onClick={signOutHandler}>Signout</button>}
        </HeaderContainer>
    )
}

export default PageHeader
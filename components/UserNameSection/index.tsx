import React from 'react'
import { UserNameContainer } from './UserName.style'
import Image from "next/image"

type userNameProp=
{
    name: string,
    email: string
}

function UserNameSection(props:userNameProp) {
  return (
    <UserNameContainer>
        <Image src={'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg'} alt="user image in profile section" height={40} width={40} objectFit='contain'/>
        <div>
            <h1>{props.name}</h1>
            <h2>{props.email}</h2>
        </div>
    </UserNameContainer>
  )
}

export default UserNameSection
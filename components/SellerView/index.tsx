import { SellerDataModel } from '@/models/seller_model'
import React, { useState } from 'react'
import { SellerHeading, SellerViewContainer } from './SellerView.style'
import { EditIcon, ProductOptionsIcon, ProductPopupOptions } from '../ProductView/ProductView.style'
import { faEdit, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'


type sellerProp={
    seller: SellerDataModel,
    changeSelectedSeller: (sellerid:string)=>void
    changeSelectedSellerPassword: (sellerid:string)=>void
}

function SellerView(props:sellerProp) {
  const [popupVisible, setpopupVisible] = useState(false)
  return (
    <SellerViewContainer>
        <SellerHeading>
            <h1>{props.seller.name}</h1>
            <ProductOptionsIcon icon={faEllipsisVertical} size='sm' style={{flex:1,color:'grey',width:'20px',height:'20px',cursor:'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>
            {popupVisible && <ProductPopupOptions  onMouseLeave={()=>setpopupVisible(false)}>
            <h2 onClick={()=>props.changeSelectedSeller(props.seller._id)}>Edit</h2>
            <h2 onClick={()=>props.changeSelectedSellerPassword(props.seller._id)}>Change Email/Password</h2>
            </ProductPopupOptions>
        }
        <EditIcon icon={faEdit} style={{flex:1,color:'rgb(41,116,241)',width:'12px',height:'12px',cursor:'pointer'}} onClick={()=>props.changeSelectedSeller(props.seller._id)}/>
        </SellerHeading>
        <p><span>Address</span>&nbsp;{props.seller.address}</p>
        <p><span>Contact Number</span>&nbsp;{props.seller.contactNumber}</p>
    </SellerViewContainer>
  )
}

export default SellerView
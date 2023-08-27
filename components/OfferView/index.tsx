import { OfferViewContainer } from '@/styles/offers.style'
import React, { useState } from 'react'
import Image from 'next/image'
import { ProductOptionsIcon, ProductPopupOptions } from '../ProductView/ProductView.style'
import { Offer } from '@/models/offer_model'
import { ProductCategory } from '@/models/category_model'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

type OfferViewProp=
{
    offer: Offer,
    deleteOffer: (offerId:string)=>void,
    editOffer: (offerId:string)=>void,
}

function OfferView(props:OfferViewProp) {
  const [popupVisible, setpopupVisible] = useState(false)
  const expiryDate = new Date(props.offer.expiryDate);
  return (
    <OfferViewContainer>
    <Image width={150} height={150} src={props.offer.categoryImageUrl} alt={`Offer image for ${props.offer.title}`} style={{objectFit: 'contain'}}/>
                    <div>
                        <h1>{props.offer.title}</h1>
                        <p>
                            <span>Category&nbsp;&gt;&nbsp;</span>
                            {props.offer.parentCategory && <span>{(props.offer.parentCategory as ProductCategory).name}&nbsp;&gt;&nbsp;</span>}
                            {(props.offer.category as ProductCategory).name}
                        </p>
                        <p><span>Expiry Date</span> {expiryDate.toDateString()}</p>
                        <p><span>Is top offer?</span> {props.offer.isTopOffer?'Yes':'No'}</p>
                        {props.offer.price>0 && <p><span>Starting Price&nbsp;</span>₹ {props.offer.price}</p>}
                        {props.offer.discount>0 && <p><span>Minimum discount&nbsp;</span>{props.offer.discount}% off</p>}
                    </div>
                    <ProductOptionsIcon icon={faEllipsisVertical} size='sm' style={{flex:1,color:'grey',width:'20px',height:'20px',cursor:'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>
            {popupVisible && <ProductPopupOptions  onMouseLeave={()=>setpopupVisible(false)}>
            <h2 onClick={()=>props.editOffer(props.offer._id)}>Edit</h2>
            <h2 onClick={()=>props.deleteOffer(props.offer._id)}>Delete</h2>
            </ProductPopupOptions>
    }
    </OfferViewContainer>
  )
}

export default OfferView
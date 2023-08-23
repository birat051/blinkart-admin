import { Banner } from '@/models/banner_model'
import { BannerView } from '@/styles/banners.style'
import React, { useState } from 'react'
import Image from 'next/image'
import { BannerMap } from '@/pages/banners'
import { ProductOptionsIcon, ProductPopupOptions } from '../ProductView/ProductView.style'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

type BannerViewProp={
    banner: Banner,
    bannerDetailMap: BannerMap,
    deleteBanner: (bannerId:string)=>void
}

function BannerViewComponent(props:BannerViewProp) {
  const [popupVisible, setpopupVisible] = useState(false)
  return (
    <BannerView>
    <Image src={props.banner.imageUrl} alt={`Banner image for ${props.banner.title}`} width={250} height={83} placeholder='blur'  blurDataURL='../../public/blurimage.jpeg'/>
    <div>
      <h1>{props.banner.title}</h1>
      <p>{props.bannerDetailMap[props.banner._id].parentCategoryName && <span>{props.bannerDetailMap[props.banner._id].parentCategoryName} &gt; </span> }
      {props.bannerDetailMap[props.banner._id].categoryName && <span>{props.bannerDetailMap[props.banner._id].categoryName}</span> }
      {props.bannerDetailMap[props.banner._id].productName && <span> &gt; {props.bannerDetailMap[props.banner._id].productName}</span> }
      </p>
      <p><span>Status </span>{props.banner.isActive?'Active':'Inactive'}</p>
    </div>
    <ProductOptionsIcon icon={faEllipsisVertical} size='sm' style={{flex:1,color:'grey',width:'20px',height:'20px',cursor:'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>
            {popupVisible && <ProductPopupOptions  onMouseLeave={()=>setpopupVisible(false)}>
            {props.banner.isActive && <h2>Mark as inactive</h2>}
            {!props.banner.isActive && <h2>Mark as active</h2>}
            <h2 onClick={()=>props.deleteBanner(props.banner._id)}>Delete</h2>
            </ProductPopupOptions>
    }
  </BannerView>
  )
}

export default BannerViewComponent
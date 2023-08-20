import { ProductCategory } from '@/models/category_model'
import { CategoryView } from '@/styles/categories.style'
import React, { useState } from 'react'
import Image from 'next/image'
import { ProductOptionsIcon, ProductPopupOptions } from '../ProductView/ProductView.style'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'


type categoryViewProp={
    category: ProductCategory,
    changeSelectedCategory: (categoryId:string)=>void
}

function CategoryViewComponent(props:categoryViewProp) {
    const [popupVisible, setpopupVisible] = useState(false)

  return (
    <CategoryView>
        {!props.category.imageUrl && <Image src='https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg' width={150} height={100} style={{objectFit: 'contain'}} alt={`Image for category ${props.category.name}`}/>}
        {props.category.imageUrl && <Image src={props.category.imageUrl} width={150} height={100} style={{objectFit: 'contain'}} alt={`Image for category ${props.category.name}`}/>}
            <div>
              <h1>{props.category.name}</h1>
              <p>{props.category.description}</p>
              {props.category.parentCategory && <p><span>Parent Category</span> {(props.category.parentCategory as ProductCategory).name}</p>}
            </div>
            <ProductOptionsIcon icon={faEllipsisVertical} size='sm' style={{flex:1,color:'grey',width:'20px',height:'20px',cursor:'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>
            {popupVisible && <ProductPopupOptions  onMouseLeave={()=>setpopupVisible(false)}>
            <h2 onClick={()=>props.changeSelectedCategory(props.category._id)}>Edit</h2>
            </ProductPopupOptions>
        }
    </CategoryView>
  )
}

export default CategoryViewComponent

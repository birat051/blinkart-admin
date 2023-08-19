import { Product } from "@/models/product_model"
import { EditIcon, PriceView, ProductContainer, ProductImage, ProductOptionsIcon, ProductPopupOptions, ProductSpecification } from "./ProductView.style"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { faEdit, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"


type productViewProp={
  product: Product,
  changeSelectedProduct: (productId:string)=>void
  changeProductList:(product:Product)=>void
}


function ProductView(props:productViewProp) {
  const [price,setPrice]=useState(props.product.price)
  const [popupVisible, setpopupVisible] = useState(false)
  useEffect(() => {
    if(props.product.discount && props.product.discount>0)
    setPrice(Math.floor(props.product.price * (100 - props.product.discount) / 100));
  }, [props.product.discount])
  // console.log('Discount is: ',props.product.discount)
  const markOutofStock=async (productId:string)=>{
    const response = await fetch(`/api/product/updatequantity?productId=${productId}&quantity=${0}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
      });
    const data=await response.json()
    if(response.status===200)
    {
      alert('Product has been marked out of stock')
      props.changeProductList(data)
    }
    else{
      alert(data.error)
    }
  }
  return (
    <ProductContainer>
      <ProductImage src={props.product.imageUrls[0]} alt={`Image for product ${props.product.name}`}/>
      <ProductSpecification>
        <h1>{props.product.name}</h1>
        <ul>
        {props.product.highlights.map((highlight)=>{
          return <li key={props.product._id+highlight}>{highlight}</li>
        })}
        </ul>
      </ProductSpecification>
      <PriceView>
        <h2>₹ {price}</h2>
        {props.product.discount && props.product.discount!==0 && <p><span>{Math.floor(props.product.price)}</span>
        {props.product.discount}% off
        </p>}
      </PriceView>
      <EditIcon icon={faEdit} style={{flex:1,color:'rgb(41,116,241)',width:'12px',height:'12px',cursor:'pointer'}} onClick={()=>props.changeSelectedProduct(props.product._id)}/>
      <ProductOptionsIcon icon={faEllipsisVertical} size='sm' style={{flex:1,color:'grey',width:'20px',height:'20px',cursor:'pointer'}} onMouseOver={()=>setpopupVisible(true)}/>
        {popupVisible && <ProductPopupOptions  onMouseLeave={()=>setpopupVisible(false)}>
            <h2 onClick={()=>props.changeSelectedProduct(props.product._id)}>Edit</h2>
            <h2 onClick={()=>markOutofStock(props.product._id)}>Mark item out of stock</h2>
            </ProductPopupOptions>
        }
    </ProductContainer>
  )
}



export default ProductView

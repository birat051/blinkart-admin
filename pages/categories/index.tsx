import ProductCategoryModel, { ProductCategory } from '@/models/category_model'
import { CategoryFilterContainer, CategoryView } from '@/styles/categories.style'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import CategoryViewComponent from '@/components/CategoryView'

type categoryProp={
  categories: ProductCategory[],
  error?: string
}

function CategoryPage(props:categoryProp) {
  if(props.error)
  return (
    <ErrorContainer>
      <p>Unexpected error ocurred: {props.error}</p>
    </ErrorContainer>
    )
  const [selectedCategory, setselectedCategory] = useState('')
  const changeSelectedCategory=(categoryId:string)=>{
    setselectedCategory(categoryId)
  }
  const [categoryList, setcategoryList] = useState(props.categories)
  const [showParentCategories, setShowParentCategories] = useState(false);
  const [categoryFilterValue, setcategoryFilterValue] = useState('')
  const [parentCategoryList, setparentCategoryList] = useState(categoryList.filter((category)=>category.parentCategory===null))
  const handleCategoryChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
    setcategoryFilterValue(event.target.value)
  }
  useEffect(() => {
    // const setParentCategoryList=()=>{
    //   const newCategoryList=categoryList.filter((category)=>category.parentCategory===null)
    //   setcategoryList(newCategoryList)
    // }
    if(showParentCategories)
    setcategoryList(parentCategoryList)
    else
    {
      setcategoryList(props.categories)
    }
  }, [showParentCategories])
  useEffect(() => {
    if(categoryFilterValue.length===0)
    {
      setcategoryList(props.categories)
      return
    }
    const newCategoryList=props.categories.filter((category)=>(category.parentCategory && (category.parentCategory as ProductCategory)._id===categoryFilterValue))
    setcategoryList(newCategoryList)
  }, [categoryFilterValue])
  return (
    <HomePageRightColumn>
      <Head>
        <title>All categories</title>
      </Head>
      <CategoryFilterContainer>
        <div>
        <h1>Filters</h1>
        </div>
        <div>
          <label>Show Parent Categories</label>
          <input type="checkbox" checked={showParentCategories} onChange={()=>setShowParentCategories(!showParentCategories)} disabled={categoryFilterValue===''?false:true}/>
        </div>
        <div>
          <label>Show categories for Parent Category</label>
          <select onChange={handleCategoryChange} value={categoryFilterValue} disabled={showParentCategories}>
            <option value="">Category</option>
          {parentCategoryList.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
        ))}
        </select>
        </div>
      </CategoryFilterContainer>
      {categoryList.map((category)=>{
        return (
          <CategoryViewComponent key={category._id} category={category} changeSelectedCategory={changeSelectedCategory}/>
          )
      })}
    </HomePageRightColumn>
  )
}


export async function getStaticProps(){
  try{
    await connectToDatabase()
    const categories=await ProductCategoryModel.find().populate('parentCategory')
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories))
      },
      revalidate: 600
    }
  }
  catch(error)
  {
    return {
      props: {
        error: (error as Error).toString()
      }
    }
  }
}


export default CategoryPage

import ProductCategoryModel, { ProductCategory } from '@/models/category_model'
import { CategoryFilterContainer } from '@/styles/categories.style'
import { ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import connectToDatabase from '@/util/connectDB'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import CategoryViewComponent from '@/components/CategoryView'
import EditCategoryForm from '@/components/EditCategoryForm'

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
  const getAllCategories=async ()=>{
    try{
      const response = await fetch(`/api/getAllCategories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
    const responseData=await response.json()
    if(response.status===200)
    {
      setcategoryList(responseData)
    }
  }
  catch(error){
    console.log('Unexpected error occured while trying to fetch category: ',error)
  }
  }
  useEffect(() => {
    if(showParentCategories)
    setcategoryList(parentCategoryList)
    else
    {
      getAllCategories()
    }
  }, [showParentCategories])
  useEffect(() => {
    if(categoryFilterValue.length===0)
    {
      getAllCategories()
      return
    }
    const newCategoryList=props.categories.filter((category)=>(category.parentCategory && (category.parentCategory as ProductCategory)._id===categoryFilterValue))
    setcategoryList(newCategoryList)
  }, [categoryFilterValue])
  const updateCategoryList=(category:ProductCategory)=>{
    const newList=categoryList.filter((data)=>data._id!==category._id)
    newList.push(category)
    setcategoryList(newList)
    if(category.parentCategory===null)
    {
      const parentList=parentCategoryList.filter((data)=>data._id!==category._id)
      setparentCategoryList([...parentList,category])
    }
  }
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
          <label>Show sub-categories for Parent Category</label>
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
        if(selectedCategory===category._id)
        return (
          <EditCategoryForm key={category._id} categorydata={category} parentCategories={parentCategoryList} closeEditForm={changeSelectedCategory} updateCategoryList={updateCategoryList}/>
          )
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

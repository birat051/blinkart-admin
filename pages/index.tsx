import Head from 'next/head'
import {ErrorContainer, HomePageRightColumn } from '@/styles/global.style'
import { getSession, useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { CustomUser } from '@/components/MenuSection'
import OrderModel, { Order, ProductOrder } from '@/models/order_model'
import connectToDatabase from '@/util/connectDB'
import ProductDataModel from '@/models/product_model'
import ProductUserDataModel from '@/models/product_user_model'
import {  GraphContainer, GraphContainerRow, HomeHeading, HomeHeadingElement, PieChartContainer } from '@/styles/home.style'
import { Bar,Pie } from 'react-chartjs-2'
import { useState } from 'react'
import Chart from 'chart.js/auto';
import {BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip, plugins} from 'chart.js'; 
Chart.register( CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend);

interface MonthlyRevenue {
  id: string;
  month: string;
  totalRevenue: number;
}

interface OrderStatusList
{
  id:number;
  label: string;
  value: number;
}

type homePropType={
  error?:string,
  totalUsers?: number,
  totalRevenue: number,
  totalProducts: number,
  orders: Order[],
  outOfStockProducts:number,
  monthlyRevenueList: MonthlyRevenue[];
  orderStatusList: OrderStatusList[];
}

export default function Home(props:homePropType) {
  const {data:session}=useSession()
  if(props.error)
  {
    return (
      <ErrorContainer>
        <p>{props.error}</p>
      </ErrorContainer>
    )
  }
  const revenueDataset={
    labels:props.monthlyRevenueList.map((data)=>data.month),
    datasets: [{
      label: `Revenue for ${new Date().getFullYear()}`,
      data:props.monthlyRevenueList.map((data)=>data.totalRevenue)
    }
    ],
    borderWidth: 2
  }
  const orderStatusDataset={
      label: props.orderStatusList.map((data)=>data.label),
      datasets: [{
        label: 'Order Status',
        data: props.orderStatusList.map((data)=>data.value)
      }]
  }
  const productCountData=[
    {
      label: 'Products in stock',
      value:props.totalProducts,
      backgroundColor: '#90EE90'
    },
    {
      label: 'Out of stock',
      value: props.outOfStockProducts,
      backgroundColor: 'red'
    }
  ]
  const productCountDataset={
    label: productCountData.map((data)=>data.label),
    datasets: [{
      label: 'Product Stock Status',
      data: productCountData.map((data)=>data.value),
      backgroundColor: ['#90EE90', 'red'],
      borderWidth: 2,
      borderColor: ['#90EE90', 'red'],
    }]
  }
  return (
    <>
      <Head>
        <title>Blinkart Admin Panel</title>
        <meta name="description" content="Admin Panel for Blinkart" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <HomePageRightColumn>
          <HomeHeading className={(session?.user as CustomUser).role==='seller'?'':'admin'}>
            <HomeHeadingElement backgroundcolor='#7A3AED'>
              <h2>Total Sales Amount</h2>
              <h1>₹ {Math.floor(props.totalRevenue)}</h1>
            </HomeHeadingElement>
            <HomeHeadingElement backgroundcolor='#EE4545'>
              <h2>Total Orders</h2>
              <h1>{props.orders.length}</h1>
            </HomeHeadingElement>
            <HomeHeadingElement backgroundcolor='#F49E0B'>
              <h2>Total Products</h2>
              <h1>{props.totalProducts}</h1>
            </HomeHeadingElement>
            {session?.user && (session?.user as CustomUser).role==='admin' && <HomeHeadingElement backgroundcolor='#10B982'>
              <h2>Total Users</h2>
              <h1>{props.totalUsers}</h1>
            </HomeHeadingElement>}
          </HomeHeading>
          <GraphContainerRow>
          <GraphContainer>
          <Bar data={revenueDataset} options={{aspectRatio:4/3,responsive: true, maintainAspectRatio: false, plugins: {
          legend: {
          display: true,
          position: 'top' // You can adjust the position as needed
          }
          }}}/>
          </GraphContainer>
          <PieChartContainer>
            
            <Pie data={orderStatusDataset} options={{aspectRatio:4/3,responsive: true, maintainAspectRatio: false, plugins: {
            legend: {
            display: true,
            position: 'top' // You can adjust the position as needed
            }
           }
           }
           }
           />
          </PieChartContainer>
          <PieChartContainer>
            <Pie data={productCountDataset} options={{aspectRatio:4/3,responsive: true, maintainAspectRatio: false}}/>
          </PieChartContainer>
          </GraphContainerRow>
        </HomePageRightColumn>
    </>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
  const session =await getSession(context)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthlyRevenueMap: { [key: string]: number } = {}; 
  const currentYear = new Date().getFullYear(); // Get the current year
  const currentMonth = new Date().getMonth();
  const monthlyRevenueList = [];
  const orderStatuses = ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered'];
  const orderStatusCounts: { [key: string]: number } = {};

  try{
    await connectToDatabase()
    const role=(session?.user as CustomUser).role
    if(role==='seller')
    {
      const sellerProducts = await ProductDataModel.find({ seller: (session?.user as CustomUser).seller});
      const sellerOrders = await OrderModel.find({
        'products.productId': { $in: sellerProducts.map(product => product._id) },
        deliveryStatus: { $ne: 'Canceled' }
      });
      const outOfStockProducts=await ProductDataModel.countDocuments({seller: (session?.user as CustomUser).seller,quantity: 0})
      const canceledOrders = await OrderModel.countDocuments({
        deliveryStatus: 'Canceled',
        seller: (session?.user as CustomUser).seller
      });
      const totalRevenue = sellerOrders.reduce((total, order) => {
        return total + order.products.reduce((subtotal: number, product: ProductOrder) => {
          const matchingProduct = sellerProducts.find(p => p._id.equals(product.productId));
          if (matchingProduct) {
            return subtotal + product.quantity * (matchingProduct.price - (matchingProduct.discount*matchingProduct.price/100));
          }
          return subtotal;
        }, 0);
      }, 0);
      // console.log('Total revenue is: ',totalRevenue)
      // console.log('Total products is: ', sellerProducts.length)

      const filteredOrders = sellerOrders.filter(order => {
      const orderYear = new Date(order.orderDate).getFullYear();
      // console.log('Order year is: ',orderYear)
      return orderYear === currentYear;
      });
      // console.log('Filtered orders are: ',filteredOrders)
      
      filteredOrders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const orderMonthYear = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
        const orderRevenue = order.products.reduce((subtotal: number, product: ProductOrder) => {
          const matchingProduct = sellerProducts.find(p => p._id.equals(product.productId));
          if (matchingProduct) {
            return subtotal + product.quantity * (matchingProduct.price - (matchingProduct.discount * matchingProduct.price / 100));
          }
          return subtotal;
        }, 0);
  
        if (!monthlyRevenueMap[orderMonthYear]) {
          monthlyRevenueMap[orderMonthYear] = 0;
        }
  
        monthlyRevenueMap[orderMonthYear] += Math.floor(orderRevenue);
      });
      // console.log('Month revenue map is: ',monthlyRevenueMap)

    for (let month = 0; month <= currentMonth; month++) {
      const monthYear = `${month + 1}-${currentYear}`;
      const totalRevenueForMonth = monthlyRevenueMap[monthYear] || 0;
      monthlyRevenueList.push({
        id: `${month + 1}`,
        month: monthNames[month],
        totalRevenue: totalRevenueForMonth
      });
    }
    sellerOrders.forEach(order => {
      const { deliveryStatus } = order;
      if (orderStatuses.includes(deliveryStatus)) {
        if (!orderStatusCounts[deliveryStatus]) {
          orderStatusCounts[deliveryStatus] = 0;
        }
        orderStatusCounts[deliveryStatus]++;
      }
    });

    const orderStatusList = orderStatuses.map((status, index) => ({
      id: index + 1,
      value: orderStatusCounts[status] || 0,
      label: status
    }));
    orderStatusList.push({
      id:orderStatusList.length+1,
      value: canceledOrders,
      label: 'Canceled'
    })
    // console.log('Monthly revenue list is: ',monthlyRevenueList)
    // console.log('Order status list is: ',orderStatusList)
      return {
        props:{
          orders: JSON.parse(JSON.stringify(sellerOrders)),
          totalRevenue,
          totalProducts: sellerProducts.length,
          outOfStockProducts,
          monthlyRevenueList,
          orderStatusList
        }
      }
    }
    else if(role==='admin'){
      const totalUsers=await ProductUserDataModel.countDocuments()
      const sellerOrders = await OrderModel.find({
        deliveryStatus: { $ne: 'Canceled' }
      });
      const canceledOrders = await OrderModel.countDocuments({
        deliveryStatus: 'Canceled'
      });
      const totalProducts=await ProductDataModel.countDocuments()
      const outOfStockProducts=await ProductDataModel.countDocuments({quantity: 0})
      const totalRevenue = sellerOrders.reduce((total, order) => {
        return total + order.products.reduce((subtotal:number, product: ProductOrder) => {
          return subtotal + product.quantity * (product.price - (product.discount*product.price/100));
        }, 0);
      }, 0);
      // console.log('Total revenue is: ',totalRevenue)
      // console.log('Total products is: ',totalProducts)
      // console.log('Total users is: ',totalUsers)
      const filteredOrders = sellerOrders.filter(order => {
        const orderYear = new Date(order.orderDate).getFullYear();
        return orderYear === currentYear;
        });
        filteredOrders.forEach(order => {
          const orderDate = new Date(order.orderDate);
          const orderMonthYear = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
          const orderRevenue = order.products.reduce((subtotal: number, product: ProductOrder) => {
              return subtotal + product.quantity * (product.price - (product.discount * product.price / 100));
          }, 0);
    
          if (!monthlyRevenueMap[orderMonthYear]) {
            monthlyRevenueMap[orderMonthYear] = 0;
          }
    
          monthlyRevenueMap[orderMonthYear] += Math.floor(orderRevenue);
        });
        for (let month = 0; month <= currentMonth; month++) {
          const monthYear = `${month + 1}-${currentYear}`;
          const totalRevenueForMonth = monthlyRevenueMap[monthYear] || 0;
          monthlyRevenueList.push({
            id: `${month + 1}`,
            month: monthNames[month],
            totalRevenue: totalRevenueForMonth
          });
        }
        // console.log('Monthly revenue list is: ',monthlyRevenueList)
        
        // Count the occurrences of each order status
        sellerOrders.forEach(order => {
          const { deliveryStatus } = order;
          if (orderStatuses.includes(deliveryStatus)) {
            if (!orderStatusCounts[deliveryStatus]) {
              orderStatusCounts[deliveryStatus] = 0;
            }
            orderStatusCounts[deliveryStatus]++;
          }
        });
    
        const orderStatusList = orderStatuses.map((status, index) => ({
          id: index + 1,
          value: orderStatusCounts[status] || 0,
          label: status
        }));
        orderStatusList.push({
          id:orderStatusList.length+1,
          value: canceledOrders,
          label: 'Canceled'
        })
      return {
        props:{
          orders: JSON.parse(JSON.stringify(sellerOrders)),
          totalRevenue,
          totalProducts,
          totalUsers,
          outOfStockProducts,
          monthlyRevenueList,
          orderStatusList
        }
      }
    }
    else
    return {
    props: {
      error:'User doesnt have a valid role'
    }
    }
  }
  catch(error)
  {
    return {
      props: {
        error: 'Unexpected error occured: '+(error as Error).toString()
      }
      }
  }
}
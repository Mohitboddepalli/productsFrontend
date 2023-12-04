import { useEffect, useState } from 'react';
import './App.css'
import BasicTable from './components/BasicTable'
import axios from 'axios';
import BasicPie from './components/pie';
import BarChartComponent from './components/bar';
import CardComponent from './components/card';
function App() {
  const [data,setData]=useState([])
  const [page,setPage]=useState(0)
  const [selectedMonth,setSelectedMonth]=useState(3)
  const [totalProducts,setTotalProducts]=useState(0)
  const [searchParameter,setSearchParameter]=useState("")
  const getProducts=(offset)=>{
    axios.get(`https://products-wsdu.onrender.com/allTransactions?month=${selectedMonth}&limit=${page+10}&offset=${page}&search_q=${searchParameter}`)
    .then(response => {
        setData(response?.data?.rows)
        setTotalProducts(response?.data?.total_pages?.count)
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
  }
  const getNextPage=()=>{
    if(page+10<totalProducts)
    {
      setPage(prevPage => prevPage + 10);
    }
  }
  const updateSearchParameter=(value)=>{
    setSearchParameter(value)
  }
  const getPrevPage=()=>{
    if(page-10>=0)
    {
      setPage(prevPage => prevPage - 10);
    }
  }
  const handleMonthChange=(event)=>{
    setSelectedMonth(event.target.value)
    setPage(0)
  }
  useEffect(()=>{
    getProducts()
  },[selectedMonth,page,searchParameter])

  const movieColumns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Price',
      accessorKey: 'price',
    },
    {
      header: 'Category',
      accessorKey: 'category',
    },
    {
      header: 'Sold',
      accessorKey: 'sold',
    }
  ]

  return (
    <>
      <h1>React-table</h1>
      <BasicTable data={data} columns={movieColumns} getNextPage={getNextPage} getPrevPage={getPrevPage} month={selectedMonth} handleMonthChange={handleMonthChange} totalProducts={totalProducts} page={page} updateSearchParameter={updateSearchParameter} searchParameter={searchParameter}/>
      <CardComponent selectedMonth={selectedMonth}/>
      <BarChartComponent selectedMonth={{ month:selectedMonth }}/>
      <BasicPie selectedMonth={{ month:selectedMonth }} />

    </>
  )
}

export default App

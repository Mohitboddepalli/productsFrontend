import {

  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

export default function BasicTable({ data, columns ,getNextPage,getPrevPage,handleMonthChange,selectedMonth,page,totalProducts,updateSearchParameter,searchParameter}) {


  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
    data
    })

  const months=["January","February","March","April","May","June","July","August","September","October","November","December"]

  return (
    <div >
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <input
        style={{padding:"10px",borderRadius:"10px",borderWidth:"0px",backgroundColor:"#e6bedc"}}
        type='text'
        value={searchParameter}
        onChange={(event)=>updateSearchParameter(event.target.value)}
        placeholder='search items'
      />
    <select
  style={{ padding: "10px", borderRadius: "10px",borderWidth:"0px" ,backgroundColor: "#e6bedc" }}
  value={selectedMonth}
  onChange={handleMonthChange}
  defaultValue={3} 
>
  {months.map((month, index) => (
    <option key={month} value={index + 1}>
      {month}
    </option>
  ))}
</select>

      </div>
      <table style ={{borderRadius:"30px"}}>
        <thead>
          <tr style={{ backgroundColor: '#ffafcc',borderRadius:"30px", color: 'white' }}>
            <th>ID</th>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>category</th>
            
            <th>image</th>
            <th>sold</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row,index) => (
            <tr key={row.id}  style={{ backgroundColor: index % 2 === 0 ? '#e6bedc' : '#ffc8dd' }}>
                     <td>{row.id}</td>
              <td>{row.title}</td>
              <td >{row.description}</td>
              <td>{row.price}</td>
              <td>{row.category}</td>
              <td>
                <img src={row.image} alt={`Image for ${row.title}`} style={{ width: '60px', height: '75px' }} />
              </td>
              <td>{row.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => table.setPageIndex(0)}>{page+1}</button>
        <button
          disabled={page-10<0}
          onClick={getPrevPage}
        >
          Previous page
        </button>
        <button
          disabled={page+10>=totalProducts}
          onClick={getNextPage}
        >
          Next page
        </button>
        
      </div>
    </div>
  )
}

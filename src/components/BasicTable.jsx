import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

export default function BasicTable({ data, columns ,getNextPage,getPrevPage,handleMonthChange,selectedMonth,page,totalProducts,updateSearchParameter,searchParameter}) {
  /* 
{
    "id": 1,
    "first_name": "Isador",
    "last_name": "Kruger",
    "email": "ikruger0@huffingtonpost.com",
    "gender": "Male",
    "dob": "2023-04-28T11:19:35Z"
  }
*/

  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  })

  const months=["January","February","March","April","May","June","July","August","September","October","November","December"]

  return (
    <div className='w3-container'>
      <div style={{display:"flex",justifyContent:"space-between"}}>
      <input
        style={{padding:"10px",borderRadius:"10px",backgroundColor:"#C5FFF8"}}
        type='text'
        value={searchParameter}
        onChange={(event)=>updateSearchParameter(event.target.value)}
        placeholder='search items'
      />
      <select style={{padding:"10px",borderRadius:"10px",backgroundColor:"#C5FFF8"}} value={selectedMonth} onChange={handleMonthChange}>
            {months.map((month,index) => (
                <option key={month} value={index+1}>{month}</option>
            ))}
        </select>
      </div>
      <table className='w3-table-all'>
        <thead style={{backgroundColor:"#96EFFF",fontSize:"18px"}}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody style={{background:"#C5FFF8",fontSize:"16px"}}>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
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
        {/* <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last page
        </button> */}
      </div>
    </div>
  )
}

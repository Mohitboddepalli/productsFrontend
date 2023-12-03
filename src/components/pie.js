import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

export default function BasicPie({ selectedMonth }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3009/itemsCount?month=${selectedMonth?.month}`);
        setData(response?.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const formattedData = data.map((ele,index) => ({
    id:index,
    value: ele.items,
    label: ele.category,
  }));
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"40px"}}>
    <PieChart 
      series={[
        {
          data: formattedData,
        },
      ]}
      width={500}
      height={200}
    />
    </div>
  );
}

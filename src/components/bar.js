import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Paper } from '@mui/material';
import axios from 'axios'
const data1 = [
  { range: '0-100' },{ range: '101-200' },
  { range: '201-300'},
  { range: '301-400'},
  { range: '401-500' },
  { range: '501-600' },
  { range: '601-700'},
  { range: '701-800'},
  { range: '801-900'},
  { range: '901 and above'},
];

const BarChartComponent = ({selectedMonth}) => {
    const [data, setData] = React.useState([]);
    let ap;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://products-wsdu.onrender.com/category?month=${selectedMonth?.month}`);

        
        setData(response?.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  },[selectedMonth]);
  useEffect(()=>{
    if(data.length!=0)
    {
      let ap=Object.values(data[0])
        data1?.map((ele,index)=>
            ele.count=ap[index]
        )
        setData(data1);
    }
  },[data])

  return (
    <Paper elevation={5} style={{ padding: 16 ,marginTop:"40px"}}>
      <Typography variant="h6" align="center" gutterBottom>
        Distribution of Data
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BarChartComponent;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function CardComponent({selectedMonth}) {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://products-wsdu.onrender.com/statastics?month=${selectedMonth}`);
          setData(response?.data);
          console.log("fghjk",response?.data[0])
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      console.log(data,"data");
      fetchData();
    }, [selectedMonth]);  
    React.useEffect(()=>{
        console.log(data[0]?.totalprice,"data items")
    },[data])
  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"40px"}}>
    <Card sx={{ width:500,backgroundColor:"yellow",textAlign:"center"}}>
      <CardContent>
        <Typography sx={{ fontSize: 30 }} color="text.secondary" gutterBottom>
          Total sale &nbsp; {data[0]?.totalprice}
        </Typography>
        <Typography variant="h5" component="div">
            Total Sold Item &nbsp; {data[0]?.soldItems}
        </Typography>
        <Typography variant="h5"  >
          Total unsold Item &nbsp; {data[0]?.unsold}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

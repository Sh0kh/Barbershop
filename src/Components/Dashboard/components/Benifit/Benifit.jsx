import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Typography,
  Divider,
  Paper,
  Grid,
  TextField,
  Container
} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Benifit() {
  // Ma'lumotlar
  const initialData = [1200, 1900, 1500, 2000, 2300, 2400, 2100, 2500, 2800, 3000, 2900, 3200];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const [startRange, setStartRange] = useState(0);
  const [endRange, setEndRange] = useState(11);
  
  // Inputlarni tekshirish
  const handleStartChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    if (value < 0) value = 0;
    if (value > endRange) value = endRange;
    setStartRange(value);
  };
  
  const handleEndChange = (e) => {
    let value = parseInt(e.target.value) || 11;
    if (value < startRange) value = startRange;
    if (value > 11) value = 11;
    setEndRange(value);
  };
  
  // Umumiy foyda
  const totalProfit = initialData
    .slice(startRange, endRange + 1)
    .reduce((sum, value) => sum + value, 0);
  
  // Chart uchun ma'lumot
  const chartData = {
    labels: months.slice(startRange, endRange + 1),
    datasets: [{
      label: 'Profit',
      data: initialData.slice(startRange, endRange + 1),
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      tension: 0.1,
      fill: true,
    }],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
  };

  return (
    <div style={{ paddingTop: '10px' }}>
      <Container maxWidth={false} sx={{ py: 4, px: 2 }}>
        <Divider sx={{ mb: 4 }} />
        
        <Paper elevation={3} sx={{ p: 2, mb: 4, height: '400px' }}>
          <div style={{ width: '100%', height: '100%' }}>
            <Line 
              data={chartData} 
              options={chartOptions}
            />
          </div>
        </Paper>
        
        <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Umumiy foyda: ${totalProfit.toLocaleString()}
          </Typography>
        </Paper>
        
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={5} md={4}>
            <TextField
              fullWidth
              label="Boshlang'ich raqam (0-11)"
              type="number"
              inputProps={{ min: 0, max: endRange }}
              value={startRange}
              onChange={handleStartChange}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} sm={5} md={4}>
            <TextField
              fullWidth
              label="Oxirgi raqam (0-11)"
              type="number"
              inputProps={{ min: startRange, max: 11 }}
              value={endRange}
              onChange={handleEndChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
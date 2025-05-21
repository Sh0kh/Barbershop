import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Container,
  Box
} from '@mui/material';

export default function Archive() {
  const mockOrders = [
    { id: 1, customerName: "John Doe", phone: "+998901234567", price: 50000, date: "2023-05-15", service: "Haircut" },
    { id: 2, customerName: "Alice Smith", phone: "+998902345678", price: 60000, date: "2023-05-16", service: "Beard Trim" },
    { id: 3, customerName: "Bob Johnson", phone: "+998903456789", price: 45000, date: "2023-05-17", service: "Haircut" },
    { id: 4, customerName: "Emma Wilson", phone: "+998904567890", price: 55000, date: "2023-05-18", service: "Hair Color" },
    { id: 5, customerName: "Michael Brown", phone: "+998905678901", price: 70000, date: "2023-05-19", service: "Full Service" },
    { id: 6, customerName: "Sarah Davis", phone: "+998906789012", price: 40000, date: "2023-05-20", service: "Haircut" },
    { id: 7, customerName: "David Miller", phone: "+998907890123", price: 65000, date: "2023-05-21", service: "Beard Design" },
    { id: 8, customerName: "Olivia Wilson", phone: "+998908901234", price: 50000, date: "2023-05-22", service: "Haircut" },
    { id: 9, customerName: "James Taylor", phone: "+998909012345", price: 75000, date: "2023-05-23", service: "Premium Package" },
    { id: 10, customerName: "Sophia Anderson", phone: "+998900123456", price: 60000, date: "2023-05-24", service: "Hair Treatment" }
  ];

  return (
    <div className="mx-auto max-w-[100%] pb-24 min-h-screen p-4">
      
      <Typography variant="h5" component="h1" gutterBottom sx={{ mt: 2, mb: 3, fontWeight: 'bold' }}>
        Buyurtmalar Arxivi
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table sx={{ minWidth: 550 }} aria-label="archive table">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Mijoz Ismi</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Telefon</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Xizmat</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Narxi</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Sana</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.service}</TableCell>
                <TableCell>{order.price.toLocaleString()} so'm</TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {mockOrders.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="body1" color="textSecondary">
            Hozircha arxivda buyurtmalar mavjud emas
          </Typography>
        </Box>
      )}
    </div>
  );
}
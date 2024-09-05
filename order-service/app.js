const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/orders', (req, res) => {
  res.json([
    { id: 1, item: 'Book', quantity: 2 },
    { id: 2, item: 'Pen', quantity: 10 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});

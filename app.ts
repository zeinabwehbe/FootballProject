// app.ts
import express, { Application } from 'express';
import playerRoutes from './src/players/playerRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/players', playerRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

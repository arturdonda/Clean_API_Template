require('dotenv').config();
import 'module-alias/register';
import app from '@main/config/express';

app.listen(process.env.PORT, () => console.log(`[Server]: ⚡️ Running on port ${process.env.PORT}`));

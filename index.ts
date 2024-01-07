import { app } from './src/app';
import { initDb } from './src/services/db';
import { initLocalStackS3 } from './src/services/s3';

const PORT = process.env.PORT || 3000;

const start = async () => {
    await initLocalStackS3();
    await initDb();
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
};

start();

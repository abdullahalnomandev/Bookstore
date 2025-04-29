import app from './app';
import config from './config';
import { Server } from 'http';

process.on("uncaughtException",error => {
  console.log(error);
  process.exit(1);
})

let server: Server;

const bootstrap = async () => {
  const {  port } = config;

  try {
    console.log('🛢️  Database connection successful');
    server = app.listen(port, () => {
      console.log(`✅ app listening on port ${port}`);
    });
  } catch (err) {
    console.log('Failed to connect database ', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

bootstrap();

process.on("SIGTERM", () => {
  console.log("SIGTERM is received");
  if(server){
    server.close();
  }
})

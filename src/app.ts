import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import Controller from './utils/interfaces/controller.interface';
import ErrorMiddleware from './middleware/error.middleware';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initilaseDatabaseConnection();
        this.initilaseMiddleware();
        this.initilaseControllers(controllers);
        this.initilaseErrorHandling();
    }

    private initilaseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(morgan('dev'));
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended:false }));
        this.express.use(compression());
    };

    private initilaseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initilaseErrorHandling(): void
    {
        this.express.use(ErrorMiddleware);
    }

    private initilaseDatabaseConnection(): void
    {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env; 

        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        );
    }

    public listen(): void
    {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        })
    }
}

export default App;
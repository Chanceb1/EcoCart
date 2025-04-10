import { Router } from 'express';

const router = Router();

export function setRoutes(app: any) {
    // Define your routes here
    app.use('/api', router);
    
    // Example route
    router.get('/example', (req, res) => {
        res.send('This is an example route');
    });
}
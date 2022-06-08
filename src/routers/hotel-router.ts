import { getHotels } from '@/controllers/hotel-controller';
import { Router } from 'express';

const hotelRouter = Router();

hotelRouter.get('/', getHotels);

export { hotelRouter };

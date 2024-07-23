import 'dotenv/config';
import { mongo } from 'mongoose';

export default {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 8080
};

import express from 'express';
import { BookRoutes } from '../modules/books/book.route';
import { AuthorRoutes } from '../modules/authors/author.route';

const router = express.Router();

const moduleRoutes = [
    {
        path:'/books',
        route: BookRoutes
    },
    {
        path:'/authors',
        route: AuthorRoutes
    }
];

moduleRoutes.forEach(({path,route}) => router.use(path,route))

export default router;
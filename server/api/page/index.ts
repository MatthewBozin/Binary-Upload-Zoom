import { AsyncRouter } from 'express-async-router';

import { login } from './page.controller';

const pageRouter = AsyncRouter();

pageRouter.get('/login', login);

export const PROTECTED_ROUTES = ['/protected'];

export default pageRouter;

import {Router} from "express";

export const meRouter = Router();

meRouter.get('/api/users/me', (req, res) => {
    res.send('there is data of current user')
})

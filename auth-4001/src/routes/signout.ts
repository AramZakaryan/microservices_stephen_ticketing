import {Router} from "express";

export const signOutRouter = Router();

signOutRouter.post('/api/users/signout', (req, res) => {
    res.send('there is data of current user')
})

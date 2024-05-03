import express from "express";
import SummonerController from "./controllers/summonerControllers";


const routes = express.Router()
const summonerController = new SummonerController()

routes.get('/history', summonerController.create)
routes.post('/summoner', summonerController.index)

export default routes
import axios from "axios"
import { Request, Response } from "express"

// interface Queue {
//     tier: number,
//     rank: number
//     wins: number,
//     losses: number,
//     leaguePoints: number,
// }

export default class SummonerController {
    async index(req: Request, res: Response) {
        const API_KEY = "RGAPI-2d323d86-37f9-461f-b699-5a58f9fc264a"
        const { gameName, tagLine } = req.body
        
        // Buscando cotna
        const accountUrl = `/${gameName}/${tagLine}?api_key=${API_KEY}`
        const accResponse = await axios.get(
            `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id${accountUrl}`
        )
        const account = accResponse.data
        
        // Buscando invocador
        const summonerUrl = `/summoner/v4/summoners/by-puuid/${account.puuid}`
        const fullSummonerUrl = `${summonerUrl}?api_key=${API_KEY}`
        const summonerResponse = await axios.get(
            `https://br1.api.riotgames.com/lol${fullSummonerUrl}`
        )
        const summoner = summonerResponse.data
        
        // Buscando ranked
        const rankedResponse = await axios.get(
            `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${API_KEY}`
        )
        const rankedArray = rankedResponse.data

        let wins = 0;
        let losses = 0
        let elo = "Unranked";
        let pdl = 0;

        if (rankedResponse.data.length > 0) {
            // Se houver dados de classificação, use-os
            const ranked = rankedArray[0]

            wins = ranked.wins
            losses = ranked.losses
            elo = `${ranked.tier} ${ranked.rank}`
            pdl = ranked.leaguePoints
        }

        const winrate = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 1000) / 10 + "%" : "N/A";

        const serializedSummoner = {
            name: summoner.name,
            level: summoner.summonerLevel,
            icon: `https://ddragon.leagueoflegends.com/cdn/14.2.1/img/profileicon/${summoner.profileIconId}.png`,
            elo: elo,
            wins: wins,
            losses: losses,
            pdl: pdl,
            winrate: winrate
        }

        console.log(serializedSummoner)

        return res.json(serializedSummoner)
    }

    async create(req: Request, res: Response) {
        return res.status(201).send()
    }
}

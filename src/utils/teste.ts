import axios from "axios"

async function getFirstBloodPlayerPuuid(matchData) {
  // Verifica se há informações de participantes
  if (matchData.info && matchData.info.participants) {
    // Itera sobre os participantes
    for (const playerStats of matchData.info.participants) {
      // Verifica se há dados e se o jogador teve o First Blood
      if (playerStats && playerStats.firstBloodKill) {
        return playerStats.summonerName;
      }
    }
  }

  // Retorna null se nenhum jogador teve o First Blood ou se os dados estão ausentes
  return null;
}

async function name() {
  const API_KEY = "RGAPI-2d323d86-37f9-461f-b699-5a58f9fc264a"

  const gameName = "Tatu Chucro"
  const tagLine = "00000"

  // Buscando conta
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
  console.log(summoner)
  
  // Buscando ranked
  const rankedResponse = await axios.get(
    `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summoner.id}?api_key=${API_KEY}`
  )
  const rankedArray = rankedResponse.data

  // Buscando history
  const matchsReponse = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=20&api_key=${API_KEY}`
  )
  const matchs = matchsReponse.data
  console.log(matchs)

  // Buscando torneio
  const tourneyResponse = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?type=tourney&start=0&count=20&api_key=${API_KEY}`
  )
  const tourney = tourneyResponse.data
  console.log(tourney)

  // Buscando partida
  const matchResponse = await axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${tourney[0]}?api_key=${API_KEY}`
  )
  const match = matchResponse.data
  console.log(match)

  const firstBloodPlayerPuuid = await getFirstBloodPlayerPuuid(match);
  console.log("PUUID do jogador com First Blood:", firstBloodPlayerPuuid);
}

name()

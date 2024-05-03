function getpool(pool) {
  const odds = 0.5

  const second_place_odds = odds
  const third_place_odds = odds
  const fourth_place_odds = odds
  const fifth_place_odds = odds

  const house_profit = (30 / 100) * pool
  const total_award = ((70 / 100) * pool)
  const first_award = ((60 / 100) * total_award)
  const rest_award = total_award - first_award

  const first_place = first_award
  const second_place = (((100 * second_place_odds) / 100) * rest_award)
  const second_place_vip = (((60 * second_place_odds) / 100) * rest_award)
  const second_place_vip2 = (((55 * second_place_odds) / 100) * rest_award)
  const second_place_vip3 = (((50 * second_place_odds) / 100) * rest_award)
  const third_place_vip = (((30 * third_place_odds) / 100) * rest_award)
  const third_place_vip2 = (((25 * third_place_odds) / 100) * rest_award)
  const third_place_vip3 = (((20 * third_place_odds) / 100) * rest_award)
  const fourth_place_vip = (((20 * fourth_place_odds) / 100) * rest_award)
  const fourth_place_vip2 = (((15 * fourth_place_odds) / 100) * rest_award)
  const fifth_place_vip = (((10 * fifth_place_odds) / 100) * rest_award)

  
  console.log('Lucro da casa: '+house_profit)
  console.log()
  console.log('Premio primeiro lugar: '+first_place)
  console.log()
  console.log('Restante: '+rest_award)
  console.log()
  // SEM VIPs
  console.log('Premio segundo lugar, sem VIPs: '+second_place)
  console.log("-".repeat(20))
  // 1 VIPs
  console.log('Premio segundo lugar, 1 VIPs: '+second_place_vip)
  console.log('Premio terceiro lugar VIP: '+third_place_vip)
  console.log("-".repeat(20))
  // 2 VIPs
  console.log('Premio segundo lugar, 2 VIPs: '+second_place_vip2)
  console.log('Premio terceiro lugar VIP: '+third_place_vip2)
  console.log('Premio quarto lugar VIP: '+fourth_place_vip)
  console.log("-".repeat(20))
  // 3 VIPs
  console.log('Premio segundo lugar, 3 VIPs: '+second_place_vip3)
  console.log('Premio terceiro lugar VIP: '+third_place_vip3)
  console.log('Premio quarto lugar VIP: '+fourth_place_vip2)
  console.log('Premio quinto lugar VIP: '+fifth_place_vip)
}

function calcularIngressos(jogadores) {
  const porcentagens = {
    10: 0.4,
    9: 0.2,
    8: 0.1,
    7: 0.1,
    6: 0.05,
    5: 0.05,
  }

  let totalGeral = 0
  const ingressos = Object.entries(porcentagens)
    .map(([valor, porcentagem]) => {
      const quantidade = Math.floor(jogadores * porcentagem)
      totalGeral += quantidade
      return { [valor]: quantidade }
    })
    .reduce((acumulador, atual) => Object.assign(acumulador, atual), {})

  ingressos[10] += jogadores - totalGeral

  return { ingressos, totalJogadores: jogadores }
}

const { ingressos, totalJogadores } = calcularIngressos(128)
console.table(ingressos)

const totalArrecadado = Object.entries(ingressos).reduce(
  (total, [valor, quantidade]) => total + valor * quantidade,
  0
)
console.log("Total arrecadado:", totalArrecadado.toFixed(2))
console.log("Total de jogadores:", totalJogadores)

getpool(totalArrecadado)

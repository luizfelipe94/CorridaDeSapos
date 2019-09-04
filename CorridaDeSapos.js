// const Corrida = require('./CorridaDeSaposThread');
const RodarCorrida = require('./CorridaDeSaposThread');

function main(){
    const NUM_SAPOS = 5;
    const DISTANCIA = 500;
    for (let i = 0; i < NUM_SAPOS; i++) {
        RodarCorrida({nome: `SAPO_${i}`, distanciaTotalCorrida: DISTANCIA})
        .then(resp => console.log(resp))
        .catch(err => console.log(err));    
    }
}

main();
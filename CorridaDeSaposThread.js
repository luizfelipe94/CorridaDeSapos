const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

class CorridaDeSapos {

    PULO_MAXIMO = 50;
    static colocacao = 0;
    
    constructor(nome, distanciaTotalCorrida){
        this._nome = nome;
        this._distanciaTotalCorrida = distanciaTotalCorrida;
        this._distanciaCorrida = 0;
        this._pulo = 0;
        this._pulos = 0;
    }

    static get Colocacao(){
        return this.colocacao;
    }

    sapoImprimindoSituacao(){
        console.log(`O sapo ${this._nome} pulou ${this._pulo} cm e já percorreu ${this._distanciaCorrida} cm`);
    }

    sapoPulando(){
        this._pulos++;
        this._pulo = Math.floor(Math.random() * this.PULO_MAXIMO);
        this._distanciaCorrida += this._pulo;
        if(this._distanciaCorrida > this._distanciaTotalCorrida) this._distanciaCorrida = this._distanciaTotalCorrida;
    }

    // sapoDescansando(){
    //     yield;
    // }
    async sapoDescansando(){
        const delay = () => new Promise(resolve => setTimeout(resolve, 2000));
        await delay();
    }

    colocacaoSapo(){
        console.log('------------------------------------------------------------');
        this.colocacao++;
        console.log(this._nome + " foi o " + "" + "º colocado com " + this._pulos + " pulos");
        console.log('------------------------------------------------------------');
    }

    run(){
        while(this._distanciaCorrida < this._distanciaTotalCorrida){
            this.sapoPulando();
            this.sapoImprimindoSituacao();
            // this.sapoDescansando();
        }
        this.colocacaoSapo();
    }
}

const RodarCorrida = workerData => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(__filename, { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if(code !== 0) reject(new Error(`Worker parou por algum motivo. codigo .: ${code}`));
        });
    }); 
}

if(!isMainThread){
    const Sapo = new CorridaDeSapos(workerData.nome, workerData.distanciaTotalCorrida);
    Sapo.run();
}

module.exports = RodarCorrida;
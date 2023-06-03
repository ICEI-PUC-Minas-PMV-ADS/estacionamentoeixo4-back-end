import Estacionamento from "./Estacionamento"

export class Endereco {
    id?: number
    cep: number
    bairro: string
    endereco: string
    numero: number
    cidade: string
    uf: string
    estacionamento?: Estacionamento
    id_estacionamento?: number
    lat: number
    lgt: number
}
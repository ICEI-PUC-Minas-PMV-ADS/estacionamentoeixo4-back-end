export class Reserva {
    id_cliente: number
    id_estacionamento: number
    duracao: number
    horario_reserva: Date
    id_veiculo: number
    canceledAt?: Date
}

import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateAvaliacaoDto {

    @IsNotEmpty()
    @ApiProperty({
        title: "IdCliente"
    })
    @IsNumber()
    id_cliente: number

    @IsNotEmpty()
    @ApiProperty({
        title: "IdEstacionamento"
    })
    @IsNumber()
    id_estacionamento: number

    @IsNotEmpty()
    @ApiProperty({
        title: "Avaliacao"
    })
    @IsNumber()
    avaliacao: number

    @IsNotEmpty()
    @ApiProperty({
        title: "comentario"
    })
    @IsNumber()
    comentario: string
}

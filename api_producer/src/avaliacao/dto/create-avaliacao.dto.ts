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
        title: "idEstacionamento"
    })
    @IsNumber()
    id_estacionamento: number

    @IsNotEmpty()
    @ApiProperty({
        title: "IdCliente"
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

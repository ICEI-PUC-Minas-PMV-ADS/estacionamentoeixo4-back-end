import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAvaliacaoDto } from './create-avaliacao.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAvaliacaoDto extends PartialType(CreateAvaliacaoDto) {

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

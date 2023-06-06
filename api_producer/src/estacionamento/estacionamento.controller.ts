import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { EstacionamentoService } from './estacionamento.service';
import { CreateEstacionamentoDto } from './dto/create-estacionamento.dto';
import { UpdateEstacionamentoDto } from './dto/update-estacionamento.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EstacionamentoMapper } from './mappers/estacionamento-mapper';
@ApiTags('Estacionamento')
@Controller('estacionamento')
export class EstacionamentoController {
  constructor(private readonly estacionamentoService: EstacionamentoService) { }
  // @UseGuards(AccessTokenGuard)
  @Post('/:id')
  @ApiBody({
    description: 'Criar estacionamento ',
    type: CreateEstacionamentoDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Criar estacionamento',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createEstacionamentoDto: CreateEstacionamentoDto,
    @Param('id') id: string,
  ) {
    let mapperEstacionamento = new EstacionamentoMapper()
    const estacionamento = mapperEstacionamento.mapCreateEstacionamentoDtoToCreateModel(createEstacionamentoDto);
    const endereco = mapperEstacionamento.mapCreateAddressDtoToCreateModel(createEstacionamentoDto);
    return await this.estacionamentoService.create(
      estacionamento,
      endereco,
      Number(id),
    );
  }

  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Recupera um estacionamento',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return await this.estacionamentoService.findAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Recupera um estacionamento',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async find(@Param('id') id: string) {
    return await this.estacionamentoService.findOne(+id);
  }

  @Get('/adm/:id')
  @ApiResponse({
    status: 200,
    description: 'Recupera estacionamentos do adm',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAdmEstacionamentos(@Param('id') id: string) {
    return await this.estacionamentoService.findEstacionamentosAdm(+id);
  }

  @Patch('/atualizar/:id')
  // @ApiBody({
  //   description: 'Atualiza estacionamento ',
  //   type: UpdateEstacionamentoDto,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Atualiza estacionamento',
  // })
  //@ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() estacionamentoDTO: CreateEstacionamentoDto,
  ) {
    let mapperEstacionamento = new EstacionamentoMapper()
    const estacionamento = mapperEstacionamento.mapCreateEstacionamentoDtoToCreateModel(estacionamentoDTO);
    const endereco = mapperEstacionamento.mapCreateAddressDtoToCreateModel(estacionamentoDTO);
    return await this.estacionamentoService.updateOne(
      +id,
      estacionamento,
      endereco,
    );
  }

  @Delete('/deletar/:id_est/:id_adm')
  async remove(@Param('id_est') id_est: string, @Param('id_adm') id_adm: string) {
    return await this.estacionamentoService.remove(+id_est, +id_adm);
  }
}

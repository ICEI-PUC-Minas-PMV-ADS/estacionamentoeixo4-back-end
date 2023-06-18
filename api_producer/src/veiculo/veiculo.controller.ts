import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
@ApiTags('Veículo')
@Controller('veiculo')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) { }

  @Post()
  @ApiBody({ description: 'Veículo criado', type: CreateVeiculoDto })
  @ApiResponse({
    status: 201,
    description: 'Veículo criado com sucesso!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de veículos',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.veiculoService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Recupera  veículo pelo id',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(+id);
  }

  @Get('/cliente/:id')
  @ApiResponse({
    status: 200,
    description: 'Recupera os veículo pelo id do cliente',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOneCliente(@Param('id') id: string) {
    return this.veiculoService.findAllCliente(+id);
  }


  @Patch(':id')
  @ApiBody({ description: 'Veículos', type: UpdateVeiculoDto })
  @ApiResponse({
    status: 200,
    description: 'Atualiza veículo',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(+id, updateVeiculoDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleta veículo',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.veiculoService.remove(+id);
  }
}

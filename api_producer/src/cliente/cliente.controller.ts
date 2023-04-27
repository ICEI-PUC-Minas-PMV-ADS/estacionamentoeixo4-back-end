import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { UpdateClienteDto } from './dto/update-client.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiBody({ description: 'Cria cliente', type: CreateClienteDto })
  @ApiResponse({
    status: 201,
    description: 'Criar cliente',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCliente: CreateClienteDto) {
    return this.clienteService.create(createCliente);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Recupera todos clientes',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Recupera  clientes pelo id',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ description: 'Atualiza cliente', type: UpdateClienteDto })
  @ApiResponse({
    status: 201,
    description: 'Atualiza cliente',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleta cliente',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}

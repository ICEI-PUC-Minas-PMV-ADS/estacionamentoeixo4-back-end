import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdministadorService } from '../services/administrador.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { ManagerMapper } from '../mapper/manager.mapper';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Administrador')
@Controller('administrador')
export class AdministradorController {
  constructor(
    private readonly managerService: AdministadorService,
    private readonly mapper: ManagerMapper,
  ) {}

  @Post()
  @ApiBody({ description: 'Criar administador', type: CreateManagerDto })
  @ApiResponse({
    status: 201,
    description: 'Administrador criado com sucesso!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createManagerDto: CreateManagerDto) {
    console.log(createManagerDto);

    return this.managerService.create(
      this.mapper.mapCreateManagerDtoToCreateManagerModel(createManagerDto),
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Lista de administaradores!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getAll() {
    return this.managerService.getAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Recupera um administrador',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findById(@Param('id') id: string) {
    return this.managerService.findById(+id);
  }

  @Patch(':id')
  @ApiBody({ description: 'Atualiza administador', type: UpdateManagerDto })
  @ApiResponse({
    status: 200,
    description: 'Atualiza  administrador',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managerService.update(
      +id,
      this.mapper.mapUpdateManagerDtoToUpdateManagerModel(updateManagerDto),
    );
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleta  administrador',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}

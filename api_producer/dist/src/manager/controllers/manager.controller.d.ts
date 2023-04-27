import { ManagerService } from '../services/manager.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { ManagerMapper } from '../mapper/manager.mapper';
export declare class ManagerController {
    private readonly managerService;
    private readonly mapper;
    constructor(managerService: ManagerService, mapper: ManagerMapper);
    create(createManagerDto: CreateManagerDto): Promise<import(".prisma/client").Administrador>;
    getAll(): Promise<(import(".prisma/client").Administrador & {
        estacionamentos: import(".prisma/client").EstacionamentoAndAdministradores[];
    })[]>;
    findById(id: string): Promise<import(".prisma/client").Administrador>;
    update(id: string, updateManagerDto: UpdateManagerDto): Promise<import(".prisma/client").Administrador>;
    remove(id: string): Promise<import(".prisma/client").Administrador>;
}

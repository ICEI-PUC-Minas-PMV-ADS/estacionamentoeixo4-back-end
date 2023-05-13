import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { UpdateManagerDto } from '../dto/update-manager.dto';
import { Administrador } from '@prisma/client';
export declare class ManagerService {
    private readonly managerRepository;
    constructor(managerRepository: PrismaService);
    create(CreateManagerDto: CreateManagerDto): Promise<Administrador>;
    findEmail(email: string): Promise<Administrador>;
    findOne(id: number): Promise<Administrador>;
    findOneUuid(uuid: string): Promise<Administrador>;
    getAll(): Promise<(Administrador & {
        estacionamentos: import(".prisma/client").EstacionamentoAndAdministradores[];
    })[]>;
    findById(id: number): Promise<Administrador>;
    update(id: number, updateManagerDto: UpdateManagerDto): Promise<Administrador>;
    remove(id: number): Promise<Administrador>;
}

import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-client.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Cache } from 'cache-manager';
import { Cliente } from '@prisma/client';
export declare class ClienteService {
    private readonly clientRepository;
    private readonly clienteCache;
    constructor(clientRepository: PrismaService, clienteCache: Cache);
    create(createClienteDto: CreateClienteDto): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    findEmail(email: string): Promise<Cliente>;
    update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente>;
    remove(id: number): Promise<Cliente>;
}

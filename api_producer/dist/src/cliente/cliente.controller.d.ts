import { ClienteService } from './cliente.service';
import { UpdateClienteDto } from './dto/update-client.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(createCliente: CreateClienteDto): Promise<import(".prisma/client").Cliente>;
    findAll(): Promise<import(".prisma/client").Cliente[]>;
    findOne(id: string): Promise<import(".prisma/client").Cliente>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<import(".prisma/client").Cliente>;
    remove(id: string): Promise<import(".prisma/client").Cliente>;
}

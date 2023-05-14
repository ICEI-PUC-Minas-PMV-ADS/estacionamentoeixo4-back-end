import { EstacionamentoService } from './estacionamento.service';
import { CreateEstacionamentoDto } from './dto/create-estacionamento.dto';
import { UpdateEstacionamentoDto } from './dto/update-estacionamento.dto';
export declare class EstacionamentoController {
    private readonly estacionamentoService;
    constructor(estacionamentoService: EstacionamentoService);
    create(createEstacionamentoDto: CreateEstacionamentoDto): Promise<import(".prisma/client").Estacionamento>;
    findOne(id: string): Promise<import(".prisma/client").Estacionamento>;
    find(id: string): Promise<import(".prisma/client").Estacionamento[]>;
    update(id: string, updateEstacionamentoDto: UpdateEstacionamentoDto): Promise<import(".prisma/client").Estacionamento>;
    remove(id: string): Promise<any>;
}

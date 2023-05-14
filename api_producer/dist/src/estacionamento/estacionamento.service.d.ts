import { PrismaService } from '@src/prisma/prisma.service';
import { CreateEstacionamentoDto } from './dto/create-estacionamento.dto';
import { Estacionamento } from '@prisma/client';
import { UpdateEstacionamentoDto } from './dto/update-estacionamento.dto';
export declare class EstacionamentoService {
    private readonly clientRepository;
    constructor(clientRepository: PrismaService);
    create(createEstacionamentoDto: CreateEstacionamentoDto): Promise<Estacionamento>;
    findOne(id: number): Promise<Estacionamento>;
    findEstacionamentosAdm(id_adm: number): Promise<Estacionamento[]>;
    updateOne(id: number, updateEstacionamentoDto: UpdateEstacionamentoDto): Promise<Estacionamento>;
    removeOne(id: number): Promise<any>;
}

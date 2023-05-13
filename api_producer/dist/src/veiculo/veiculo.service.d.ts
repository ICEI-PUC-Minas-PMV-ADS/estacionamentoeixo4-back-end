import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { PrismaService } from '@src/prisma/prisma.service';
import { Veiculo } from '@prisma/client';
import { Cache } from 'cache-manager';
export declare class VeiculoService {
    private readonly veiculoRepository;
    private readonly veiculoCache;
    constructor(veiculoRepository: PrismaService, veiculoCache: Cache);
    create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<any>;
    remove(id: number): Promise<any>;
}

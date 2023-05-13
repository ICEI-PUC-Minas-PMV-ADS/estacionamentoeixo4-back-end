import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
export declare class VeiculoController {
    private readonly veiculoService;
    constructor(veiculoService: VeiculoService);
    create(createVeiculoDto: CreateVeiculoDto): Promise<import(".prisma/client").Veiculo>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateVeiculoDto: UpdateVeiculoDto): Promise<any>;
    remove(id: string): Promise<any>;
}

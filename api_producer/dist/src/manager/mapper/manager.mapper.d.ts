import { UpdateManagerDto } from '../dto/update-manager.dto';
import { UpdateManagerModel } from '../model/update-manager.model';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { CreateManagerModel } from '../model/create-manager.model';
export declare class ManagerMapper {
    mapCreateManagerDtoToCreateManagerModel(dto: CreateManagerDto): CreateManagerModel;
    mapUpdateManagerDtoToUpdateManagerModel(dto: UpdateManagerDto): UpdateManagerModel;
}

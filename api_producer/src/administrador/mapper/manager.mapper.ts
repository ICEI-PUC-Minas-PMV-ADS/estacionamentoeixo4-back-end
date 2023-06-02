import { UpdateManagerDto } from '../dto/update-manager.dto';
import { UpdateManagerModel } from '../model/update-manager.model';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { CreateManagerModel } from '../model/create-manager.model';

export class ManagerMapper {
  mapCreateManagerDtoToCreateManagerModel(
    dto: CreateManagerDto,
  ): CreateManagerModel {
    const createManagerModel = new CreateManagerModel();

    createManagerModel.email = dto.email;
    createManagerModel.nome = dto.nome;
    createManagerModel.uuid_firebase = dto.uuid_firebase;

    return createManagerModel;
  }

  mapUpdateManagerDtoToUpdateManagerModel(
    dto: UpdateManagerDto,
  ): UpdateManagerModel {
    const createManagerModel = new UpdateManagerModel();

    createManagerModel.email = dto.email;
    createManagerModel.nome = dto.nome;

    return createManagerModel;
  }
}

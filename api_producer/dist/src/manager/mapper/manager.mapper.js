"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagerMapper = void 0;
const update_manager_model_1 = require("../model/update-manager.model");
const create_manager_model_1 = require("../model/create-manager.model");
class ManagerMapper {
    mapCreateManagerDtoToCreateManagerModel(dto) {
        const createManagerModel = new create_manager_model_1.CreateManagerModel();
        createManagerModel.email = dto.email;
        createManagerModel.nome = dto.nome;
        createManagerModel.id_estacionamento = dto.id_estacionamento;
        return createManagerModel;
    }
    mapUpdateManagerDtoToUpdateManagerModel(dto) {
        const createManagerModel = new update_manager_model_1.UpdateManagerModel();
        createManagerModel.email = dto.email;
        createManagerModel.nome = dto.nome;
        createManagerModel.id_estacionamento = dto.id_estacionamento;
        return createManagerModel;
    }
}
exports.ManagerMapper = ManagerMapper;
//# sourceMappingURL=manager.mapper.js.map
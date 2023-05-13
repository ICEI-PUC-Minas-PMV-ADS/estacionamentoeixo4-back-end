import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { Administrador } from '@prisma/client';
import { CreateManagerDto } from '@src/manager/dto/create-manager.dto';
import { ManagerService } from '@src/manager/services/manager.service';
import { AuthService } from '@src/auth/auth.service';
import { AuthDTO } from '@src/auth/dto/me.input';
import { ClienteService } from '@src/cliente/cliente.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

fdescribe('Testes unitários - Autenticação', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ClienteService,
        JwtService,
        { provide: CACHE_MANAGER, useValue: {} },
        PrismaService,
        ConfigService
      ],
    }).compile();

    service = await module.get<AuthService>(AuthService);
  });

  it('Deve retornar um accessToken a um refreshToken', async () => {
    const userCredentials: AuthDTO = {
        id: 1,
        email: "jhondoezinho@email.com"
    }

    const validTokens = {
        accessToken: "115fsdfdfd1dfs1fds1",
        refreshToken: "aadasa454545as54442121"
    }

    jest.spyOn(service, 'me').mockImplementation(() => Promise.resolve(validTokens))

    const response = await service.me(userCredentials)

    expect(response).toMatchObject(validTokens)
  })

});

using api_consumer.Api.Reserva.Dto;
using api_consumer.Api.Reserva.Entity;
using api_consumer.Api.Reserva.Repository;
using AutoMapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace api_consumer.Api.Reserva.Endpoints
{
    public static class AvaliacaoEndpoints
    {
        public static void MapAvaliacao(this WebApplication app)
        {

            app.MapGet("api/v1/avaliacao/{idEstacionamento}", async (IAvaliacaoRepo repo, IMapper mapper,  int idEstacionamento) =>
            {
                var avaliacao = await repo.GetAvaliacaoByIdEstacionamento(idEstacionamento);

                if (avaliacao == null) {
                    return Results.NotFound();
                }

                var avaliacaoDto = mapper.Map<AvaliacaoReadDto>(avaliacao);

                return Results.Ok(avaliacaoDto);
            });

            app.MapPost("api/v1/avaliacao", async (IAvaliacaoRepo repo, IMapper mapper, AvaliacaoCreateDto avaliacaoCreateDto) => {

                var avaliacao = mapper.Map<AvaliacaoEntity>(avaliacaoCreateDto);

                await repo.CreateAvaliacao(avaliacao);
                await repo.SaveChanges();

            });
        }

    }
}

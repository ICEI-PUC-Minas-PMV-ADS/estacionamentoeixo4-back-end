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
            app.MapPost("api/v1/avaliacao", async (AvaliacaoRepo repo, IMapper mapper, AvaliacaoCreateDto avaliacaoCreateDto) =>
            {

                var avaliacao = mapper.Map<AvaliacaoEntity>(avaliacaoCreateDto);

                await repo.CreateAvaliacao(avaliacao);
                await repo.SaveChanges();


            });
        }

    }
}

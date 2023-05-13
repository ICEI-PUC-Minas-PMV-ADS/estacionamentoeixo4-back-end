using System.Data;
using api_consumer.Api.Reserva.Dto;
using api_consumer.Api.Reserva.Entity;
using Microsoft.EntityFrameworkCore;

namespace api_consumer.Api.Reserva.Repository
{
    public class AvaliacaoRepo : IAvaliacaoRepo
    {
        private readonly AppDbContext _context;

        public AvaliacaoRepo(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateAvaliacao(AvaliacaoEntity avaliacao)
        {
            if (avaliacao == null)
            {
                throw new ArgumentNullException(nameof(avaliacao));
            }

            await _context.AddAsync(avaliacao);
            await _context.SaveChangesAsync();
        }

        public async Task<AvaliacaoEntity> GetAvaliacaoByIdEstacionamento(int idEstacionamento) {
            return await _context.avaliacao.FirstOrDefaultAsync(a => a.id_estacionamento == idEstacionamento);
        }
        //public void DeleteReserva(ReservaEntity reserva)
        //{
        //    if (reserva == null)
        //    {
        //        throw new ArgumentNullException(nameof(reserva));
        //    }
        //    _context.reserva.Remove(reserva);
        //}

        //public async Task<IEnumerable<ReservaEntity>> GetAllReservas()
        //{
        //    return await _context.reserva!.ToListAsync();
        //}

        //public async Task<ReservaEntity>? GetReservaEntityById(int idCliente, int idEstacionamento)
        //{
        //    return await _context.reserva.FirstOrDefaultAsync(o => o.id_cliente == idCliente && o.id_estacionamento == idEstacionamento);
        //}

        public async Task SaveChanges()
        {

            await _context.SaveChangesAsync();
        }
    }
}
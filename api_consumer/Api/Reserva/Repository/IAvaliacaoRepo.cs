using api_consumer.Api.Reserva.Entity;

namespace api_consumer.Api.Reserva.Repository
{
    public interface IAvaliacaoRepo
    {
        Task SaveChanges();
        //Task<ReservaEntity>? GetReservaEntityById(int idCliente, int idEstacionamento); 
        //Task<IEnumerable<ReservaEntity>> GetAllReservas(); 
        Task CreateAvaliacao(AvaliacaoEntity avaliacao);
        Task<AvaliacaoEntity> GetAvaliacaoByIdEstacionamento(int idEstacionamento);
        //void DeleteReserva(ReservaEntity reserva);
    }
}
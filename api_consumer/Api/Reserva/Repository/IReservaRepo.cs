using api_consumer.Api.Reserva.Entity;

namespace api_consumer.Api.Reserva.Repository
{
    public interface IReservaRepo
    {
        Task SaveChanges();
        Task<ReservaEntity>? GetReservaEntityById(int idCliente, int idEstacionamento); //implementado
        Task<IEnumerable<ReservaEntity>> GetAllReservas(); //implementado
        Task CreateReserva(ReservaEntity reserva); //implementado

        void DeleteReserva(ReservaEntity reserva);
    }
}
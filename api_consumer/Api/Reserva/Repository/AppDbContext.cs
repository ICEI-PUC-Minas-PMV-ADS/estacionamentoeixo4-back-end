using Microsoft.EntityFrameworkCore;
using api_consumer.Api.Reserva.Entity;

namespace api_consumer.Api.Reserva.Repository
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<ReservaEntity> reserva { get; set; }
        public DbSet<AvaliacaoEntity> avaliacao { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReservaEntity>(entity =>
            {
                entity.HasKey(r => new { r.id_reserva });
                entity.Property(e => e.id_cliente).IsRequired();
                entity.Property(e => e.id_estacionamento).IsRequired();
                entity.Property(e => e.duracao).IsRequired();
                entity.Property(e => e.horario_reserva).IsRequired();
                entity.Property(e => e.id_veiculo).IsRequired();
                entity.Property(e => e.canceledAt);
            });

            modelBuilder.Entity<AvaliacaoEntity>(entity =>
            {
                entity.HasKey(r => new { r.id_avaliacao });
                entity.Property(e => e.id_cliente).IsRequired();
                entity.Property(e => e.id_estacionamento).IsRequired();
                entity.Property(e => e.avaliacao).IsRequired();
                entity.Property(e => e.comentario).IsRequired();
            });

            // Debater cominicação com o outro back-end
            // modelBuilder.Entity<ReservaEntity>()
            //     .HasOne(r => r.Cliente) define a relação com a entidade Cliente
            //     .WithMany(c => c.Reservas) define a propriedade de navegação inversa
            //     .HasForeignKey(r => r.IdCliente); define a chave estrangeira como IdCliente

            // modelBuilder.Entity<ReservaEntity>()
            //     .HasOne(r => r.Estacionamento) define a relação com a entidade Estacionamento
            //     .WithMany(e => e.Reservas) define a propriedade de navegação inversa
            //     .HasForeignKey(r => r.IdEstacionamento); define a chave estrangeira como IdEstacionamento
        }
    }
}
using System.ComponentModel.DataAnnotations;

namespace api_consumer.Api.Reserva.Entity
{
    public class ReservaEntity
    {
        [Key]
        public int id_cliente { get; set; }

        [Key]
        public int id_veiculo { get; set; }

        [Required]
        public int id_estacionamento { get; set; }

        [Required]
        public int duracao { get; set; }

        [Required]
        public DateTime horario_reserva { get; set; }

        public DateTime? canceledAt { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_consumer.Api.Reserva.Entity
{
    public class ReservaEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id_reserva { get; set; }

        [Required]
        public int id_cliente { get; set; }

        [Required]
        public int id_veiculo { get; set; }

        [Required]
        public int id_estacionamento { get; set; }

        [Required]
        public int duracao { get; set; }

        [Required]
        public DateTime horario_reserva { get; set; } = DateTime.Now;

        public DateTime? canceledAt { get; set; }
    }
}
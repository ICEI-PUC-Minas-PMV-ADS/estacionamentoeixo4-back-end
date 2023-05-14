using System.ComponentModel.DataAnnotations;

namespace api_consumer.Api.Reserva.Entity
{
    public class AvaliacaoEntity
    {
        [Key]
        public int id_avaliacao { get; set; }
        [Required]
        public int id_cliente { get; set; }
        [Required]
        public int id_estacionamento { get; set; }
        [Required]
        public string avaliacao { get; set; }
        [Required]
        public string? comentario { get; set; }

    }
}

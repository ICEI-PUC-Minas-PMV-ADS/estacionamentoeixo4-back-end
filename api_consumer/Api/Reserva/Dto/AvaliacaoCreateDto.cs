using System.ComponentModel.DataAnnotations;

namespace api_consumer.Api.Reserva.Dto
{
    public class AvaliacaoCreateDto
    {
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
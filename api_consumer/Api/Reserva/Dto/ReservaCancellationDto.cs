using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_consumer.Api.Reserva.Dto
{
    public class ReservaCancellationDto
    {
        public int id_cliente { get; set; }

        public int id_estacionamento { get; set; }

        public DateTime canceledAt { get; set; }
    }
}
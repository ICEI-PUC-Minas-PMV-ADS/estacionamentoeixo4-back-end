using api_consumer.Api.Reserva.Dto;
using api_consumer.Api.Reserva.Entity;
using Newtonsoft.Json;

namespace api_consumer.Api.Reserva.Helpers;

public class UtilityFunctions
{
    public static ReservaEntity parseKafkaMessageToReservaDTO(String kafkaMessage)
    {

        ReservaEntity reservaModel = JsonConvert.DeserializeObject<ReservaEntity>(kafkaMessage);
        return reservaModel;
    }

    public static ReservaCancellationDto parseKafkaMessageToReservaCancellationDto(String kafkaMessage)
    {

        ReservaCancellationDto reservaModel = JsonConvert.DeserializeObject<ReservaCancellationDto>(kafkaMessage);
        return reservaModel;
    }
}
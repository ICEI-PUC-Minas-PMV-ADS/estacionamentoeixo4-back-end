using api_consumer.Api.Reserva.Dto;
using api_consumer.Api.Reserva.Entity;
using api_consumer.Api.Reserva.Helpers;
using static api_consumer.Api.Reserva.Helpers.UtilityFunctions;


namespace ConsumerTests {
    public class UtilityFunctionsTest {
        [Fact(DisplayName = "Teste Resultado Verdadeiro 1")]
        public void parseKafkaMessageToReservaDTOTest1() 
        {
            var kafkaMessage = "{'id_cliente':1,'id_veiculo':1,'id_estacionamento':1,'duracao':111111,'horario_reserva':'2023-04-21T22:31:34.759Z'}";

            ReservaEntity reservaEntityDto = UtilityFunctions.parseKafkaMessageToReservaDTO(kafkaMessage);

            Assert.NotNull(reservaEntityDto);
            Assert.Equal(reservaEntityDto.id_estacionamento, 1);

        }

        [Fact (DisplayName = "Teste Resultado Falso 2")]
        public void parseKafkaMessageToReservaDTOTest2()
        {
            var kafkaMessage = " ";

            ReservaEntity reservaEntityDto = UtilityFunctions.parseKafkaMessageToReservaDTO(kafkaMessage);

            Assert.Null(reservaEntityDto);

        }

        [Fact(DisplayName = "Teste Resultado Verdadeiro 3")]
        public void parseKafkaMessageToReservaCancellationDtoTest3()
        {
            var kafkaMessage = "{'id_cliente':2,'id_veiculo':2,'id_estacionamento':2,'duracao':22222,'horario_reserva':'2023-04-21T22:31:34.759Z'}";

            ReservaCancellationDto reservaCancellationDto = UtilityFunctions.parseKafkaMessageToReservaCancellationDto(kafkaMessage);

            Assert.NotNull(reservaCancellationDto);
            Assert.Equal(reservaCancellationDto.id_estacionamento, 2);
        }

        [Fact(DisplayName = "Teste Resultado Falso 4")]
        public void parseKafkaMessageToReservaCancellationDtoTest4()
        {
            var kafkaMessage = "{'id_cliente':2,'id_veiculo':2,'id_estacionamento':2,'duracao':22222,'horario_reserva':'2023-04-21T22:31:34.759Z'}";

            ReservaCancellationDto reservaCancellationDto = UtilityFunctions.parseKafkaMessageToReservaCancellationDto(kafkaMessage);

            Assert.NotEqual(reservaCancellationDto.id_estacionamento, 3);

        }

    }
}
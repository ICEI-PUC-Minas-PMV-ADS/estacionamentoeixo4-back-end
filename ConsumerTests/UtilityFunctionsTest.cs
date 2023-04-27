using api_consumer.Api.Reserva.Entity;
using api_consumer.Api.Reserva.Helpers;
using static api_consumer.Api.Reserva.Helpers.UtilityFunctions;


namespace ConsumerTests {
    public class UtilityFunctionsTest {
        [Fact]
        public void parseKafkaMessageToReservaDTOTest() {

            var kafkaMessage = "{'id_cliente':1,'id_veiculo':1,'id_estacionamento':1,'duracao':111111,'horario_reserva':'2023-04-21T22:31:34.759Z'}";

            ReservaEntity reservaEntityDto = UtilityFunctions.parseKafkaMessageToReservaDTO(kafkaMessage);

            Assert.NotNull(reservaEntityDto);
            Assert.Equal(reservaEntityDto.id_estacionamento, 1);

        }
    }
}
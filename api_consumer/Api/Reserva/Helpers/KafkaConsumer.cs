using api_consumer.Api.Reserva.Entity;
using Confluent.Kafka;
using api_consumer.Api.Reserva.Repository;
using api_consumer.Api.Reserva.Helpers;
using AutoMapper;
using Newtonsoft.Json.Linq;
using api_consumer.Api.Reserva.Dto;

public class KafkaConsumer : BackgroundService
{
    private readonly ConsumerConfig _consumerConfig;
    private readonly ProducerConfig _producerConfig;

    private readonly ReservaRepo _reservaRepo;
    private readonly IMapper _mapper;

    public KafkaConsumer(AppDbContext dbContext)
    {
        _consumerConfig = new ConsumerConfig
        {
            BootstrapServers = "host.docker.internal:9094",
            GroupId = "reserva-consumer-group",
            AutoOffsetReset = AutoOffsetReset.Earliest,
            EnableAutoCommit = true,
        };

        _producerConfig = new ProducerConfig
        {

            BootstrapServers = "host.docker.internal:9094"
        };

        _reservaRepo = new ReservaRepo(dbContext);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var consumer = new ConsumerBuilder<Ignore, string>(_consumerConfig).Build();
        consumer.Subscribe("reservar_vaga");

        using var producer = new ProducerBuilder<string, string>(_producerConfig).Build();

        while (true)
        {
            try
            {
                var message = consumer.Consume(stoppingToken);
                var kafkaJson = JObject.Parse(message.Value);
                var methodName = kafkaJson["method"].ToString();
                var data = kafkaJson["data"].ToString();

                Console.WriteLine($"Received message: {kafkaJson} at {message.TopicPartitionOffset}");

                if (methodName == "create")
                {
                    try
                    {
                        ReservaEntity reserva = UtilityFunctions.parseKafkaMessageToReservaDTO(data);

                        await _reservaRepo.CreateReserva(reserva);

                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Kafka.consumer.createReserva.error: " + e);
                        throw;
                    }
                }

                if (methodName == "update")
                {
                    try
                    {

                        ReservaCancellationDto reservaCancellation = UtilityFunctions.parseKafkaMessageToReservaCancellationDto(data);

                        await _reservaRepo.UpdateReserva(reservaCancellation);

                    }
                    catch (Exception e)
                    {
                        Console.WriteLine("Kafka.consumer.createReserva.error: " + e);
                        throw;
                    }
                }

                var response = $"Response to message {message.Value}";
                var responseTopic = new TopicPartition("reservar_vaga.reply", message.TopicPartition.Partition);
                var responseMessage = new Message<string, string>
                {
                    Key = "reserva",
                    Value = response
                };

                await producer.ProduceAsync(responseTopic, responseMessage);

                consumer.Commit(message);
            }
            catch (ConsumeException ex)
            {
                Console.WriteLine($"Error while consuming from Kafka: {ex.Error.Reason}");
            }
        }
    }
}
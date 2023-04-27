using api_consumer.Api.Reserva.Helpers;
using api_consumer.Api.Reserva.Repository;
using Kafka.Public;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.SwaggerConfigBuilder();

// Conexão com o banco de dados
string pgsqlConnectionStr = builder.Configuration.GetSection("ConnectionStrings:DefaultConnection")?.Value;
builder.Services.AddDbContextPool<AppDbContext>(options => options.UseNpgsql(pgsqlConnectionStr));
builder.Services.AddScoped<IReservaRepo, ReservaRepo>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Setup do Kafka
var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();
KafkaConsumer Consumer = new KafkaConsumer(dbContext);
CancellationToken token = new();
Consumer.StartAsync(token);

app.Run();

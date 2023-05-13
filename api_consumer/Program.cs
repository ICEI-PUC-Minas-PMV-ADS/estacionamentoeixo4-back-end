using api_consumer.Api.Reserva.Endpoints;
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
builder.Services.AddScoped<IAvaliacaoRepo, AvaliacaoRepo>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api Consumer v1");
});

app.MapGet("/", async context =>
{
    context.Response.Redirect("/swagger");
});


app.MapAvaliacao();

// Setup do Kafka em uma thread separada
Task.Run(() =>
{
    var dbContext = app.Services.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>();
    KafkaConsumer Consumer = new KafkaConsumer(dbContext);
    CancellationToken token = new();
    Consumer.StartAsync(token).Wait(); // Usamos Wait() para bloquear essa thread, mas isso não vai bloquear a execução do servidor principal
});

app.Run();

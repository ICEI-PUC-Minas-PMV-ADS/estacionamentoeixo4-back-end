using Microsoft.OpenApi.Models;

namespace api_consumer.Api.Reserva.Helpers
{
    public static class SwaggerConfig
    {
        public static void SwaggerConfigBuilder(this WebApplicationBuilder builder)
        {
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new OpenApiInfo
                    {
                        Title = "API Consumer",
                        Description = "Descrição em construção",
                        Version = "v1",
                    });
            });
        }
    }
}
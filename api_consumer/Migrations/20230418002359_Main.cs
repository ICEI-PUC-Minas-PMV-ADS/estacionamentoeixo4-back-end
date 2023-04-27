using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api_consumer.Migrations
{
    /// <inheritdoc />
    public partial class Main : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "reserva",
                columns: table => new
                {
                    id_cliente = table.Column<int>(type: "integer", nullable: false),
                    id_estacionamento = table.Column<int>(type: "integer", nullable: false),
                    duracao = table.Column<int>(type: "integer", nullable: false),
                    horario_reserva = table.Column<DateTime>(type: "timestamp", nullable: false),
                    id_veiculo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reserva", x => new { x.id_cliente, x.id_estacionamento });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reserva");
        }
    }
}

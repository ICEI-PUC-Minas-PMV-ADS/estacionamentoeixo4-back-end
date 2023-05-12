using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace api_consumer.Migrations
{
    /// <inheritdoc />
    public partial class adicionandoTabelaAvaliacao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_reserva",
                table: "reserva");

            migrationBuilder.AlterColumn<DateTime>(
                name: "horario_reserva",
                table: "reserva",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp");

            migrationBuilder.AddColumn<int>(
                name: "id_reserva",
                table: "reserva",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<DateTime>(
                name: "canceledAt",
                table: "reserva",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_reserva",
                table: "reserva",
                column: "id_reserva");

            migrationBuilder.CreateTable(
                name: "avaliacao",
                columns: table => new
                {
                    id_avaliacao = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_cliente = table.Column<int>(type: "integer", nullable: false),
                    id_estacionamento = table.Column<int>(type: "integer", nullable: false),
                    avaliacao = table.Column<string>(type: "text", nullable: false),
                    comentario = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_avaliacao", x => x.id_avaliacao);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "avaliacao");

            migrationBuilder.DropPrimaryKey(
                name: "PK_reserva",
                table: "reserva");

            migrationBuilder.DropColumn(
                name: "id_reserva",
                table: "reserva");

            migrationBuilder.DropColumn(
                name: "canceledAt",
                table: "reserva");

            migrationBuilder.AlterColumn<DateTime>(
                name: "horario_reserva",
                table: "reserva",
                type: "timestamp",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

            migrationBuilder.AddPrimaryKey(
                name: "PK_reserva",
                table: "reserva",
                columns: new[] { "id_cliente", "id_estacionamento" });
        }
    }
}

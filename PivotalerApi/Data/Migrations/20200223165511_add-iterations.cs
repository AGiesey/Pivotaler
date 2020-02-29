using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Data.Migrations
{
    public partial class additerations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Iterations",
                columns: table => new
                {
                    IterationId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false),
                    InitialPoints = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Iterations", x => x.IterationId);
                });

            migrationBuilder.CreateTable(
                name: "IterationDataPoints",
                columns: table => new
                {
                    IterationDataPointId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DateTime = table.Column<DateTime>(nullable: false),
                    IterationId = table.Column<int>(nullable: false),
                    RemainingPoints = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IterationDataPoints", x => x.IterationDataPointId);
                    table.ForeignKey(
                        name: "FK_IterationDataPoints_Iterations_IterationId",
                        column: x => x.IterationId,
                        principalTable: "Iterations",
                        principalColumn: "IterationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_IterationDataPoints_IterationId",
                table: "IterationDataPoints",
                column: "IterationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IterationDataPoints");

            migrationBuilder.DropTable(
                name: "Iterations");
        }
    }
}

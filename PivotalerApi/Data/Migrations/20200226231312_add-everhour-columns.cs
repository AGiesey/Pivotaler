using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class addeverhourcolumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InitialEverhourPoints",
                table: "Iterations",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RemainingEverhourPoints",
                table: "IterationDataPoints",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialEverhourPoints",
                table: "Iterations");

            migrationBuilder.DropColumn(
                name: "RemainingEverhourPoints",
                table: "IterationDataPoints");
        }
    }
}

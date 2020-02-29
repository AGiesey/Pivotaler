using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class modifypivotaluser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PivotalUserId",
                table: "PivotalUsers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "PivotalUserInitials",
                table: "PivotalUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PivotalUserInitials",
                table: "PivotalUsers");

            migrationBuilder.AlterColumn<int>(
                name: "PivotalUserId",
                table: "PivotalUsers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}

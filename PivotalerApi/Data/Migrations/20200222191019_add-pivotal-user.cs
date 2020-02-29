using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class addpivotaluser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PivotalUsers",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    PivotalUserId = table.Column<int>(nullable: false),
                    PivotalApiKey = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PivotalUsers", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_PivotalUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PivotalUsers");
        }
    }
}

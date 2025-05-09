using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateDBInMySql6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HandWriting_User_UserId1",
                table: "HandWriting");

            migrationBuilder.DropIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "HandWriting");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "HandWriting",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_HandWriting_User_UserId1",
                table: "HandWriting",
                column: "UserId1",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}

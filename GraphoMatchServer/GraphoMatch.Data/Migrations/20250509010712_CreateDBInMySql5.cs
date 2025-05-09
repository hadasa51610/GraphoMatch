using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class CreateDBInMySql5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting");

            migrationBuilder.CreateIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting",
                column: "UserId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting");

            migrationBuilder.CreateIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting",
                column: "UserId1",
                unique: true);
        }
    }
}

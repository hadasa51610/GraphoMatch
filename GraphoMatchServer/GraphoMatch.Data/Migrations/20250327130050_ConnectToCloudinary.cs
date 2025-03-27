using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class ConnectToCloudinary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "HandWriting",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "UserId1",
                table: "HandWriting",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId2",
                table: "HandWriting",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting",
                column: "UserId1",
                unique: true,
                filter: "[UserId1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HandWriting_UserId2",
                table: "HandWriting",
                column: "UserId2",
                unique: true,
                filter: "[UserId2] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_HandWriting_User_UserId1",
                table: "HandWriting",
                column: "UserId1",
                principalTable: "User",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_HandWriting_User_UserId2",
                table: "HandWriting",
                column: "UserId2",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HandWriting_User_UserId1",
                table: "HandWriting");

            migrationBuilder.DropForeignKey(
                name: "FK_HandWriting_User_UserId2",
                table: "HandWriting");

            migrationBuilder.DropIndex(
                name: "IX_HandWriting_UserId1",
                table: "HandWriting");

            migrationBuilder.DropIndex(
                name: "IX_HandWriting_UserId2",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "UserId2",
                table: "HandWriting");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddJobEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HandWriting_User_UserId2",
                table: "HandWriting");

            migrationBuilder.DropIndex(
                name: "IX_HandWriting_UserId2",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "UserId2",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "Recommendation",
                table: "GraphologyAnalysis");

            migrationBuilder.CreateTable(
                name: "Job",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salary = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Job", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "JobUser",
                columns: table => new
                {
                    JobsId = table.Column<int>(type: "int", nullable: false),
                    SeekersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobUser", x => new { x.JobsId, x.SeekersId });
                    table.ForeignKey(
                        name: "FK_JobUser_Job_JobsId",
                        column: x => x.JobsId,
                        principalTable: "Job",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobUser_User_SeekersId",
                        column: x => x.SeekersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobUser_SeekersId",
                table: "JobUser",
                column: "SeekersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobUser");

            migrationBuilder.DropTable(
                name: "Job");

            migrationBuilder.AddColumn<int>(
                name: "UserId2",
                table: "HandWriting",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Recommendation",
                table: "GraphologyAnalysis",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_HandWriting_UserId2",
                table: "HandWriting",
                column: "UserId2",
                unique: true,
                filter: "[UserId2] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_HandWriting_User_UserId2",
                table: "HandWriting",
                column: "UserId2",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}

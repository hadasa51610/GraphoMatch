using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeCreatedAtToPosted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GraphologyAnalysis_HandWritingId",
                table: "GraphologyAnalysis");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Job",
                newName: "Posted");

            migrationBuilder.CreateIndex(
                name: "IX_GraphologyAnalysis_HandWritingId",
                table: "GraphologyAnalysis",
                column: "HandWritingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GraphologyAnalysis_HandWritingId",
                table: "GraphologyAnalysis");

            migrationBuilder.RenameColumn(
                name: "Posted",
                table: "Job",
                newName: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_GraphologyAnalysis_HandWritingId",
                table: "GraphologyAnalysis",
                column: "HandWritingId",
                unique: true);
        }
    }
}

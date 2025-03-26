using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixFeedbackEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FeedBack_GraphologyAnalysis_AnalysisId",
                table: "FeedBack");

            migrationBuilder.DropIndex(
                name: "IX_FeedBack_AnalysisId",
                table: "FeedBack");

            migrationBuilder.DropColumn(
                name: "AnalysisId",
                table: "FeedBack");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "FeedBack");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnalysisId",
                table: "FeedBack",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "FeedBack",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FeedBack_AnalysisId",
                table: "FeedBack",
                column: "AnalysisId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FeedBack_GraphologyAnalysis_AnalysisId",
                table: "FeedBack",
                column: "AnalysisId",
                principalTable: "GraphologyAnalysis",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

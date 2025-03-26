using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GraphoMatch.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AnalysisDate",
                table: "GraphologyAnalysis",
                newName: "UploadedAt");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "HandWriting",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "GraphologyAnalysis",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UploadedAt",
                table: "FeedBack",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "HandWriting");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "GraphologyAnalysis");

            migrationBuilder.DropColumn(
                name: "UploadedAt",
                table: "FeedBack");

            migrationBuilder.RenameColumn(
                name: "UploadedAt",
                table: "GraphologyAnalysis",
                newName: "AnalysisDate");
        }
    }
}

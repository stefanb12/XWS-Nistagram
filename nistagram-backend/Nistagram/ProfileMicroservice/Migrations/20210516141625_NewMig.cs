using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProfileMicroservice.Migrations
{
    public partial class NewMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    MobilePhone = table.Column<string>(nullable: true),
                    DateOfBirth = table.Column<DateTime>(nullable: false),
                    Gender = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "DateOfBirth", "Email", "Gender", "MobilePhone", "Password", "Username" },
                values: new object[] { 1L, new DateTime(1998, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "user1@gmail.com", 0, "+381 60 55 88 444", "pass1", "user1" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "DateOfBirth", "Email", "Gender", "MobilePhone", "Password", "Username" },
                values: new object[] { 2L, new DateTime(1998, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "user2@gmail.com", 0, "+381 60 55 88 444", "pass2", "user2" });

            migrationBuilder.InsertData(
                table: "User",
                columns: new[] { "Id", "DateOfBirth", "Email", "Gender", "MobilePhone", "Password", "Username" },
                values: new object[] { 3L, new DateTime(1998, 12, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "user3@gmail.com", 0, "+381 60 55 88 444", "pass3", "user3" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User");
        }
    }
}

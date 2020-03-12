using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Entityframework.Migrations
{
    public partial class AddedPasswordSecurity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Person");

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordHash",
                table: "Person",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Person",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Person");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Person");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Person",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

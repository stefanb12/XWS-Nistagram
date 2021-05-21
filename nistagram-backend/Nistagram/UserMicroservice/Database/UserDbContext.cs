using Microsoft.EntityFrameworkCore;
using ProfileMicroservice.Model;
using ProfileMicroservice.Model.Enum;
using System;

namespace ProfileMicroservice.Database
{
    public class UserDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UserDbContext() : base() { }

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseLazyLoadingProxies();
                optionsBuilder.UseMySql(CreateConnectionStringFromEnvironment());
            }
        }

        private string CreateConnectionStringFromEnvironment()
        {
            string server = Environment.GetEnvironmentVariable("DATABASE_HOST") ?? "localhost";
            string port = Environment.GetEnvironmentVariable("DATABASE_PORT") ?? "3306";
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "UserMicroserviceDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "user1", Password = "pass1", Email = "user1@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20) },
                new User { Id = 2, Username = "user2", Password = "pass2", Email = "user2@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20) },
                new User { Id = 3, Username = "user3", Password = "pass3", Email = "user3@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20) }
            );
    }
    }
}

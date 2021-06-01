using Microsoft.EntityFrameworkCore;
using NotificationMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NotificationMicroservice.Database
{
    public class NotificationDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public NotificationDbContext() : base() { }

        public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options) { }

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
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "NotificationMicroserviceDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profile>().HasData(
                new Profile { Id = 1, OriginalId = 1, Username = "user1", ImageName = "asddsad.png" },
                new Profile { Id = 2, OriginalId = 2, Username = "user2", ImageName = "asddsad.png" },
                new Profile { Id = 3, OriginalId = 3, Username = "user3", ImageName = "asddsad.png" }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, OriginalId = "asdasd", ImageName = "asddsad.png" },
                new Post { Id = 2, OriginalId = "asdasd", ImageName = "asddsad.png" },
                new Post { Id = 3, OriginalId = "asdasd", ImageName = "asddsad.png" }
            );

            modelBuilder.Entity<Notification>().HasData(
                new Notification { Id = 1, Time = new DateTime(2021, 06, 01), Content = "user2 follow you", Seen = false, FollowRequest = false, ReceiverId = 1, SenderId = 2, PostId = 1 },
                new Notification { Id = 2, Time = new DateTime(2021, 06, 01), Content = "user3 follow you", Seen = true, FollowRequest = false, ReceiverId = 1, SenderId = 3, PostId = 2 },
                new Notification { Id = 3, Time = new DateTime(2021, 06, 01), Content = "user2 want to follow you", Seen = false, FollowRequest = false, ReceiverId = 3, SenderId = 2, PostId = 3 }
            );
    }
    }
}

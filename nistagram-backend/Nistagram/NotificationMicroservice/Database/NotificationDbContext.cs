using Microsoft.EntityFrameworkCore;
using NotificationMicroservice.Model;
using System;

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
                new Profile { Id = 1, OriginalId = 1, Username = "stefanb", ImageName = "user1213352029.jpg" },
                new Profile { Id = 2, OriginalId = 2, Username = "matijam", ImageName = "user2213352029.jpg" },
                new Profile { Id = 3, OriginalId = 3, Username = "aleksai", ImageName = "user3213352029.png" },
                new Profile { Id = 4, OriginalId = 4, Username = "stefans", ImageName = "user4213352029.png" },
                new Profile { Id = 5, OriginalId = 5, Username = "majam", ImageName = "user5213352029.jpg" }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, OriginalId = 1, ImageName = "2212424861.png" },
                new Post { Id = 2, OriginalId = 2, ImageName = "2212424862.png" },
                new Post { Id = 3, OriginalId = 3, ImageName = "2212424862.png" }
            );

            modelBuilder.Entity<Notification>().HasData(
                new Notification { Id = 1, Time = new DateTime(2021, 06, 05), Content = "majam wants to follow you.", Seen = false, FollowRequest = true, ReceiverId = 2, SenderId = 5, PostId = 1 },
                new Notification { Id = 2, Time = new DateTime(2021, 06, 05), Content = "majam wants to follow you.", Seen = false, FollowRequest = true, ReceiverId = 3, SenderId = 5, PostId = 1 },
                new Notification { Id = 3, Time = new DateTime(2021, 06, 03), Content = "matijam started following you.", Seen = false, FollowRequest = false, ReceiverId = 1, SenderId = 2, PostId = 1 },
                new Notification { Id = 4, Time = new DateTime(2021, 06, 04), Content = "aleksai started following you.", Seen = false, FollowRequest = false, ReceiverId = 1, SenderId = 3, PostId = 1 },
                new Notification { Id = 5, Time = new DateTime(2021, 06, 05), Content = "stefanb started following you.", Seen = false, FollowRequest = false, ReceiverId = 2, SenderId = 1, PostId = 1 },
                new Notification { Id = 6, Time = new DateTime(2021, 06, 03), Content = "aleksai started following you.", Seen = false, FollowRequest = false, ReceiverId = 2, SenderId = 3, PostId = 1 },
                new Notification { Id = 7, Time = new DateTime(2021, 06, 04), Content = "stefanb started following you.", Seen = false, FollowRequest = false, ReceiverId = 3, SenderId = 1, PostId = 1 },
                new Notification { Id = 8, Time = new DateTime(2021, 06, 05), Content = "matijam started following you.", Seen = false, FollowRequest = false, ReceiverId = 4, SenderId = 2, PostId = 1 },
                new Notification { Id = 9, Time = new DateTime(2021, 06, 04), Content = "stefanb started following you.", Seen = false, FollowRequest = false, ReceiverId = 5, SenderId = 1, PostId = 1 }
            );
        }
    }
}

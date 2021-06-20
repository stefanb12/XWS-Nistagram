using InappropriateContentMicroservice.Model;
using InappropriateContentMicroservice.Model.Enum;
using Microsoft.EntityFrameworkCore;
using System;

namespace InappropriateContentMicroservice.Database
{
    public class InappropriateContentDbContext : DbContext
    {
        public DbSet<InappropriateContent> InappropriateContents { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Story> Stories { get; set; }

        public InappropriateContentDbContext() : base() { }

        public InappropriateContentDbContext(DbContextOptions<InappropriateContentDbContext> options) : base(options) { }

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
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "InappropriateContentMicroserviceDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Profile>().HasData(
                new Profile { Id = 1, OriginalId = 1, Username = "stefanb", ImageName = "user1213352029.jpg"},
                new Profile { Id = 2, OriginalId = 2, Username = "matijam", ImageName = "user2213352029.jpg"},
                new Profile { Id = 3, OriginalId = 3, Username = "aleksai", ImageName = "user3213352029.png"},
                new Profile { Id = 4, OriginalId = 4, Username = "stefans", ImageName = "user4213352029.png"},
                new Profile { Id = 5, OriginalId = 5, Username = "majam", ImageName = "user5213352029.jpg"}
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, OriginalId = 1, ImageName = "2212424861.png", Deleted = false },
                new Post { Id = 2, OriginalId = 2, ImageName = "2212424862.png", Deleted = false },
                new Post { Id = 3, OriginalId = 3, ImageName = "2212424862.png", Deleted = false }
            );

            modelBuilder.Entity<Story>().HasData(
                new Story { Id = 1, OriginalId = "60bd70ad107c45e92fd80692", ImageName = "sc2210938836.jpg", Deleted = false },
                new Story { Id = 2, OriginalId = "60bd70ad107c45e92fd80693", ImageName = "sc1211007001.jpg", Deleted = false },
                new Story { Id = 3, OriginalId = "60bd70ad107c45e92fd80694", ImageName = "2212424861.jpg", Deleted = false },
                new Story { Id = 4, OriginalId = "60bd70ad107c45e92fd80695", ImageName = "2212424862.jpg", Deleted = false },
                new Story { Id = 5, OriginalId = "60bd70ad107c45e92fd80696", ImageName = "2212424863.jpg", Deleted = false }
            );

            modelBuilder.Entity<InappropriateContent>().HasData(
                new InappropriateContent { Id = 1, ReportComment = "Racism", Processed = false, IsPost = true, PostId = 1, StoryId = 1, SenderId = 5, ActionTaken = ActionTaken.Unprocessed }
            );

        }
    }
}

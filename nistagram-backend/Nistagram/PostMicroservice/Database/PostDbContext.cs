using Microsoft.EntityFrameworkCore;
using PostMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Database
{
    public class PostDbContext : DbContext
    {
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
        public DbSet<PostDislike> PostDislikes { get; set; }
        public DbSet<PostFavorite> PostFavorites { get; set; }
        public DbSet<ProfileFollowing> ProfileFollowings { get; set; }

        public PostDbContext() : base() { }

        public PostDbContext(DbContextOptions<PostDbContext> options) : base(options) { }

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
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "PostMicroserviceDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Profile>().HasData(
                new Profile { Id = 1, OriginalId = 1, IsPrivate = false, Username = "stefanb", ImageName = "user1213352029.jpg" },
                new Profile { Id = 2, OriginalId = 2, IsPrivate = true, Username = "matijam", ImageName = "user2213352029.jpg" },
                new Profile { Id = 3, OriginalId = 3, IsPrivate = true, Username = "aleksai", ImageName = "user3213352029.png" },
                new Profile { Id = 4, OriginalId = 4, IsPrivate = false, Username = "stefans", ImageName = "user4213352029.png" },
                new Profile { Id = 5, OriginalId = 5, IsPrivate = false, Username = "majam", ImageName = "user5213352029.jpg" }
            );

            modelBuilder.Entity<Location>().HasData(
                new Location { Id = 1, Address = "", City = "Nis", Country = "Serbia" },
                new Location { Id = 2, Address = "", City = "Kopaonik", Country = "Serbia" },
                new Location { Id = 3, Address = "", City = "Zlatibor", Country = "Serbia" }
            );

            modelBuilder.Entity<Tag>().HasData(
                new Tag { Id = 1, Content = "nature", PostId = 1 },
                new Tag { Id = 2, Content = "sun", PostId = 1 },
                new Tag { Id = 3, Content = "waterfall", PostId = 2 },
                new Tag { Id = 4, Content = "vacation", PostId = 3 }
            );

            modelBuilder.Entity<Post>().HasData( // "Dodaj tagove"
               new Post { Id = 1, PublisherId = 1, Description = "Nature", PublishingDate = new DateTime(2021, 05, 01, 11, 01, 01), LocationId = 1 },
               new Post { Id = 2, PublisherId = 2, Description = "Waterfall", PublishingDate = new DateTime(2021, 06, 01, 19, 10, 10), LocationId = 2 },
               new Post { Id = 3, PublisherId = 4, Description = "Vacation", PublishingDate = new DateTime(2021, 01, 01, 18, 10, 10), LocationId = 3 }
            );

            modelBuilder.Entity<Content>().HasData(
                new Content { Id = 1, ImageName = "2212424861.png", PostId = 1 },
                new Content { Id = 2, ImageName = "2212424862.png", PostId = 2 },
                new Content { Id = 3, ImageName = "2212424862.png", PostId = 3 }
            );

            modelBuilder.Entity<Comment>().HasData(
                new Comment { Id = 1, Text = "Excellent", Date = new DateTime(2021, 05, 30, 10, 10, 10), PublisherId = 3, PostId = 1 },
                new Comment { Id = 2, Text = "Wow :D", Date = new DateTime(2021, 06, 02, 10, 10, 10), PublisherId = 1, PostId = 2 },
                new Comment { Id = 3, Text = "You are lucky! :D", Date = new DateTime(2021, 01, 02, 11, 11, 11), PublisherId = 2, PostId = 3 }
            );

            // Likes
            modelBuilder.Entity<PostLike>().HasKey(p => new { p.PostId, p.LikeId });
            modelBuilder.Entity<PostLike>()
                .HasOne(pt => pt.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(pt => pt.PostId);

            modelBuilder.Entity<PostLike>().HasData(
                new PostLike { PostId = 1, LikeId = 3 },
                new PostLike { PostId = 1, LikeId = 4 },
                new PostLike { PostId = 2, LikeId = 3 },
                new PostLike { PostId = 2, LikeId = 1 },
                new PostLike { PostId = 3, LikeId = 2 }
            );

            // Dislikes
            modelBuilder.Entity<PostDislike>().HasKey(p => new { p.PostId, p.DislikeId });
            modelBuilder.Entity<PostDislike>()
                .HasOne(pt => pt.Post)
                .WithMany(p => p.Dislikes)
                .HasForeignKey(pt => pt.PostId);

            modelBuilder.Entity<PostDislike>().HasData(
                new PostDislike { PostId = 1, DislikeId = 5 }
            );

            // Favorites
            modelBuilder.Entity<PostFavorite>().HasKey(p => new { p.PostId, p.FavoriteId });
            modelBuilder.Entity<PostFavorite>()
                .HasOne(pt => pt.Post)
                .WithMany(p => p.Favorites)
                .HasForeignKey(pt => pt.PostId);

            modelBuilder.Entity<PostFavorite>().HasData(
                new PostFavorite { PostId = 1, FavoriteId = 2 },
                new PostFavorite { PostId = 2, FavoriteId = 3 }
            );

            // Following
            modelBuilder.Entity<ProfileFollowing>().HasKey(t => new { t.ProfileId, t.FollowingId });
            modelBuilder.Entity<ProfileFollowing>()
                .HasOne(pt => pt.Profile)
                .WithMany(p => p.Following)
                .HasForeignKey(pt => pt.ProfileId);

            modelBuilder.Entity<ProfileFollowing>().HasData(
                new ProfileFollowing { ProfileId = 2, FollowingId = 1 },
                new ProfileFollowing { ProfileId = 3, FollowingId = 1 },
                new ProfileFollowing { ProfileId = 1, FollowingId = 2 },
                new ProfileFollowing { ProfileId = 3, FollowingId = 2 },
                new ProfileFollowing { ProfileId = 1, FollowingId = 3 },
                new ProfileFollowing { ProfileId = 2, FollowingId = 4 },
                new ProfileFollowing { ProfileId = 1, FollowingId = 5 }
            );

        }
    }
}

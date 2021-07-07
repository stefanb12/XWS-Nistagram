﻿using CampaignMicroservice.Model;
using CampaignMicroservice.Model.Enum;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Database
{
    public class CampaignDbContext : DbContext
    {
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<CampaignRequest> CampaignRequests { get; set; }
        public DbSet<Commercial> Commercials { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<RepeatableCampaignEdit> RepeatableCampaignEdits { get; set; }
        public CampaignDbContext() : base() { }

        public CampaignDbContext(DbContextOptions<CampaignDbContext> options) : base(options) { }

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
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "CampaignMicroserviceDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CampaignCommercial>().HasKey(cc => new { cc.CommercialId, cc.CampaignId });
            modelBuilder.Entity<CampaignCommercial>()
                .HasOne(cc => cc.Campaign)
                .WithMany(c => c.Commercials)
                .HasForeignKey(cc => cc.CampaignId);

            /*modelBuilder.Entity<TargetGroupProfile>().HasKey(tgp => new { tgp.ProfileId, tgp.CampaignId });
            modelBuilder.Entity<TargetGroupProfile>()
                .HasOne(tgp => tgp.Campaign)
                .WithMany(c => c.TargetGroup)
                .HasForeignKey(tgp => tgp.CampaignId);*/

            modelBuilder.Entity<Profile>().HasData(
                new Profile { Id = 1, OriginalId = 1, Username = "stefanb", ImageName = "user1213352029.jpg", UserRole = UserRole.User },
                new Profile { Id = 2, OriginalId = 2, Username = "matijam", ImageName = "user2213352029.jpg", UserRole = UserRole.User },
                new Profile { Id = 3, OriginalId = 3, Username = "aleksai", ImageName = "user3213352029.png", UserRole = UserRole.Agent },
                new Profile { Id = 4, OriginalId = 4, Username = "stefans", ImageName = "user4213352029.png", UserRole = UserRole.Agent },
                new Profile { Id = 5, OriginalId = 5, Username = "majam", ImageName = "user5213352029.jpg", UserRole = UserRole.Agent }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post { Id = 1, OriginalId = 1 },
                new Post { Id = 2, OriginalId = 2 },
                new Post { Id = 3, OriginalId = 3 }
            );

            modelBuilder.Entity<Story>().HasData(
                new Story { Id = 1, OriginalId = "60bd70ad107c45e92fd80692" },
                new Story { Id = 2, OriginalId = "60bd70ad107c45e92fd80693" },
                new Story { Id = 3, OriginalId = "60bd70ad107c45e92fd80694" },
                new Story { Id = 4, OriginalId = "60bd70ad107c45e92fd80695" },
                new Story { Id = 5, OriginalId = "60bd70ad107c45e92fd80696" }
            );

            modelBuilder.Entity<Commercial>().HasData(
                new Commercial { Id = 1, AgentId = 4, ImageName = "tShirt.png", WebsiteLink = "http://localhost:3001/app/singleProduct/1" },
                new Commercial { Id = 2, AgentId = 4, ImageName = "sneakers.png", WebsiteLink = "http://localhost:3001/app/singleProduct/2" },
                new Commercial { Id = 3, AgentId = 4, ImageName = "ball.png", WebsiteLink = "http://localhost:3001/app/singleProduct/3" },
                new Commercial { Id = 4, AgentId = 4, ImageName = "cap.png", WebsiteLink = "http://localhost:3001/app/singleProduct/4" }
            );

            modelBuilder.Entity<SingleCampaign>().HasData(
                new SingleCampaign { Id = 1, Deleted = false, AgentId = 3, IsPost = true, PostId = 4, StoryId = "empty", BroadcastTime = new DateTime(2021, 7, 8) },
                new SingleCampaign { Id = 2, Deleted = false, AgentId = 4, IsPost = false, PostId = 1, StoryId = "60bd70ad107c45e92fd80697", BroadcastTime = new DateTime(2021, 7, 8) }
            );

            modelBuilder.Entity<RepeatableCampaign>().HasData(
                new RepeatableCampaign { Id = 3, Deleted = false, AgentId = 4, IsPost = true, PostId = 5, StoryId = "empty", StartDate = new DateTime(2021, 7, 5), EndDate = new DateTime(2021, 7, 11), LastModification = new DateTime(2021, 7, 5), NumberOfRepeats = 2 },
                new RepeatableCampaign { Id = 4, Deleted = false, AgentId = 4, IsPost = true, PostId = 6, StoryId = "empty", StartDate = new DateTime(2021, 7, 5), EndDate = new DateTime(2021, 7, 11), LastModification = new DateTime(2021, 7, 5), NumberOfRepeats = 2 }
            );

            // CampaignCommercials
            modelBuilder.Entity<CampaignCommercial>().HasKey(t => new { t.CampaignId, t.CommercialId });
            modelBuilder.Entity<CampaignCommercial>()
                .HasOne(pt => pt.Campaign)
                .WithMany(p => p.Commercials)
                .HasForeignKey(pt => pt.CampaignId);

            modelBuilder.Entity<CampaignCommercial>().HasData(
                new CampaignCommercial { CampaignId = 1, CommercialId = 2 },
                new CampaignCommercial { CampaignId = 2, CommercialId = 2 },
                new CampaignCommercial { CampaignId = 3, CommercialId = 3 },
                new CampaignCommercial { CampaignId = 4, CommercialId = 4 }
            );

            // Followers
            modelBuilder.Entity<ProfileFollower>().HasKey(t => new { t.ProfileId, t.FollowerId });
            modelBuilder.Entity<ProfileFollower>()
                .HasOne(pt => pt.Profile)
                .WithMany(p => p.Followers)
                .HasForeignKey(pt => pt.ProfileId);

            modelBuilder.Entity<ProfileFollower>().HasData(
                new ProfileFollower { ProfileId = 1, FollowerId = 2 },
                new ProfileFollower { ProfileId = 1, FollowerId = 3 },
                new ProfileFollower { ProfileId = 2, FollowerId = 1 },
                new ProfileFollower { ProfileId = 2, FollowerId = 3 },
                new ProfileFollower { ProfileId = 3, FollowerId = 1 },
                new ProfileFollower { ProfileId = 4, FollowerId = 2 },
                new ProfileFollower { ProfileId = 5, FollowerId = 1 }
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

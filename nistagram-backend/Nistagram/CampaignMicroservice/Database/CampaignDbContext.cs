﻿using CampaignMicroservice.Model;
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
                .WithMany(c => c.CampaignCommercials)
                .HasForeignKey(cc => cc.CampaignId);

            modelBuilder.Entity<TargetGroupProfile>().HasKey(tgp => new { tgp.ProfileId, tgp.CampaignId });
            modelBuilder.Entity<TargetGroupProfile>()
                .HasOne(tgp => tgp.Campaign)
                .WithMany(c => c.TargetGroup)
                .HasForeignKey(tgp => tgp.CampaignId);

            modelBuilder.Entity<Profile>().HasData(
                new Profile { Id = 1, OriginalId = 1, Username = "stefanb", ImageName = "user1213352029.jpg" },
                new Profile { Id = 2, OriginalId = 2, Username = "matijam", ImageName = "user2213352029.jpg" },
                new Profile { Id = 3, OriginalId = 3, Username = "aleksai", ImageName = "user3213352029.png" },
                new Profile { Id = 4, OriginalId = 4, Username = "stefans", ImageName = "user4213352029.png" },
                new Profile { Id = 5, OriginalId = 5, Username = "majam", ImageName = "user5213352029.jpg" }
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
                new Commercial { Id = 1, AgentId = 4, ImageName = "1213352229.jpg" }
            );
        }
        }
}
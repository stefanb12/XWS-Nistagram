using Microsoft.EntityFrameworkCore;
using ProfileMicroservice.Model;
using ProfileMicroservice.Model.Enum;
using System;
using UserMicroservice.Model;

namespace ProfileMicroservice.Database
{
    public class UserDbContext : DbContext
    {
        public DbSet<ProfileSettings> ProfileSettings { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<FollowRequest> FollowRequests { get; set; }
        public DbSet<ProfileVerificationRequest> ProfileVerificationRequests { get; set; }
        public DbSet<RegistrationRequest> RegistrationRequests { get; set; }
        public DbSet<ProfileFollower> ProfileFollowers { get; set; }
        public DbSet<ProfileFollowing> ProfileFollowings { get; set; }
        public DbSet<ProfileCloseFriend> ProfileCloseFriends { get; set; }
        public DbSet<ProfileMutedProfile> ProfileMutedProfiles { get; set; }
        public DbSet<ProfileBlockedProfile> ProfileBlockedProfiles { get; set; }

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
            modelBuilder.Entity<ProfileSettings>().HasData(
                new ProfileSettings { Id = 1, ReceiveAllMessages = true, TagAllowed = true },
                new ProfileSettings { Id = 2, ReceiveAllMessages = true, TagAllowed = true },
                new ProfileSettings { Id = 3, ReceiveAllMessages = true, TagAllowed = true },
                new ProfileSettings { Id = 4, ReceiveAllMessages = true, TagAllowed = true },
                new ProfileSettings { Id = 5, ReceiveAllMessages = true, TagAllowed = true },
                new ProfileSettings { Id = 6, ReceiveAllMessages = true, TagAllowed = true }
            );

            modelBuilder.Entity<Profile>().HasData(
                // Users
                new Profile { Id = 1, Username = "stefanb", Password = "pass", FullName = "Stefan Beljic", Email = "stefanb@gmail.com", MobilePhone = "+381 60 15 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 11, 25), UserRole = UserMicroservice.Model.Enum.UserRole.User, IsPrivate = false, Website = "WebSite1", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 1, ImageName = "user1213352029.jpg" },
                new Profile { Id = 2, Username = "matijam", Password = "pass", FullName = "Matija Mijalkovic", Email = "matijam@gmail.com", MobilePhone = "+381 20 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 10, 24), UserRole = UserMicroservice.Model.Enum.UserRole.User, IsPrivate = true, Website = "WebSite2", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 2, ImageName = "user2213352029.jpg" },
                new Profile { Id = 3, Username = "aleksai", Password = "pass", FullName = "Aleksa Ivanic", Email = "aleksai@gmail.com", MobilePhone = "+381 60 35 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 09, 23), UserRole = UserMicroservice.Model.Enum.UserRole.Agent, IsPrivate = true, Website = "WebSite3", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 3, ImageName = "user3213352029.png" },
                new Profile { Id = 4, Username = "stefans", Password = "pass", FullName = "Stefan Savic", Email = "stefans@gmail.com", MobilePhone = "+381 60 45 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 08, 22), UserRole = UserMicroservice.Model.Enum.UserRole.Agent, IsPrivate = false, Website = "WebSite4", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 4, ImageName = "user4213352029.png" },
                new Profile { Id = 5, Username = "majam", Password = "pass", FullName = "Maja Majkic", Email = "majam@gmail.com", MobilePhone = "+381 60 55 58 444", Gender = Gender.Female, DateOfBirth = new DateTime(1998, 07, 21), UserRole = UserMicroservice.Model.Enum.UserRole.Agent, IsPrivate = false, Website = "WebSite4", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 5, ImageName = "user5213352029.jpg" },
                
                // Admins
                new Profile { Id = 6, Username = "admin", Password = "pass", FullName = "Aca Acic", Email = "acaa@gmail.com", MobilePhone = "+381 60 55 58 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 07, 21), UserRole = UserMicroservice.Model.Enum.UserRole.Admin, ProfileSettingsId = 6}
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

            // CloseFriends
            modelBuilder.Entity<ProfileCloseFriend>().HasKey(t => new { t.ProfileId, t.CloseFriendId });
            modelBuilder.Entity<ProfileCloseFriend>()
                .HasOne(pt => pt.Profile)
                .WithMany(p => p.CloseFriends)
                .HasForeignKey(pt => pt.ProfileId);

            modelBuilder.Entity<ProfileCloseFriend>().HasData(
                new ProfileCloseFriend { ProfileId = 1, CloseFriendId = 2 },
                new ProfileCloseFriend { ProfileId = 2, CloseFriendId = 3 },
                new ProfileCloseFriend { ProfileId = 3, CloseFriendId = 2 }
            );

            // MutedProfiles
            modelBuilder.Entity<ProfileMutedProfile>().HasKey(t => new { t.ProfileSettingsId, t.MutedProfileId });
            modelBuilder.Entity<ProfileMutedProfile>()
                .HasOne(pt => pt.ProfileSettings)
                .WithMany(p => p.MutedProfiles)
                .HasForeignKey(pt => pt.ProfileSettingsId);

            modelBuilder.Entity<ProfileMutedProfile>().HasData(
                new ProfileMutedProfile { ProfileSettingsId = 1, MutedProfileId = 2 }
            );

            // BlockedProfiles
            modelBuilder.Entity<ProfileBlockedProfile>().HasKey(t => new { t.ProfileSettingsId, t.BlockedProfileId });
            modelBuilder.Entity<ProfileBlockedProfile>()
                .HasOne(pt => pt.ProfileSettings)
                .WithMany(p => p.BlockedProfiles)
                .HasForeignKey(pt => pt.ProfileSettingsId);

            modelBuilder.Entity<ProfileBlockedProfile>().HasData(
                new ProfileBlockedProfile { ProfileSettingsId = 1, BlockedProfileId = 4 }
            );

            modelBuilder.Entity<FollowRequest>().HasData(
                new FollowRequest { Id = 1, Accepted = false, Processed = false, ReceiverId = 2, SenderId = 5 },
                new FollowRequest { Id = 2, Accepted = false, Processed = false, ReceiverId = 3, SenderId = 5 }
            );
        }
    }
}

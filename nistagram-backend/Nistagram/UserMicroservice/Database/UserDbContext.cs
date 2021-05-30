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
                new ProfileSettings { Id = 5, ReceiveAllMessages = true, TagAllowed = true }
            );

            modelBuilder.Entity<Profile>().HasData(
                new Profile { Id = 1, Username = "user1", Password = "pass1", FullName = "name1", Email = "user1@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20), UserRole = UserMicroservice.Model.Enum.UserRole.User, ProfilePicture = "path", Private = false, Website = "WebSite", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 1 },
                new Profile { Id = 2, Username = "user2", Password = "pass2", FullName = "name2", Email = "user2@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20), UserRole = UserMicroservice.Model.Enum.UserRole.User, ProfilePicture = "path", Private = false, Website = "WebSite", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 2 },
                new Profile { Id = 3, Username = "user3", Password = "pass3", FullName = "name3", Email = "user3@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20), UserRole = UserMicroservice.Model.Enum.UserRole.Agent, ProfilePicture = "path", Private = true, Website = "WebSite", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 3 },
                new Profile { Id = 4, Username = "user4", Password = "pass4", FullName = "name4", Email = "user4@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20), UserRole = UserMicroservice.Model.Enum.UserRole.Agent, ProfilePicture = "path", Private = false, Website = "WebSite", Biography = "bio", Deactivated = false, Category = UserCategory.Regular, ProfileSettingsId = 4 },
                new Profile { Id = 5, Username = "user5", Password = "pass5", FullName = "name5", Email = "user5@gmail.com", MobilePhone = "+381 60 55 88 444", Gender = Gender.Male, DateOfBirth = new DateTime(1998, 12, 20), UserRole = UserMicroservice.Model.Enum.UserRole.Admin, ProfileSettingsId = 5 }          
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
                new ProfileFollower { ProfileId = 2, FollowerId = 3 }
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
                new ProfileFollowing { ProfileId = 3, FollowingId = 2 }
            );

            // CloseFriends
            modelBuilder.Entity<ProfileCloseFriend>().HasKey(t => new { t.ProfileId, t.CloseFriendId });
            modelBuilder.Entity<ProfileCloseFriend>()
                .HasOne(pt => pt.Profile)
                .WithMany(p => p.CloseFriends)
                .HasForeignKey(pt => pt.ProfileId);

            modelBuilder.Entity<ProfileCloseFriend>().HasData(
                new ProfileCloseFriend { ProfileId = 1, CloseFriendId = 2 },
                new ProfileCloseFriend { ProfileId = 1, CloseFriendId = 3 },
                new ProfileCloseFriend { ProfileId = 3, CloseFriendId = 1 }
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
                new FollowRequest { Id = 1, Accepted = false, Processed = false, ReceiverId = 3, SenderId = 4 }
            );
        }
    }
}

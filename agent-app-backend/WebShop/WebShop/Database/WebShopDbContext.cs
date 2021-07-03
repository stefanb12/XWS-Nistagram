using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebShop.Model;

namespace WebShop.Database
{
    public class WebShopDbContext : DbContext
    {
        public WebShopDbContext() : base() { }

        public WebShopDbContext(DbContextOptions<WebShopDbContext> options) : base(options) { }

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
            string database = Environment.GetEnvironmentVariable("DATABASE_SCHEMA") ?? "WebShopDb";
            string user = Environment.GetEnvironmentVariable("DATABASE_USERNAME") ?? "root";
            string password = Environment.GetEnvironmentVariable("DATABASE_PASSWORD") ?? "root";
            string sslMode = Environment.GetEnvironmentVariable("DATABASE_SSL_MODE") ?? "None";
            return $"server={server};port={port};database={database};user={user};password={password};";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>().HasData(
                new Location { Id = 1, Address = "Ive Andica 15", City = "Beograd", Country = "Serbia" },
                new Location { Id = 2, Address = "Futoska 35", City = "Novi Sad", Country = "Serbia" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "stefanb", Password = "pass", Name = "Stefan Beljic", Email = "stefanb@gmail.com", MobilePhone = "+381 60 15 88 444", UserRole = WebShop.Model.Enum.UserRole.User, LocationId = 1 },
                new User { Id = 2, Username = "stefans", Password = "pass", Name = "Stefan Savic", Email = "stefans@gmail.com", MobilePhone = "+381 60 15 88 444", UserRole = WebShop.Model.Enum.UserRole.Admin, LocationId = 2 }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "t-shirt", Price = 2500.23, Description = "T-shirt", AvailableBalance = 10, Deleted = false },
                new Product { Id = 2, Name = "sneakers", Price = 6700.89, Description = "Sneakers", AvailableBalance = 30, Deleted = false },
                new Product { Id = 3, Name = "ball", Price = 2500.23, Description = "Ball", AvailableBalance = 10, Deleted = false },
                new Product { Id = 4, Name = "cap", Price = 6700.89, Description = "Cap", AvailableBalance = 30, Deleted = false }
            );

            modelBuilder.Entity<Content>().HasData(
                new Content { Id = 1, ImageName = "tShirt.png", ProductId = 1 },
                new Content { Id = 2, ImageName = "sneakers.png", ProductId = 2 },
                new Content { Id = 3, ImageName = "ball.png", ProductId = 3 },
                new Content { Id = 4, ImageName = "cap.png", ProductId = 4 }
            );

            modelBuilder.Entity<ItemToPurchase>().HasData(
               new ItemToPurchase { Id = 1, Quantity = 2, ProductId = 2, ShoppingCartId = 1 },
               new ItemToPurchase { Id = 2, Quantity = 3, ProductId = 1, ShoppingCartId = 1 }
            );

            modelBuilder.Entity<ShoppingCart>().HasData(
               new ShoppingCart { Id = 1, Created = new DateTime(2021, 06, 15), Total = 20000, UserId = 1 }
            );
        }
    }
}

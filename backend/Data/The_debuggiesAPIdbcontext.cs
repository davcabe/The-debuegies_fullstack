using Microsoft.EntityFrameworkCore;
using Fullstack.Models;

namespace Fullstack.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure User entity
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.email).IsRequired();
                entity.Property(e => e.password).IsRequired();
                entity.HasIndex(e => e.email).IsUnique();
            });

            // Seed initial data if needed
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, email = "admin@example.com", password = "admin123" }
                // Add more seed data as needed
            );
        }
    }
}
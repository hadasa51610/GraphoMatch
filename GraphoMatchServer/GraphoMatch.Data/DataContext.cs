using GraphoMatch.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using Microsoft.Extensions.Configuration;

namespace GraphoMatch.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<HandWriting> HandWritings { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Job> jobs { get; set; }
        public DbSet<Role> Roles { get; set; }

        private readonly IConfiguration _configuration;

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("GraphoMatchDB");
                optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feedback>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany(u => u.Feedback)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict); 
            modelBuilder.Entity<HandWriting>()
                .HasOne(h => h.User)  
                .WithMany()          
                .HasForeignKey(h => h.UserId) 
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HandWriting>()
                .HasOne(h => h.User)
                .WithMany(u => u.HandWritings)
                .HasForeignKey(h => h.UserId);

            base.OnModelCreating(modelBuilder);
        }

    }
}

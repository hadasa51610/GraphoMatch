using GraphoMatch.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphoMatch.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<HandWriting> HandWritings { get; set; }
        public DbSet<Analysis> Analysis { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlServer("Data Source=DESKTOP-OP3HLHL; Initial Catalog=GraphoMatch; Integrated Security=True; TrustServerCertificate=True");
           
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Feedback>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany(u => u.Feedback)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict); // לא לאפשר מחיקה של משתמש עם פידבקים

        }

    }
}

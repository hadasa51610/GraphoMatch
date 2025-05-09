using GraphoMatch.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace GraphoMatch.Data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<HandWriting> HandWritings { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Job> jobs { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //protected override void OnConfiguring(DbContextOptionsBuilder builder)
        //{
        //    builder.UseSqlServer("Data Source=DESKTOP-OP3HLHL; Initial Catalog=GraphoMatchDB; Integrated Security=True; TrustServerCertificate=True");
        //    //builder.UseSqlServer("Server=localhost;Port=3306;Database=your_database;Uid=your_username;Pwd=your_password;");
        //}
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    object value = optionsBuilder.UseMySql("name=GraphoMatchDB", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.41-mysql"));
        //}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(
                    "server=byoy9xq8yvies3i0m5g6-mysql.services.clever-cloud.com;user=unqtuiwm9yfyr6s1;password=NopmFRBaIUIUzVI4F3rn;database=byoy9xq8yvies3i0m5g6;Port=3306",
                    ServerVersion.Parse("8.0.41-mysql"));
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
                .OnDelete(DeleteBehavior.Restrict); // לא לאפשר מחיקה של משתמש עם פידבקים
            modelBuilder.Entity<HandWriting>()
                .HasOne(h => h.User)  // HandWriting has one User
                .WithMany()           // User can have many HandWritings (if that’s your design)
                .HasForeignKey(h => h.UserId) // Specifies the foreign key
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<HandWriting>()
                .HasOne(h => h.User)
                .WithMany(u => u.HandWritings)
                .HasForeignKey(h => h.UserId);

            base.OnModelCreating(modelBuilder);
        }

    }
}

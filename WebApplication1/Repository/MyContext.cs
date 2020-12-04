using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;
using WebApplication1.Model;

namespace WebApplication1.Repository
{
    public class MyContext : DbContext
    {
        private readonly string _connectionString;

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }

        public MyContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("MsSqlLogin");
            //_connectionString = "Server=localhost;Database=SyncFusionTest;User Id = admin; Password = gino123;";
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlServer(_connectionString);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasKey(c => c.Uid);
            modelBuilder.Entity<Customer>()
                .HasIndex(c => c.Id)
                .IsUnique();
            modelBuilder.Entity<Customer>(customer =>
            {
                customer.Property(c => c.Uid).ValueGeneratedOnAdd();
                customer.Property(c => c.Id).HasMaxLength(20).HasColumnType("varchar");
                customer.Property(c => c.Name).HasMaxLength(20).HasColumnType("varchar");
                customer.Property(c => c.Country).HasMaxLength(3).HasColumnType("varchar");
                customer.Property(c => c.City).HasMaxLength(50).HasColumnType("varchar");
                customer.Property(c => c.State).HasMaxLength(2).HasColumnType("varchar");
                customer.Property(c => c.Address).HasMaxLength(100).HasColumnType("varchar");
                customer.Property(c => c.Zip).HasMaxLength(20).HasColumnType("varchar");
            });

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Customer)
                .WithMany(c => c.Order)
                .HasPrincipalKey(c=>c.Id)
                .HasForeignKey(o => o.CustomerId);

            modelBuilder.Entity<Order>()
                .HasKey(o => o.Id);

            modelBuilder.Entity<Order>(order =>
            {
                order.Property(c => c.Id).HasMaxLength(20).ValueGeneratedOnAdd().HasColumnType("varchar");
                order.Property(c => c.CustomerId).HasMaxLength(20).HasColumnType("varchar");
                order.Property(c => c.TotalAmount).HasPrecision(16, 2);
                order.Property(c => c.SalesName).HasMaxLength(100).HasColumnType("varchar");
            });
        }
    }
}

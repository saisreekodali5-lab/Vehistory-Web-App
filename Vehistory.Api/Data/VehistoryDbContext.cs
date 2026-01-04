using Microsoft.EntityFrameworkCore;
using Vehistory.Api.Models;

namespace Vehistory.Api.Data
{
    public class VehistoryDbContext : DbContext
    {
        public VehistoryDbContext(DbContextOptions<VehistoryDbContext> options)
            : base(options) { }

        public DbSet<Car> Cars => Set<Car>();
        public DbSet<CarEvent> CarEvents => Set<CarEvent>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CarEvent>()
                .HasOne(e => e.Car)
                .WithMany(c => c.Events)
                .HasForeignKey(e => e.CarId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

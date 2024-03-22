using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext {
    public DbSet<Enitities.Dish> Dishes { get; set; }
    public DbSet<Enitities.Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseNpgsql("Host=localhost;Username=user;Password=1234;Database=database");
    }
}

using Microsoft.EntityFrameworkCore;

//todo Autopay as example of retrieving whole Security w Pricing
namespace Security.Models
{
    public class SecurityContext : DbContext
    {
        public DbSet<Security> Securities { get; set; } //Securities is name of table in mysql, 'Security' is model
        public DbSet<SecurityPrice> SecurityPrices { get; set; }
        
        public SecurityContext(DbContextOptions<SecurityContext> options)
            : base(options) {}
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        { 
            // call base 
            base.OnModelCreating(modelBuilder); 
            
            // modelBuilder.Entity<SecurityPrice>()

            modelBuilder.Entity<Security>()
                .HasMany(u => u.DailyPrices);
//                .ToTable("Securities"); // custom

//            modelBuilder.Entity<To do>()
//                .Property(p => p.IsComplete)
//                .HasColumnType("bit"); //mysql stores bit, c# type is bool
        }
    }
    
}
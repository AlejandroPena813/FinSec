using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Security.Models;

namespace Security.Controllers
{
      // todo cascade delete. getAll for first page display, then get one Security w/ all prices for focused page. 
    
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase // use Controller if want to use MVC like Razor
    {
        private readonly SecurityContext _securityContext;

        public SecurityController(SecurityContext securityContext)
        {
            _securityContext = securityContext;
        }

        //todo perhaps have param query, to filter rows--> search in front
        [HttpGet]
        public async Task<IActionResult> GetAllSecurities()
        {
            try
            {   
                // usually controller handles http, service does functionality + retrieval
                var result = await _securityContext.Securities.ToListAsync(); // Securities is table name
                return new OkObjectResult(result);
            }
            catch (Exception e)
            {
                Console.WriteLine($"Trouble retrieving all securities: {e}");
                return StatusCode(500, e);
            }
        }
        
        [HttpGet("{id}")]         
        public async Task<IActionResult> GetSecurity(int id) // [FromRoute]
        {
            try
            {   
                // NEED Firstordefault. else returns an array not obj.
                var security = _securityContext.Securities
                    .Where(sec => sec.Id == id).Include(sec => sec.DailyPrices).FirstOrDefault(); //.FindAsync(id);
                
                if ( security == null)
                    return StatusCode(404); // NotFound();
                return new OkObjectResult(security);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostSecurity([FromBody] Models.Security newSecurity)
        {   // could turn this into function in service file--> reusable. Can receive array of prices, but shouldnt
            if (String.IsNullOrEmpty(newSecurity.SecurityName)) // todo these checks need to be better
                return StatusCode(400, "Must provide security name.");
            if (String.IsNullOrEmpty(newSecurity.ISIN)) 
                return StatusCode(400, "Must provide 12 digit security ISIN.");
            if (String.IsNullOrEmpty(newSecurity.Country)) 
                return StatusCode(400, "Must provide country security belongs to.");
            try
            {
                _securityContext.Securities.Add(newSecurity);
                await _securityContext.SaveChangesAsync();
                return new OkObjectResult("Succesfully saved security");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }
        }
        
        //could also do a put, and assign whole new item?
        [HttpPatch] //should have an id in url?
        public async Task<IActionResult> UpdateSecurity([FromBody] Models.Security updatedSecurity)
        { //todo edit this update for proper fields.
          //Could add prices here, but bad practice
            if ( String.IsNullOrEmpty(updatedSecurity.Id.ToString()) ) // this needs better detection
                return StatusCode(400, "Must provide id");
            try
            {
                var security = await _securityContext.Securities.FindAsync(updatedSecurity.Id);
                if (security == null) 
                    return StatusCode(404);

                if (!String.IsNullOrEmpty(updatedSecurity.SecurityName)) //prob a check above like Post to ensure no empty since Patch all, Put 1:n
                    security.SecurityName = updatedSecurity.SecurityName;
                if (!String.IsNullOrEmpty(updatedSecurity.ISIN))
                    security.ISIN = updatedSecurity.ISIN;
                if (!String.IsNullOrEmpty(updatedSecurity.Country))
                    security.Country = updatedSecurity.Country;
            
                await _securityContext.SaveChangesAsync();

                return new OkObjectResult($"Succesfully updated: {security.SecurityName}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSecurity(int id)
        {
            try
            {
                var security = await _securityContext.Securities.FindAsync(id);
                if (security == null) 
                    return StatusCode(404);
                
                _securityContext.Securities.Remove(security);
                _securityContext.SecurityPrices
                    .RemoveRange(_securityContext.SecurityPrices.Where(price => price.SecurityId == security.Id)); // cascadeOnDelete not working EF or via DB query must be careful
                await _securityContext.SaveChangesAsync();
                
                return new OkObjectResult($"Deleted {security.SecurityName}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }
        }
        //todo play w/ query params. Could of done: Authentication/roles, service token?, appsettings
    }
}
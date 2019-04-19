using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Security.Models;

//todo test before proceeding to front-end!
namespace Security.Controllers
{ // todo front-end display as graph? with tooltip of specific Price
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityPriceController : ControllerBase // use Controller if want to use MVC like Razor
    {
//        // GET
//        public IActionResult Index()
//        {
//            return
//            View();
//        } --> Prefer non-mvc, modularity

        private readonly SecurityContext _securityContext;

        public SecurityPriceController(SecurityContext securityContext)
        {
            _securityContext = securityContext;
        }
        
        //not really needed, maybe for search/filter? or to display specific details
        [HttpGet("{id}")]         // [Authorize(Roles="User, ServiceAccount")]
        public async Task<IActionResult> GetSecurityPrice(int id) // [FromRoute]
        {
            try
            {
                var securityPrice = await _securityContext.SecurityPrices.FindAsync(id);
                if (securityPrice == null)
                    return StatusCode(404); // NotFound();
                return new OkObjectResult(securityPrice);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostSecurityPrice([FromBody] SecurityPrice newSecurityPrice)
        {
            //better checks for empty body. Need a SecurityID --> from client
            if (String.IsNullOrEmpty(newSecurityPrice.Date.ToString())) 
                return StatusCode(400, "Must provide security price date.");
            if (String.IsNullOrEmpty(newSecurityPrice.EndDayPrice.ToString())) 
                return StatusCode(400, "Must provide security price amount.");
            if (String.IsNullOrEmpty(newSecurityPrice.SecurityId.ToString())) 
                return StatusCode(400, "Must provide security ID.");

            try
            {    // todo could check for that not already existing..
                _securityContext.SecurityPrices.Add(newSecurityPrice);
                await _securityContext.SaveChangesAsync();
                return new OkObjectResult("Succesfully saved security price");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }
        }
        
        //could also do a put, and assign whole new item?
        [HttpPatch] //should have an id in url? --> no bc patch req whole obj aka id already in body.
        public async Task<IActionResult> UpdateSecurityPrice([FromBody] SecurityPrice updatedSecurityPrice)
        {
            if ( String.IsNullOrEmpty(updatedSecurityPrice.Id.ToString()) )
                return StatusCode(400, "Must include id of security price");
            try
            {
                var securityPrice = await _securityContext.SecurityPrices.FindAsync(updatedSecurityPrice.Id);
                if (securityPrice == null)
                    return StatusCode(404);

                if (!String.IsNullOrEmpty(updatedSecurityPrice.Date.ToString())) //prob a check above to ensure no empty
                    securityPrice.Date = updatedSecurityPrice.Date;
                if (!String.IsNullOrEmpty(updatedSecurityPrice.EndDayPrice.ToString()))
                    securityPrice.EndDayPrice = updatedSecurityPrice.EndDayPrice;
            
                await _securityContext.SaveChangesAsync();

                return new OkObjectResult($"Succesfully updated security price on {securityPrice.Date} valued at ${securityPrice.EndDayPrice}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSecurityPrice(int id)
        {
            try
            {
                var securityPrice = await _securityContext.SecurityPrices.FindAsync(id);
                if (securityPrice == null) 
                    return StatusCode(404);
                
                _securityContext.SecurityPrices.Remove(securityPrice);
                await _securityContext.SaveChangesAsync();
                
                return new OkObjectResult($"Deleted security price on {securityPrice.Date} valued at ${securityPrice.EndDayPrice}");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return StatusCode(500, e);
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Security.Models;

namespace Security.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly SecurityContext _context; //Entity Context

        public ValuesController(SecurityContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] {"value1", "value2"};
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        /* todo can save whole SEcurity with prices array filled...
                    realistically will need to create Security then update with list of prices, 
                    front end likely just add one a day..mimick real life */
        // POST api/values
        [HttpPost] 
        public async Task<IActionResult> Post([FromBody] Models.Security security)
        {
            try
            {
                _context.Securities.Add(security);
                _context.SaveChanges();
                return new OkObjectResult("Succesfully saved todo");
            }
            catch (Exception e)
            {
                //normally a log
                Console.WriteLine(e);
                return new BadRequestObjectResult("No Luck");
            }
        
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
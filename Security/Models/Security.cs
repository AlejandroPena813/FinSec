using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

// todo Nice to have: Angular graphs generator of prices, admin sign ins for 'official' updates. Clean UI graph w price info tooltip..
// perhaps caching? or front-end storage of info(redux/local storage). Unit/e2eTesting/Linting
// Authentication/roles HttpContext, service token?, env appsettings...Twilio API example. excel spreadsheet input to update large past data. Could have more reusable functions, such as repetitive checks in securityController. getSecurityPrices() --> for future more detailed price view?
namespace Security.Models
{
    public class Security
    {
        // todo [required] ?
        [Key] //   Wont use bc need for patch     [JsonIgnore]
        public Int32 Id { get; set; } // auto increment in DB
        
        public string SecurityName { get; set; } // 25 char
        
        public string ISIN { get; set; } // 12 char alphanumeric, todo restrict to 12 num exactly?
        
        public string Country { get; set; } // 25 char
        
        public List<SecurityPrice> DailyPrices { get; set; } // dont actually rep in DB
        // todo DateCreatedField?
    }
}
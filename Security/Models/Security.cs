using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Security.Models
{
    public class Security
    {
        // todo [required] ?
        [Key]
        [JsonIgnore]
        public Int32 Id { get; set; } // todo auto increment in DB
        
        public string SecurityName { get; set; } // 25 char
        
        public string ISIN { get; set; } // 12 char alphanumeric
        
        public string Country { get; set; } // 25 char
        
        public List<SecurityPrice> DailyPrices { get; set; } // dont actually rep in DB
    }
}
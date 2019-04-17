using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Security.Models
{
    public class SecurityPrice
    {
        [ForeignKey("security")]
        public Int32 SecurityId { get; set; }
        
        [JsonIgnore]
        public Security Security { get; set; } // this is ignored in db creation
        
        [Key]
        [JsonIgnore]
        public Int32 Id { get; set; }
        
        public double EndDayPrice { get; set; }
        
        public DateTime Date { get; set; }
    }
}
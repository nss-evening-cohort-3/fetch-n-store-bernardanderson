using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace fetch_and_store.Models
{
    public class Response
    {
        public int ResponseID { get; set; }
        public string StatusCode { get; set; }
        public string URL { get; set; }
        public string ResponseTime { get; set; }
        public string RequestTime { get; set; }
        public string HTTPMethod { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using fetch_and_store.Models;
using System.Data.Entity;

namespace fetch_and_store.DAL
{
    public class ResponseContext : DbContext
    {
        public virtual DbSet<Response> Responses { get; set; }
    }
}
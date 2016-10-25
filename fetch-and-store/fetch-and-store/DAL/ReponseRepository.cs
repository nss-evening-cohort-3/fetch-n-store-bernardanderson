using System;
using System.Collections.Generic;
using fetch_and_store.Models;
using System.Linq;
using System.Web;

namespace fetch_and_store.DAL
{
    public class ReponseRepository
    {
        public ResponseContext Context { get; set; }

        public ReponseRepository()
        {
            Context = new ResponseContext();
        }

        public ReponseRepository(ResponseContext _context)
        {
            Context = _context;
        }

        virtual public List<Response> GetAllResponses()
        {
            return Context.Responses.Select(r => r).ToList();
        }

        virtual public List<Response> AddResponses(List<Response> sentResponseList)
        {
            for (int i = 0; i < sentResponseList.Count; i++)
            {
                Context.Responses.Add(sentResponseList[i]);
            }
            Context.SaveChanges();

            return Context.Responses.Select(a => a).ToList();
        }
    }
}
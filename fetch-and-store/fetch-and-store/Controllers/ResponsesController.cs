using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using fetch_and_store.DAL;
using fetch_and_store.Models;

namespace fetch_and_store.Controllers
{
    public class ResponsesController : ApiController
    {
        public ResponseContext Context { get; set; }
        public ResponsesController()
        {
            Context = new ResponseContext();
        }
        public ResponsesController(ResponseContext _context)
        {
            Context = _context;
        }

        // GET: api/Responses
        public IQueryable<Response> GetResponses()
        {
            return Context.Responses;
        }

        // POST: api/Responses
        [ResponseType(typeof(Response))]
        public IHttpActionResult PostResponse(Response response)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Context.Responses.Add(response);
            Context.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = response.ResponseID }, response);
        }
        // Used in closing the DB connection but needs to be explictly called
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                Context.Dispose();
            }
            base.Dispose(disposing);
        }
        private bool ResponseExists(int id)
        {
            return Context.Responses.Count(e => e.ResponseID == id) > 0;
        }
    }
}
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
        private ResponseContext db = new ResponseContext();

        // GET: api/Responses
        public IQueryable<Response> GetResponses()
        {
            return db.Responses;
        }

        // GET: api/Responses/5
        [ResponseType(typeof(Response))]
        public IHttpActionResult GetResponse(int id)
        {
            Response response = db.Responses.Find(id);
            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }

        // PUT: api/Responses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutResponse(int id, Response response)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != response.ResponseID)
            {
                return BadRequest();
            }

            db.Entry(response).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResponseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Responses
        [ResponseType(typeof(Response))]
        public IHttpActionResult PostResponse(Response response)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Responses.Add(response);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = response.ResponseID }, response);
        }

        // DELETE: api/Responses/5
        [ResponseType(typeof(Response))]
        public IHttpActionResult DeleteResponse(int id)
        {
            Response response = db.Responses.Find(id);
            if (response == null)
            {
                return NotFound();
            }

            db.Responses.Remove(response);
            db.SaveChanges();

            return Ok(response);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ResponseExists(int id)
        {
            return db.Responses.Count(e => e.ResponseID == id) > 0;
        }
    }
}
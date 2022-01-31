using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BoatApp.Api.Services;
using BoatApp.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace BoatApp.Api.Controllers
{
    [Authorize(Roles ="admin, reader")]
    [ApiController]
    [Route("[controller]")]
    public class BoatController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IService<Boat,string> _service;
        public BoatController(ILogger<WeatherForecastController> logger, IService<Boat, string> service)
        {
            this._logger = logger;
            this._service = service;
        }

        /// <summary>
        /// Async method.
        /// Returns list of boats in json format.
        /// </summary>
        /// <returns>Task<IActionResult></returns>
        [HttpGet]
        public async Task<IActionResult> Get() 
        {
            var boats = await this._service.Get();
            return new JsonResult(boats);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var boat = await this._service.Get(id);
            if(boat == null)
                return NotFound();
            return Ok(boat);
        } 

        [Authorize(Roles ="admin")]
        [HttpPost]
        public async Task<IActionResult> Post(Boat boat)
        {
            var result = await this._service.Create(boat);
            return Ok(boat);
        }

        [Authorize(Roles ="admin")]
        [HttpPut]
        public async Task<IActionResult> Put(Boat boat)
        {
            var result = await this._service.Update(boat);
            return Ok();
        }

        [Authorize(Roles ="admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await this._service.Delete(id);
            return Ok();
        }
    }
}
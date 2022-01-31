using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BoatApp.Api.Models;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace BoatApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private IConfiguration _configuration;
        private IList<User> _authorizedUser = new List<User>();
        private User _currentUser = null;
        public AuthController(ILogger<AuthController> logger, IConfiguration configuration)
        {
            this._logger = logger;
            this._configuration = configuration;
            this._authorizedUser.Add(new User() { Login = "ahaddock", Firstname="Archibald", Lastname="Haddock", Password = "ahaddock", Roles = new List<string>(new string[] {"admin", "reader"}) });
            this._authorizedUser.Add(new User() { Login = "rrastapopulos", Firstname="Roberto", Lastname="Rastapopulos", Password = "rrastapopulos", Roles = new List<string>(new string[] {"reader"}) });
        }

        [HttpPost]
        public IActionResult Post(UserDto user)
        {
            this._currentUser = this._authorizedUser.FirstOrDefault(u => u.Login == user.Login && u.Password == user.Password);

            if(this._currentUser != null)
            {
                var result = new
                {
                    token = this.GenerateToken(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:ServerSecret"])))
                };
                return Ok(result);
            }
            return BadRequest();
        }

        private string GenerateToken(SecurityKey key)
        {
            var now = DateTime.UtcNow;
            var issuer = _configuration["JWT:Issuer"];
            var audience = _configuration["JWT:Audience"];
            var identity = new ClaimsIdentity();
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, _currentUser.Login));
            identity.AddClaim(new Claim("Firstname", _currentUser.Firstname));
            identity.AddClaim(new Claim("Lastname", _currentUser.Lastname));
            foreach(string role in this._currentUser.Roles) identity.AddClaim(new Claim(ClaimTypes.Role, role));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateJwtSecurityToken(issuer, audience, identity, now, now.Add(TimeSpan.FromMinutes(5)), now, signingCredentials);
            var encodedToken = handler.WriteToken(token);
            return encodedToken;
        }
    }
}
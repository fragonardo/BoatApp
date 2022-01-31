using System.Collections.Generic;

namespace BoatApp.Api.Models
{
    public class User
    {
        public string Login { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }

        public IList<string> Roles { get; set; }
    }

    public class UserDto
    {
        public string Login { get; set; }
        public string Password { get; set; }

    }
}
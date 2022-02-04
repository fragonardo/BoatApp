namespace BoatApp.Api.Models
{
    public class MongoDbSettings
    {
        public string CollectionName { get; set; }
        public string DatabaseName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string HostName { get; set; }
        public string Port { get; set; }

        public string ConnexionString
        {
            get { return $"mongodb://{this.Login}:{this.Password}@{this.HostName}:{this.Port}/{this.DatabaseName}"; }

        }
    }
}
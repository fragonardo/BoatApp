using System.Threading.Tasks;
using System.Collections.Generic;
using BoatApp.Api.Models;
using MongoDB.Driver;

namespace BoatApp.Api.Services
{
    public class BoatService : IService<Boat,string>
    {
        private readonly IMongoCollection<Boat> boats;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="settings"></param>
        public BoatService(MongoDbSettings settings)
        {
            // var credential = MongoCredential.CreateCredential(settings.DatabaseName,settings.Login,settings.Password);
            // var mongoClientSettings = new MongoClientSettings
            // {
            //     Credential = credential
            // };
            var connexion = settings.ConnexionString;
            var client = new MongoClient(connexion);
            var database = client.GetDatabase(settings.DatabaseName);
            boats = database.GetCollection<Boat>(settings.CollectionName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="Boat"></typeparam>
        /// <returns></returns>
        public async Task<IEnumerable<Boat>> Get() => await boats.Find(p=>true).ToListAsync<Boat>();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Boat> Get(string id) => await boats.Find(b=> b.Id == id).FirstOrDefaultAsync();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public async Task<Boat> Create(Boat boat)
        {
             await boats.InsertOneAsync(boat);
             return boat;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public async Task<bool> Update(Boat boat)
        {
            ReplaceOneResult result = await boats.ReplaceOneAsync<Boat>(b=>b.Id == boat.Id,boat);
            return result.IsAcknowledged;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<bool> Delete(string id)
        {
            var result = await boats.DeleteOneAsync<Boat>(p=>p.Id == id);
            return result.IsAcknowledged;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        public async Task<bool> Delete(Boat boat)
        {
            return await Delete(boat.Id);
        }
    }
}
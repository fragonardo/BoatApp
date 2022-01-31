// Creation of the database used by the application.
// Creation of the user
// Creation of the collection
// Insert data

const dbName = 'BoatStore';
const dbCollectionName = 'Boats';
const userName = 'boat_usr';
const pwd = '123S0leil'

db = db.getSiblingDB(dbName);
db.createUser({
  'user': userName,
  'pwd': pwd,
  'roles': [{ role: "readWrite", db: dbName }]
});

db.createCollection(dbCollectionName);

// Insert data
try {
    db.Boats.insertMany( [
        { Name: "Karaboudjan", Description:"Le bateau du capine Haddocki" },
        { Name: "Titanic", Description: "Insubmersible" },
        { Name: "Santa Maria", Description: "Enmena Christophe Colomb jusqu'en Amérique" },
        { Name: "Black Pirl", Description:"Jack Sparrow en est le capitaine" }
    ] );
 } catch (e) {
    print (e);
 }
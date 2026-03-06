const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

async function connectDB() {
    try {
        const client = await MongoClient.connect(connectionURL);
        const db = client.db(databaseName);

        // const cursor = db.collection('users').find({name: 'Harshil'});
        // for await (const doc of cursor) {
        //     console.dir(doc);
        // }
        // const result = await db.collection('users').updateOne({_id: new ObjectId('69a29f861c3ac5d1011f1729')}, {$set: {name: 'HBoss'}});
        // const result = await db.collection('users').updateOne({_id: new ObjectId('69a29f861c3ac5d1011f1729')}, {$inc: {age: -1}});
        const result = await db.collection('users').deleteMany({age: 23})
        console.log(result);
    } catch (error) {
        console.log('Unable to connect to database', error);
    }
}

connectDB();
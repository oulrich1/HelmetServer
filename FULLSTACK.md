#### DATABASE, MONGODB (NOSQL)
MongoDB is setup and stores data in `/usr/local/var/mongodb`
Start via `mongod --config /usr/local/etc/mongod.conf`

show dbs
use <dbname>

show collections
db.<new|old collection name>.find() -> empty
db.<new|old collection name>.insert({})
db.<new|old collection name>.find() -> not empty
db.<new|old collection name>.update({date:'fake-date'}, {$set: {name:'fake-name', size: 123, path:'fake-path'}},{upsert:true})
>> adds fields to existing collection. upsert will only update unique query matches.

db.<dbname|collection>.drop() -> deletes the db or collection


#### USER INTERFACE
Using a Grid Gallery for Video Stills
https://github.com/benhowell/react-grid-gallery



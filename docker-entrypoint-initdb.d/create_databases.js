
//     user / pwd / dbname
// messagestore / messagestore / supernova
// dupcheck / dupcheck / mhs - duplicate - check
// router / router / mhs - router
// notification / notification / mhs - notification
// reporting / reporting / mhs - reporting
// lineconfig / lineconfig / mhs - line - config
// messagestore - ro / messagestore / supernova
// lineconfig - ro / lineconfig / mhs - line - config
// dupcheck - ro / dupcheck / mhs - duplicate - check
// messagestore - ro / messagestore / supernova
// lineconfig - ro / lineconfig / mhs - line - config
// dupcheck-ro / dupcheck / mhs - duplicate - check

db = db.getSiblingDB("admin");
db.createUser({
  user: "qa",
  pwd: "qa",
  roles: [{ role: "readAnyDatabase", db: "admin" }],
});
db.createUser({
  user: "clusterAdmin",
  pwd: "admin",
  roles: [
    { role: "root", db: "admin" },
    { role: "readAnyDatabase", db: "admin" },
    { role: "read", db: "supernova" },
  ],
});


/////////////////////////////////////////////////////////////////////////////////////////////////
db = db.getSiblingDB('supernova');
db.createUser(
    {
        user: "messagestore",
        pwd: "messagestore",
        roles: [{role: "readWrite", db: "supernova"}]
    }
);


db.createUser(
    {
        user: "messagestore-ro",
        pwd: "messagestore-ro",
        roles: [ {role: "read", db: "supernova"} ]
    }
);

db.createCollection("supernova_version", {});
db.supernova_version.insert({version: "0.9.0"})


/////////////////////////////////////////////////////////////////////////////////////////////////
db = db.getSiblingDB('mhs-duplicate-check');
db.createUser(
    {
        user: "dupcheck",
        pwd: "dupcheck",
        roles: [
            {
                role: "readWrite",
                db: "mhs-duplicate-check"
            }
        ]
    }
);
db.createUser(
    {
        user: "dupcheck-ro",
        pwd: "dupcheck-ro",
        roles: [
            {
                role: "read",
                db: "mhs-duplicate-check"
            }
        ]
    }
);

/////////////////////////////////////////////////////////////////////////////////////////////////

db = db.getSiblingDB('mhs-router');
db.createUser(
    {
        user: "router",
        pwd: "router",
        roles: [
            {
                role: "readWrite",
                db: "mhs-router"
            }
        ]
    }
);

/////////////////////////////////////////////////////////////////////////////////////////////////
db = db.getSiblingDB('mhs-notification');
db.createUser(
    {
        user: "notification",
        pwd: "notification",
        roles: [
            {
                role: "readWrite",
                db: "mhs-notification"
            }
        ]
    }
);

/////////////////////////////////////////////////////////////////////////////////////////////////
db = db.getSiblingDB('mhs-reporting');
db.createUser(
    {
        user: "reporting",
        pwd: "reporting",
        roles: [
            {
                role: "readWrite",
                db: "mhs-reporting"
            }
        ]
    }
);

/////////////////////////////////////////////////////////////////////////////////////////////////
db = db.getSiblingDB('mhs-line-config');
db.createUser(
    {
        user: "lineconfig",
        pwd: "lineconfig",
        roles: [
            {
                role: "readWrite",
                db: "mhs-line-config"
            }
        ]
    }
);
db.createUser(
    {
        user: "lineconfig-ro",
        pwd: "lineconfig-ro",
        roles: [
            {
                role: "read",
                db: "mhs-line-config"
            }
        ]
    }
);


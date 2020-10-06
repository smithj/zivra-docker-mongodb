
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

db.createUser(
    {
        user: "messagestore",
        pwd: "messagestore",
        roles: [
            {
                role: "readWrite",
                db: "supernova"
            }
        ]
    }
);



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

// messagestore - ro / messagestore / supernova
// lineconfig - ro / lineconfig / mhs - line - config
// dupcheck-ro / dupcheck / mhs - duplicate - check
db.createUser(
    {
        user: "messagestore-ro",
        pwd: "messagestore-ro",
        roles: [
            {
                role: "readWrite",
                db: "supernova"
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
                role: "readWrite",
                db: "mhs-line-config"
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
                role: "readWrite",
                db: "mhs-duplicate-check"
            }
        ]
    }
);


db.createUser(
    {
        user: "mhsUser",
        pwd: "user",
        roles: [
            { role: "read", db: "supernova" },
            { role: "read", db: "mhs-duplicate-check" },
            { role: "read", db: "mhs-router" },
            { role: "read", db: "mhs-notification" },
            { role: "read", db: "mhs-reporting" },
            { role: "read", db: "mhs-line-config" },
            ]
    }
);

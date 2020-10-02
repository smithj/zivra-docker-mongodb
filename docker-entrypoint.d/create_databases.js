let error = true

let res = [


//     user / pwd / dbname
// messagestore / messagestore / supernova
// dupcheck / dupcheck / mhs - duplicate - check
// router / router / mhs - router
// notification / notification / mhs - notification
// reporting / reporting / mhs - reporting
// lineconfig / lineconfig / mhs - line - config


    // db = db.getSiblingDB('NewDatabase');

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
    ),



    db.createUser(
        {
            user: "dupcheck",
            pwd: "dupcheck",
            roles: [
                {
                    role: "readWrite",
                    db: "mhs - duplicate - check"
                }
            ]
        }
    ),

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
    ),

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
    ),
    db.createUser(
        {
            user: "reporting",
            pwd: "reporting",
            roles: [
                {
                    role: "readWrite",
                    db: "mhs-notificationmhs-reporting"
                }
            ]
        }
    ),
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
    ),


//     user/pwd/dbname
// messagestore/messagestore/supernova
// dupcheck/dupcheck/mhs-duplicate-check
// router/router/mhs-router
// notification/notification/mhs-notification
// reporting/reporting/mhs-reporting
// lineconfig/lineconfig/mhs-line-config


    // db.container.drop(),
    // db.container.createIndex({ myfield: 1 }, { unique: true }),
    // db.container.createIndex({ thatfield: 1 }),
    // db.container.createIndex({ thatfield: 1 }),
    // db.container.insert({ myfield: 'hello', thatfield: 'testing' }),
    // db.container.insert({ myfield: 'hello2', thatfield: 'testing' }),
    // db.container.insert({ myfield: 'hello3', thatfield: 'testing' }),
    // db.container.insert({ myfield: 'hello3', thatfield: 'testing' }),
    // db.other.
]

printjson(res)

if (error) {
    print('Error, exiting')
    quit(1)
}
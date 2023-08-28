import  sqlite3  from "sqlite3";
import { open } from "sqlite";


export class Connection {
    constructor(connection, dbFile = './test.db') {
        let self = this;
        this.dbFile = dbFile;
        this.connection = connection;
        // connection(dbFile).then(db =>{ self.db = db});
    }
    async query(sql, data) {
        await this.setUpConnect();
        const statement = await this.db.prepare(sql);
        return statement.all(data);
    }
    async queryRaw(sql) {
        await this.setUpConnect();
        return await this.db.all(sql);
    }
    async execute(sql, data) {
        await this.setUpConnect();
        return await this.db.run(sql,data);
    }
    async executeRaw(sql) {
        await this.setUpConnect();
        return this.db.run(sql);
    }
    async setUpConnect(){
        if (!this.db) this.db = await this.connection(this.dbFile);
    }


}

export const npmConnection = async (dbfile, driver = sqlite3.Database) => {
    return open({
        filename: dbfile,
        driver: driver
    })
}

export const webSql = async (dbName = 'test.db') => {
    return openDatabase(dbName, '1.0', 'TestDb', 2000000000);
}

const query = (db, stmt, params) => {
    return  new Promise((res, rej) => {
        db.transaction(tx =>
            tx.executeSql(stmt, params,
                (tx, data) => res(data), // if the query is successful, return the data
                (tx, err) => rej(err) // if the query fails, reject with the error
            ));
    });
}

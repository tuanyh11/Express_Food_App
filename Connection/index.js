import mongoose from "mongoose"

class Connect {
    constructor() {
        this.conn = mongoose
    }

    async createConnection( url,  cb) {
        try {
           this.conn =  mongoose.connect(url, {
            autoIndex: true
           })
           cb()
        } catch (e) {
            cb(e)
        }
    }
}

const conn = new Connect()

export default conn
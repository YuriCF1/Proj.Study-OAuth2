const getDb = require("../util/database").getDb;
const bcryp = require("bcrypt");

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async saveDataInDB() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static async findOne(email, password) {
    //Static = Não preciso criar um usuário para chamar esse método
    const db = getDb();
    const user = await db
      .collection("users")
      // .findOne({ email: email, password: password });
      .findOne({ email: email });
    if (!user) {
      return null;
    }

    const passwordMatch = await bcryp.compare(password, user.password);

    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  }
}

module.exports = User;

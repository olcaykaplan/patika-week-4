import db from "../config/db";

class User {
  fullName?;
  email?: string;
  password?: string;
  profilePhoto?: string;
  intro?: string;
  jobTitle?: string;
  
  constructor(fullName?: string, email?: string, password?: string) {
    (this.fullName = fullName),
      (this.email = email),
      (this.password = password);
  }

  save() {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    const today = `${yyyy}-${mm}-${dd}`;
    let user = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      registeredAt: today,
      profilePhoto: this.profilePhoto,
      intro: this.intro,
      jobTitle: this.jobTitle,
    };
    let query = "INSERT INTO user SET ?";
    const newPost = db.query(query, user);
    return newPost;
  }

  static findAll() {
    let sql = "SELECT * FROM user";
    return db.query(sql);
  }
  async findUserByID(id: number) : Promise<object> {
    console.log("id",id)
    let query = `SELECT * FROM user WHERE id = '${id}';`;
    const [data, _] = await db.query(query) ;
    console.log("data[0]: ",typeof data, " | ",data)
    return data;
  }
  async findUserByEmail(email: string) {
    let query = `SELECT * FROM user WHERE email = "${email}";`;
    const [user, _] = await db.query(query);
    return user;
  }
}
export default User;

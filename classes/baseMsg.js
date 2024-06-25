class BaseMsg {
  static STATUSES = {
    Success: "Success",
    Failed: "Failed",
  };
  status;
  msg;
  isAdmin;
  constructor(status, msg, isAdmin) {
    this.status = status;
    this.msg = msg;
    this.isAdmin = isAdmin;
  }
}

module.exports = BaseMsg;
// class BaseMsg {
//   static STATUSES = {
//     Success: "Success",
//     Failed: "Failed",
//   };
//   status;
//   msg;
//   constructor(status, msg) {
//     this.status = status;
//     this.msg = msg;
//   }
// }

// module.exports = BaseMsg;

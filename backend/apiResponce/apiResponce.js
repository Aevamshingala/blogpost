class ApiResponce {
  constructor(statuscode, message = "success", success, data) {
    this.statuscode = statuscode;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
export { ApiResponce };
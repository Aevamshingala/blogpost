class Apierror extends Error {
  constructor(
    statuscode,
    message = "something went wrong",
    success,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statuscode = statuscode;
    this.message = message;
    this.success = success;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { Apierror };

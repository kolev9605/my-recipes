export class UserSignUp {
  public username: string;
  public password: string;
  public email: string;

  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

export class UserSignIn {
  public username: string;
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class ConfirmSignUp {
  public code: string;
  public username: string;

  constructor(code: string, username: string) {
    this.code = code;
    this.username = username;
  }
}

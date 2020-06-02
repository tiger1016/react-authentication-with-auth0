import auth0 from 'auth0-js'

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-cjv7mffd.auth0.com",
      audience: 'https://dev-cjv7mffd.auth0.com/userinfo',
      clientID: 'v26cEIZsPZgjTtY2ajXbHGIRPu093J0B',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'id_token',
      scope: 'openid profile'
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile () {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    return new Date().getTime() < this.expireAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) return reject(err);

        // this.idToken = authResult.idToken;
        // this.profile = authResult.idTokenPayload;
        // this.expireAt = authResult.idTokenPayload.exp * 1000;
        this.setSession(authResult);
        resolve();
      })
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.expireAt = authResult.idTokenPayload.exp * 1000;
  }

  signOut() {
    // this.idToken = null;
    // this.profile = null;
    // this.expireAt = null;
    this.auth0.logout({
      returnTo: 'http://localhost:3000',
      clientID: 'v26cEIZsPZgjTtY2ajXbHGIRPu093J0B'
    })
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      })
    })
  }
}

const auth0Client = new Auth();


export default auth0Client;
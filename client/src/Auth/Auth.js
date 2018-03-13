
import history from './History';
import auth0 from 'auth0-js';
import axios from 'axios'

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }

    getProfile(accessToken) {
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                return profile
            }
            else (console.log(err))
        });
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                history.replace('/users');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    findOrCreateUser = () => {
        axios.post('api/users', { localStorage })
            .then((res) => localStorage.setItem('userId', res.data._id))
            .catch((err) => console.log(err))
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
            if (profile) {
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
                localStorage.setItem('name', profile.name);
                localStorage.setItem('picture', profile.picture);
                localStorage.setItem('email', profile.email);
                localStorage.setItem('username', profile.nickname);
                // verify DB
                this.findOrCreateUser()
                history.replace('/users');
            }
            else (console.log(err))
        });
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('name');
        localStorage.removeItem('picture');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        // navigate to the home route
        history.replace('/users');
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
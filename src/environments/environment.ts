// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'myproject-e549a',
    appId: '1:1032488172835:web:dd202b31ce3008df8ca096',
    databaseURL: 'https://myproject-e549a.firebaseio.com',
    storageBucket: 'myproject-e549a.appspot.com',
    apiKey: 'AIzaSyAvIdP2lqkFrepPZ4ZLz1AWN-_2k_4sSl4',
    authDomain: 'myproject-e549a.firebaseapp.com',
    messagingSenderId: '1032488172835',
    measurementId: 'G-BE20K0J3EK',
  },
  firebaseAuthURL : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCS6DF-_OVDjLHWw54oXy3In2rjhHtadpg',
  firebaseSignUp :"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCS6DF-_OVDjLHWw54oXy3In2rjhHtadpg",
  production: false,
  // firebaseConfig : {
  //   apiKey: "YOUR_API_KEY",
  //   authDomain: "YOUR_AUTH_DOMAIN",
  //   databaseURL: "YOUR_DATABASE_URL",
  //   projectId: "YOUR_PROJECT_ID",
  //   storageBucket: "YOUR_STORAGE_BUCKET",
  //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

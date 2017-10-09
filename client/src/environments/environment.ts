// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDCJ9tHgmpqk906GRAfhSqJOzbpLC8Quxc",
    authDomain: "proctorial-system.firebaseapp.com",
    databaseURL: "https://proctorial-system.firebaseio.com",
    projectId: "proctorial-system",
    storageBucket: "",
    mesagingSenderId: "171077402137"
  }
};
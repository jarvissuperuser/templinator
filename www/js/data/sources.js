import {environment} from "./config.js";


export const initFireBase = (firebase) => {
    try{
        if(!environment.prod) {
            firebase.initializeApp(environment.local.keys);
            firebase.auth().useEmulator(environment.local.keys.authDomain);
            firebase.firestore().useEmulator(environment.local.keys.fire.host, environment.local.keys.fire.port);
            firebase.storage().useEmulator(
                environment.local.keys.storage.host,
                environment.local.keys.storage.port
            );
        } else {
            firebase.initializeApp(environment.credentials.keys);
        }
        // window.fire = new Fire(firebase);
    }catch (e) {
        console.debug(e);
    }

}
export const listTemplates = () => {
    if (cordova) {
        return new Promise((resolve, reject) =>
        FirebasePlugin.fetchFirestoreCollection('template',
            [['docType', 'in', ['Invoice', 'Quote']]],
            resolve,
            reject));
    }
    return Promise.reject('no cordova Plugin');
}

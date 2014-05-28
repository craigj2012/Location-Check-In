/**
 * Application Settings
 */

var appSettings = {

    everlive: {
        apiKey: 'WRqlNRftKg0AiOlj', // Put your Backend Services API key here
        scheme: 'http'
    },

    eqatec: {
        productKey: '1d1a756214c94fe1998c147e345b3aeb',  // Put your EQATEC product key here
        version: '1.0.0.0' // Put your application version here
    },

    

    adfs: {
        adfsRealm: '$ADFS_REALM$', // Put your ADFS Realm here
        adfsEndpoint: '$ADFS_ENDPOINT$' // Put your ADFS Endpoint here
    },

    messages: {
        mistSimulatorAlert: 'The social login doesn\'t work in the In-Browser Client, you need to deploy the app to a device, or run it in the simulator of the Windows Client or Visual Studio.',
        removeActivityConfirm: 'Are you sure you want to delete this Activity?'
    }
};

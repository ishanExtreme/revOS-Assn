
const setting = {
    dev: {
        apiUrl: 'https://datafeed.revos.in/v2'
    },
    prod: {
        apiUrl: 'https://datafeed.revos.in/v2'
    },
}

const getCurrentSettings = ()=>{

    if(process.env.STAGE === 'development') return setting.dev;
    else return setting.prod;
}

export default getCurrentSettings();
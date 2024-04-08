import { logMessageToSlack } from '../services/logging/slack';

export const startPeriodicTasks = () => {
    // checkCPF();
    // setInterval(checkCPF, 1000 * 60 * 10); // 10 minutes;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkCPF = async () => {
    const URL = 'https://www.moncompteformation.gouv.fr/espace-prive';
    logMessageToSlack(`Checking ${URL}`);

    const res = await fetch(URL);
    if (res.status === 503) {
        logMessageToSlack('@Adrien still unavailable');
    } else {
        logMessageToSlack('@Adrien NOW AVAILABLE');
    }
};

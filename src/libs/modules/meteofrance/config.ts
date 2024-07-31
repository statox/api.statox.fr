import { Station } from './types';

// List of hourly stations obstained once with an API call
const stations: Station[] = [
    {
        id: '75116008',
        nom: 'LONGCHAMP'
    },
    // {
    //     id: '75104001',
    //     nom: 'TOUR ST-JACQUES'
    // },
    {
        id: '75106001',
        nom: 'LUXEMBOURG'
    },
    {
        id: '75107005',
        nom: 'TOUR EIFFEL'
    },
    {
        id: '75110001',
        nom: 'LARIBOISIERE'
    },
    {
        id: '75114001',
        nom: 'PARIS-MONTSOURIS'
    },
    // {
    //     id: '75114002',
    //     nom: 'OBSERVATOIRE'
    // },
    {
        id: '75114007',
        nom: 'PARIS-MONTSOURIS-DOUBLE'
    }
    // {
    //     id: '75120006',
    //     nom: 'BELLEVILLE PARC'
    // }
];

export const getStations = () => stations;
export const failureTimeoutMs = () => 5000;

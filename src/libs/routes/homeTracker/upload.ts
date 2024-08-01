import type { Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { slog } from '../../modules/logging';

const handler = async (req: Request, res: Response) => {
    const {
        batteryCharge,
        batteryPercent,
        detectedForcedReset,
        detectedLowBattery,
        humidity,
        internalHumidity,
        internalTempCelsius,
        pressurePa,
        sensorName,
        tempCelsius,
        timeToSendMs
    } = req.body;

    slog.log('home-tracker', 'Home tracking event', {
        batteryCharge,
        batteryPercent,
        detectedLowBattery,
        detectedForcedReset,
        humidity,
        internalHumidity,
        internalTempCelsius,
        pressurehPa: pressurePa / 100,
        sensorName,
        tempCelsius,
        timeToSendMs
    });
    res.send({});
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['sensorName'],
    additionalProperties: false,
    properties: {
        sensorName: {
            description: 'Name of the sensor',
            type: 'string'
        },
        tempCelsius: {
            description: 'The current room temperature in celsius',
            type: 'number',
            minimum: -50,
            maximum: 80
        },
        humidity: {
            description: 'The current room humidity in percent',
            type: 'number',
            minimum: 0,
            maximum: 100
        },
        pressurePa: {
            description: 'The current room pressure in Pascal',
            type: 'number',
            // https://en.wikipedia.org/wiki/Atmospheric_pressure#Records
            minimum: 80000,
            maximum: 110000
        },
        internalTempCelsius: {
            description: 'The current room temperature in celsius',
            type: 'number',
            minimum: -50,
            maximum: 80
        },
        internalHumidity: {
            description: 'The current room humidity in percent',
            type: 'number',
            minimum: 0,
            maximum: 100
        },
        batteryCharge: {
            description: 'Computed charge of the battery in Volts',
            type: 'number',
            minimum: 0,
            // LiPo should not go above 4.2 while in charge
            maximum: 5
        },
        batteryPercent: {
            description: 'Computed percentage battery',
            type: 'number',
            minimum: 0,
            maximum: 110
        },
        timeToSendMs: {
            description: 'Computed interval between the start of the loop and the HTTP call',
            type: 'number',
            minimum: 0
        },
        detectedLowBattery: {
            description: 'True if board detected a battery voltage low enough to trigger shutdown',
            type: 'boolean'
        },
        detectedForcedReset: {
            description: 'True if board detected it restarted after an interrupt forced a restart',
            type: 'boolean'
        }
    }
};

export const route: PostRoute = {
    // TODO add API key authentication
    method: 'post',
    path: '/homeTracker/upload',
    inputSchema,
    handler,
    authentication: 'none'
};

import type { Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { slog } from '../../services/logging';

const handler = async (req: Request, res: Response) => {
    const {
        batteryCharge,
        batteryPercent,
        batteryReading,
        humidity,
        humidity2,
        internalHumidity,
        internalTempCelsius,
        pressurePa,
        sensorName,
        tempCelsius,
        tempCelsius2
    } = req.body;

    slog.log('home-tracker', 'Home tracking event', {
        batteryCharge,
        batteryPercent,
        batteryReading,
        humidity,
        humidity2,
        internalHumidity,
        internalTempCelsius,
        pressurehPa: pressurePa / 100,
        sensorName,
        tempCelsius,
        tempCelsius2
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
            type: 'number'
        },
        humidity: {
            description: 'The current room humidity in percent',
            type: 'number'
        },
        pressurePa: {
            description: 'The current room pressure in Pascal',
            type: 'number'
        },
        internalTempCelsius: {
            description: 'The current room temperature in celsius',
            type: 'number'
        },
        internalHumidity: {
            description: 'The current room humidity in percent',
            type: 'number'
        },
        tempCelsius2: {
            description: '(DEPRECATED) The current room temperature in celsius (from BME)',
            type: 'number'
        },
        humidity2: {
            description: '(DEPRECATED) The current room humidity in percent (from BME)',
            type: 'number'
        },
        batteryCharge: {
            description: 'Computed charge of the battery in Volts',
            type: 'number'
        },
        batteryPercent: {
            description: 'Computed percentage battery',
            type: 'number'
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

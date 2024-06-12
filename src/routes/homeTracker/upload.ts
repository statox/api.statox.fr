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
        ts: {
            description:
                '(DEPRECATED) Time of the recording in ms (should be based on getRemoteTime)',
            type: 'number'
        },
        tempCelsius: {
            description: 'The current room temperature in celsius (from DHT)',
            type: 'number'
        },
        tempCelsius2: {
            description: 'The current room temperature in celsius (from BME)',
            type: 'number'
        },
        humidity: {
            description: 'The current room humidity in percent (from DHT)',
            type: 'number'
        },
        humidity2: {
            description: 'The current room humidity in percent (from BME)',
            type: 'number'
        },
        pressurePa: {
            description: 'The current pressure in Pascal (from BME)',
            type: 'number'
        },
        batteryReading: {
            description:
                '(DEPRECATED) Analogue value read at tension divisor (See sensor code, max ~700)',
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

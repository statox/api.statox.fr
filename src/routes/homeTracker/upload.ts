import type { Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { slog } from '../../services/logging';

const handler = async (req: Request, res: Response) => {
    const { sensorName, batteryPercent, batteryReading, humidity, tempCelsius, tempCelsius2, ts } =
        req.body;

    slog.log({
        batteryPercent,
        batteryReading,
        humidity,
        message: 'Home tracking event',
        sensorName,
        tempCelsius,
        tempCelsius2,
        // Remove decimal part in case my IOT messes up the timestamp
        ts: Math.trunc(ts)
    });
    res.send({});
};

const inputSchema: AllowedSchema = {
    type: 'object',
    required: ['sensorName', 'ts'],
    additionalProperties: false,
    properties: {
        sensorName: {
            description: 'Name of the sensor',
            type: 'string'
        },
        ts: {
            description: 'Time of the recording in ms (should be based on getRemoteTime)',
            type: 'number'
        },
        tempCelsius: {
            description: 'The current room temperature in celsius (from VMA)',
            type: 'number'
        },
        tempCelsius2: {
            description: 'The current room temperature in celsius (from DHT)',
            type: 'number'
        },
        humidity: {
            description: 'The current room humidity in percent (from DHT)',
            type: 'number'
        },
        batteryReading: {
            description: 'Analogue value read at tension divisor (See sensor code, max ~700)',
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
    handler
};

import type { Request, Response } from 'express';
import { AllowedSchema } from 'express-json-validator-middleware';
import { PostRoute } from '../types';
import { slog } from '../../services/logging';

const handler = async (req: Request, res: Response) => {
    const { sensorName, ts, tempCelsius, tempCelsius2, humidity } = req.body;
    slog.log({
        message: 'Home tracking event',
        sensorName,
        // Remove decimal part in case my IOT messes up the timestamp
        ts: Math.trunc(ts),
        tempCelsius,
        tempCelsius2,
        humidity
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

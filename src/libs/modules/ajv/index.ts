import Ajv from 'ajv';
import { JSONSchema4, JSONSchema6, JSONSchema7 } from 'json-schema';

type AllowedSchema = JSONSchema4 | JSONSchema6 | JSONSchema7;

const ajv = new Ajv.Ajv();

export const validateAgainstJsonSchema = (object: unknown, schema: AllowedSchema) => {
    const validateFunction = ajv.compile(schema);
    const valid = validateFunction(object);

    if (!valid) {
        if (validateFunction.errors?.length) {
            throw validateFunction.errors;
        }
        throw new Error('Output validation failed without error. This is unexpected');
    }

    return true;
};

type AjvError = Ajv.ErrorObject;
export const isAjvError = (error: unknown): error is AjvError => {
    const errorObject = error as Ajv.ErrorObject;

    if (Array.isArray(error)) {
        return isAjvError(error[0]);
    }

    // Check for required properties
    if (
        !('keyword' in errorObject) ||
        !('instancePath' in errorObject) ||
        !('schemaPath' in errorObject)
    ) {
        return false;
    }

    return true;
};

import { isDebug } from '../../src/libs/config/env';

const defaultHook = () => Promise.resolve();

// TODO: We can probably get the same typing as sinon
type Hook = () => Promise<void>;

export class TestHelper {
    name: string;
    hooks: {
        beforeAll: Hook;
        beforeEach: Hook;
        afterEach: Hook;
        afterAll: Hook;
    };

    // TODO add the check functions

    constructor(params: {
        name: string;
        hooks?: {
            beforeAll?: Hook;
            beforeEach?: Hook;
            afterEach?: Hook;
            afterAll?: Hook;
        };
    }) {
        this.name = params.name;
        this.hooks = {
            beforeAll: this.hookWrapper('beforeAll', params.hooks?.beforeAll || defaultHook),
            beforeEach: this.hookWrapper('beforeEach', params.hooks?.beforeEach || defaultHook),
            afterEach: this.hookWrapper('afterEach', params.hooks?.afterEach || defaultHook),
            afterAll: this.hookWrapper('afterAll', params.hooks?.afterAll || defaultHook)
        };
    }

    hookWrapper = (step: string, hook: Hook) => {
        return async () => {
            if (isDebug) {
                console.log('Helper', this.name, 'step', step);
            }
            return hook();
        };
    };
}

import { clearMysqlTables } from './helpers';

export const mochaHooks = () => {
    return {
        beforeEach: async () => {
            return clearMysqlTables();
        }
    };
};

import { elkMock } from '../../../src/libs/databases/elk';

export const setupELKMock = () => {
    elkMock.clearAll();
};

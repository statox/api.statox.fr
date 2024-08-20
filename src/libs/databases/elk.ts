import { Client } from '@elastic/elasticsearch';
import Mock from '@elastic/elasticsearch-mock';
import { ELK_API_ENDPOINT, ELK_API_KEY } from '../config/elk';
import { isTests } from '../config/env';

export let elk: Client;
export let elkMock: Mock;

if (isTests) {
    console.log('mocking elk');
    elkMock = new Mock();
    elk = new Client({
        node: 'http://localhost:9200',
        Connection: elkMock.getConnection()
    });
} else {
    elk = new Client({
        node: ELK_API_ENDPOINT,
        auth: {
            apiKey: ELK_API_KEY!
        }
    });
}

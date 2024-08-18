import { Client } from '@elastic/elasticsearch';
import { ELK_API_ENDPOINT, ELK_API_KEY } from '../config/elk';

export const elk = new Client({
    node: ELK_API_ENDPOINT,
    auth: {
        apiKey: ELK_API_KEY!
    }
});

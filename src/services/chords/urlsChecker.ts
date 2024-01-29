import fs from 'node:fs';
import { Chord } from './types';
import { getAllChords } from './queries';

const RESULTS_FILE_PATH = './chords_check_results.json';
const RESULTS_FILE_TTL = 1000 * 60 * 15; // 15 minutes

const checkChordUrl = async (chord: Chord) => {
    if (chord.url.match('s3.eu-west-3')) {
        return { status: 'skipped' };
    }

    return fetch(chord.url)
        .then((response) => {
            if (response.status !== 200) {
                return { status: response.status.toString(), chord };
            }
            return { status: 'ok' };
        })
        .catch((error) => {
            return { status: 'error', chord, error };
        });
};

const getFailingUrls = async (chords: Chord[]) => {
    return Promise.all(chords.map((c) => checkChordUrl(c))).then((result) => {
        const nbChecks = result.length;
        const nbSkipped = result.filter((r) => r.status === 'skipped').length;
        const fails = result.filter((r) => !['ok', 'skipped'].includes(r.status.toString()));
        const nbFails = fails.length;
        const timestamp = Date.now();

        return {
            nbChecks,
            nbSkipped,
            fails,
            nbFails,
            timestamp
        };
    });
};

export const checkChordsUrl = async () => {
    const fileExists = fs.existsSync(RESULTS_FILE_PATH);

    if (fileExists) {
        const now = Date.now();
        const contentStr = fs.readFileSync(RESULTS_FILE_PATH, 'utf-8');
        const content = JSON.parse(contentStr);

        if (content.timestamp + RESULTS_FILE_TTL > now) {
            return content;
        }
    }

    const chords = await getAllChords();
    const results = await getFailingUrls(chords);
    fs.writeFileSync(RESULTS_FILE_PATH, JSON.stringify(results));

    return results;
};

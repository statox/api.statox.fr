type Chord = {
    artist: string;
    title: string;
    url: string;
    creationDate: number;
    tags: string[];
};

const CHORDS_URL = 'https://raw.githubusercontent.com/statox/blog/master/src/_data/chords.json';

export const load = async (): Promise<Chord[]> => {
    const chords = await fetch(CHORDS_URL).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    });
    return chords;
};

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
    const chords = await load();
    const results = await getFailingUrls(chords);
    return results;
};

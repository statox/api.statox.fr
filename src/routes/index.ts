import { Route } from './types';
import { route as addChord } from './chords/addEntry';
import { route as addLinkVisit } from './chords/addLinkVisit';
import { route as getAllChords } from './chords/getAll';
import { route as getLinksVisitsCount } from './chords/getLinksVisitsCount';
import { route as checkLinks } from './chords/checkLinks';
import { route as addEntry } from './clipboard/addEntry';
import { route as deleteClipboardEntry } from './clipboard/deleteEntry';
import { route as getClipboardPublicEntries } from './clipboard/getPublicEntries';
import { route as getClipboardAllEntries } from './clipboard/getAllEntries';
import { route as clipboardStaticView } from './clipboard/staticView';
import { route as getRemoteTime } from './health/getRemoteTime';
import { route as soundTest } from './test/sound';
import { route as soundTest2 } from './test/sound2';

export const routes: Route[] = [
    addChord,
    addEntry,
    addLinkVisit,
    clipboardStaticView,
    deleteClipboardEntry,
    getAllChords,
    getClipboardAllEntries,
    getClipboardPublicEntries,
    getLinksVisitsCount,
    getRemoteTime,
    checkLinks,
    soundTest,
    soundTest2
];

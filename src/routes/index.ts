import { Route } from './types';
import { route as addLinkVisit } from './chords/addLinkVisit';
import { route as getLinksVisitsCount } from './chords/getLinksVisitsCount';
import { route as checkLinks } from './chords/checkLinks';
import { route as addEntry } from './clipboard/addEntry';
import { route as getPublicEntries } from './clipboard/getPublicEntries';
import { route as getRemoteTime } from './health/getRemoteTime';

export const routes: Route[] = [
    addEntry,
    addLinkVisit,
    getLinksVisitsCount,
    getPublicEntries,
    getRemoteTime,
    checkLinks
];

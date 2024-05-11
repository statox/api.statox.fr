import { Route } from './types.js';
import { route as addLinkVisit } from './chords/addLinkVisit.js';
import { route as getAllChords } from './chords/getAll.js';
import { route as getLinksVisitsCount } from './chords/getLinksVisitsCount.js';
import { route as updateAllChords } from './chords/updateAll.js';
import { route as checkLinks } from './chords/checkLinks.js';
import { route as addEntry } from './clipboard/addEntry.js';
import { route as deleteClipboardEntry } from './clipboard/deleteEntry.js';
import { route as getClipboardPublicEntries } from './clipboard/getPublicEntries.js';
import { route as getClipboardAllEntries } from './clipboard/getAllEntries.js';
import { route as clipboardStaticView } from './clipboard/staticView.js';
import { route as getRemoteTime } from './health/getRemoteTime.js';
import { route as reactorAddEntry } from './reactor/addEntry.js';
import { route as reactorGetEntry } from './reactor/getEntry.js';
import { route as reactorGetForPublic } from './reactor/getEntriesForPublic.js';

export const routes: Route[] = [
    addEntry,
    addLinkVisit,
    clipboardStaticView,
    deleteClipboardEntry,
    getAllChords,
    getClipboardAllEntries,
    getClipboardPublicEntries,
    getLinksVisitsCount,
    getRemoteTime,
    reactorAddEntry,
    reactorGetEntry,
    reactorGetForPublic,
    updateAllChords,
    checkLinks
];

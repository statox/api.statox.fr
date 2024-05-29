import { Route } from './types';
import { route as addLinkVisit } from './chords/addLinkVisit';
import { route as getAllChords } from './chords/getAll';
import { route as getLinksVisitsCount } from './chords/getLinksVisitsCount';
import { route as updateAllChords } from './chords/updateAll';
import { route as checkLinks } from './chords/checkLinks';
import { route as addEntry } from './clipboard/addEntry';
import { route as deleteClipboardEntry } from './clipboard/deleteEntry';
import { route as getClipboardPublicEntries } from './clipboard/getPublicEntries';
import { route as getClipboardAllEntries } from './clipboard/getAllEntries';
import { route as clipboardStaticView } from './clipboard/staticView';
import { route as getRemoteTime } from './health/getRemoteTime';
import { route as reactorAddEntry } from './reactor/addEntry';
import { route as reactorGetEntry } from './reactor/getEntry';
import { route as reactorGetForPublic } from './reactor/getEntriesForPublic';
import { route as homeTrackerUpload } from './homeTracker/upload';
import { route as webWatcherCreateWatcher } from './webWatcher/createWatcher';
import { route as webWatcherDeleteWatcher } from './webWatcher/deleteWatcher';
import { route as webWatcherGetAllWatcher } from './webWatcher/getAllWatchers';

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
    homeTrackerUpload,
    reactorAddEntry,
    reactorGetEntry,
    reactorGetForPublic,
    updateAllChords,
    checkLinks,
    webWatcherCreateWatcher,
    webWatcherDeleteWatcher,
    webWatcherGetAllWatcher
];

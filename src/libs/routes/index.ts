import { Route } from './types';
import { route as Chords_addLinkVisit } from './chords/addLinkVisit';
import { route as Chords_checkLinks } from './chords/checkLinks';
import { route as Chords_getAll } from './chords/getAll';
import { route as Chords_getLinksVisitsCount } from './chords/getLinksVisitsCount';
import { route as Chords_updateAll } from './chords/updateAll';
import { route as Clipboard_addEntry } from './clipboard/addEntry';
import { route as Clipboard_deleteEntry } from './clipboard/deleteEntry';
import { route as Clipboard_geAllEntries } from './clipboard/getAllEntries';
import { route as Clipboard_getPublicEntries } from './clipboard/getPublicEntries';
import { route as Clipboard_staticView } from './clipboard/staticView';
import { route as Health_GetRemoteTime } from './health/getRemoteTime';
import { route as HomeTracker_allSensorsWithLatestLog } from './homeTracker/allSensorsWithLatestLog';
import { route as HomeTracker_histogramData } from './homeTracker/histogramData';
import { route as HomeTracker_upload } from './homeTracker/upload';
import { route as Reactor_addEntry } from './reactor/addEntry';
import { route as Reactor_getEntriesForPublic } from './reactor/getEntriesForPublic';
import { route as Reactor_getEntry } from './reactor/getEntry';
import { route as ReadingList_addEntry } from './readingList/addEntry';
import { route as ReadingList_getAllEntries } from './readingList/getAllEntries';
import { route as WebWatcher_createWatcher } from './webWatcher/createWatcher';
import { route as WebWatcher_deleteWatcher } from './webWatcher/deleteWatcher';
import { route as WebWatcher_getAllWatcher } from './webWatcher/getAllWatchers';
import { route as WebWatcher_toggleWatcherEnabled } from './webWatcher/toggleWatcherEnabled';

export const routes: Route[] = [
    Chords_addLinkVisit,
    Chords_checkLinks,
    Chords_getAll,
    Chords_getLinksVisitsCount,
    Chords_updateAll,
    Clipboard_addEntry,
    Clipboard_deleteEntry,
    Clipboard_geAllEntries,
    Clipboard_getPublicEntries,
    Clipboard_staticView,
    Health_GetRemoteTime,
    HomeTracker_allSensorsWithLatestLog,
    HomeTracker_histogramData,
    HomeTracker_upload,
    Reactor_addEntry,
    Reactor_getEntriesForPublic,
    Reactor_getEntry,
    ReadingList_addEntry,
    ReadingList_getAllEntries,
    WebWatcher_createWatcher,
    WebWatcher_deleteWatcher,
    WebWatcher_getAllWatcher,
    WebWatcher_toggleWatcherEnabled
];

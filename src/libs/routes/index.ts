import { Route } from './types.js';
import { route as Chords_addLinkVisit } from './chords/addLinkVisit.js';
import { route as Chords_checkLinks } from './chords/checkLinks.js';
import { route as Chords_getAll } from './chords/getAll.js';
import { route as Chords_getLinksVisitsCount } from './chords/getLinksVisitsCount.js';
import { route as Chords_updateAll } from './chords/updateAll.js';
import { route as Clipboard_addEntry } from './clipboard/addEntry.js';
import { route as Clipboard_deleteEntry } from './clipboard/deleteEntry.js';
import { route as Clipboard_geAllEntries } from './clipboard/getAllEntries.js';
import { route as Clipboard_getPublicEntries } from './clipboard/getPublicEntries.js';
import { route as Clipboard_staticView } from './clipboard/staticView.js';
import { route as Cookbook_addRecipe } from './cookbook/addRecipe.js';
import { route as Cookbook_getRecipe } from './cookbook/getRecipe.js';
import { route as Cookbook_listIngredients } from './cookbook/listIngredients.js';
import { route as Cookbook_listRecipes } from './cookbook/listRecipes.js';
import { route as Gravitrips_getNewGame } from './gravitrips/getNewGame.js';
import { route as Health_GetRemoteTime } from './health/getRemoteTime.js';
import { route as HomeTracker_getEphemerides } from './homeTracker/getEphemerides.js';
import { route as HomeTracker_getSensorsDataForDashboard } from './homeTracker/getSensorsDataForDashboard.js';
import { route as HomeTracker_getWeatherForecast } from './homeTracker/getWeatherForecast.js';
import { route as HomeTracker_histogramData } from './homeTracker/histogramData.js';
import { route as HomeTracker_histogramDataPublic } from './homeTracker/histogramDataPublic.js';
import { route as HomeTracker_updateSensorMetadata } from './homeTracker/updateSensorMetadata.js';
import { route as HomeTracker_upload } from './homeTracker/upload.js';
import { route as PersonalTracker_GetAll } from './personalTracker/getAll.js';
import { route as PersonalTracker_Upload } from './personalTracker/upload.js';
import { route as Reactor_addEntry } from './reactor/addEntry.js';
import { route as Reactor_getEntriesForPublic } from './reactor/getEntriesForPublic.js';
import { route as Reactor_getEntry } from './reactor/getEntry.js';
import { route as ReadingList_addEntry } from './readingList/addEntry.js';
import { route as ReadingList_getAllEntries } from './readingList/getAllEntries.js';
import { route as WebWatcher_createWatcher } from './webWatcher/createWatcher.js';
import { route as WebWatcher_deleteWatcher } from './webWatcher/deleteWatcher.js';
import { route as WebWatcher_getAllWatcher } from './webWatcher/getAllWatchers.js';
import { route as WebWatcher_toggleWatcherEnabled } from './webWatcher/toggleWatcherEnabled.js';

import { route as Gravitrips_WSGame } from './gravitrips/ws_game.js';

export const routes: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    list: Route<any, any>[];
} = {
    list: [
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
        Cookbook_addRecipe,
        Cookbook_getRecipe,
        Cookbook_listIngredients,
        Cookbook_listRecipes,
        Gravitrips_getNewGame,
        Health_GetRemoteTime,
        HomeTracker_getEphemerides,
        HomeTracker_getSensorsDataForDashboard,
        HomeTracker_getWeatherForecast,
        HomeTracker_histogramData,
        HomeTracker_histogramDataPublic,
        HomeTracker_updateSensorMetadata,
        HomeTracker_upload,
        PersonalTracker_GetAll,
        PersonalTracker_Upload,
        Reactor_addEntry,
        Reactor_getEntriesForPublic,
        Reactor_getEntry,
        ReadingList_addEntry,
        ReadingList_getAllEntries,
        WebWatcher_createWatcher,
        WebWatcher_deleteWatcher,
        WebWatcher_getAllWatcher,
        WebWatcher_toggleWatcherEnabled
    ]
};

export const routesWS = {
    list: [Gravitrips_WSGame]
};

import { Route } from './types';
import { route as addChordLinkVisit } from './addChordLinkVisit';
import { route as getChordLinksVisitCount } from './getChordLinksVisitCount';
import { route as getRemoteTime } from './getRemoteTime';
import { route as checkChordsUrl } from './chordsCheckRoute';
import { route as testRoute } from './testRoute';

export const routes: Route[] = [
    addChordLinkVisit,
    getChordLinksVisitCount,
    getRemoteTime,
    checkChordsUrl,
    testRoute
];

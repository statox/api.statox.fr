import { Route } from './types';
import { route as addLinkVisit } from './chords/addLinkVisit';
import { route as getLinksVisitsCount } from './chords/getLinksVisitsCount';
import { route as getRemoteTime } from './health/getRemoteTime';
import { route as checkLinks } from './chords/checkLinks';

export const routes: Route[] = [addLinkVisit, getLinksVisitsCount, getRemoteTime, checkLinks];

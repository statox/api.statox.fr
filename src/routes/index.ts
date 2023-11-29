import { Route } from './types';
import { route as getRemoteTime } from './getRemoteTime';
import { route as checkChordsUrl } from './chordsCheckRoute';
import { route as testRoute } from './testRoute';

export const routes: Route[] = [getRemoteTime, checkChordsUrl, testRoute];

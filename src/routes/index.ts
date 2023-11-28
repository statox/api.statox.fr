import { Route } from './types';
import { route as getRemoteTime } from './getRemoteTime';
import { route as checkChordsUrl } from './chordsCheckRoute';

export const routes: Route[] = [getRemoteTime, checkChordsUrl];

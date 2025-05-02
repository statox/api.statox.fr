/*
 * Release script.
 *
 * It is run by heroku whenever a release happens.
 * See https://devcenter.heroku.com/articles/release-phase
 *
 * It is configured in Procfile.
 */

import { slog } from '../../libs/modules/logging/slog.js';

slog.log('app', 'New deployment');

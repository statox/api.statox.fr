/*
 * (c) 2011-2015, Vladimir Agafonkin
 * SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 * https://github.com/mourner/suncalc
 *
 * Ported to TypeScript by Adrien Fabre in 2024 for
 * https://github.com/statox/api.statox.fr
 */

/*
 * Shortcuts for easier to read formulas
 */
const { PI, sin, cos, tan, asin, acos } = Math;
const atan = Math.atan2;
const rad = PI / 180;

/*
 * Sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas
 */
// date/time constants and conversions
const dayMs = 1000 * 60 * 60 * 24;
const J1970 = 2440588;
const J2000 = 2451545;

function toJulian(date: Date) {
    return date.valueOf() / dayMs - 0.5 + J1970;
}
function fromJulian(j: number) {
    return new Date((j + 0.5 - J1970) * dayMs);
}
function toDays(date: Date) {
    return toJulian(date) - J2000;
}

/*
 * General calculations for position
 */
const e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l: number, b: number) {
    return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
}
function declination(l: number, b: number) {
    return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
}

function azimuth(H: number, phi: number, dec: number) {
    return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
}
function altitude(H: number, phi: number, dec: number) {
    return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
}

function siderealTime(d: number, lw: number) {
    return rad * (280.16 + 360.9856235 * d) - lw;
}

function astroRefraction(h: number) {
    if (h < 0) {
        // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.
    }

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

/*
 * General sun calculations
 */
function solarMeanAnomaly(d: number) {
    return rad * (357.5291 + 0.98560028 * d);
}

function eclipticLongitude(M: number) {
    const C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)); // equation of center
    const P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d: number) {
    const M = solarMeanAnomaly(d);
    const L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}

export interface SunPosition {
    azimuth: number;
    altitude: number;
}
/**
 * Calculates sun position for a given date and latitude/longitude
 */
export const getPosition = function (date: Date, lat: number, lng: number): SunPosition {
    const lw = rad * -lng;
    const phi = rad * lat;
    const d = toDays(date);
    const c = sunCoords(d);
    const H = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};

// sun times configuration (angle, morning name, evening name)
export const times = [
    [-0.833, 'sunrise', 'sunset'],
    [-0.3, 'sunriseEnd', 'sunsetStart'],
    [-6, 'dawn', 'dusk'],
    [-12, 'nauticalDawn', 'nauticalDusk'],
    [-18, 'nightEnd', 'night'],
    [6, 'goldenHourEnd', 'goldenHour']
];

/**
 * Adds a custom time to the times config
 */
export const addTime = function (angle: number, riseName: string, setName: string) {
    times.push([angle, riseName, setName]);
};

/*
 * Calculations for sun times
 */
const J0 = 0.0009;

function julianCycle(d: number, lw: number) {
    return Math.round(d - J0 - lw / (2 * PI));
}

function approxTransit(Ht: number, lw: number, n: number) {
    return J0 + (Ht + lw) / (2 * PI) + n;
}
function solarTransitJ(ds: number, M: number, L: number) {
    return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
}

function hourAngle(h: number, phi: number, d: number) {
    return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
}
function observerAngle(height: number) {
    return (-2.076 * Math.sqrt(height)) / 60;
}

/**
 * returns set time for the given sun altitude
 */
function getSetJ(h: number, lw: number, phi: number, dec: number, n: number, M: number, L: number) {
    const w = hourAngle(h, phi, dec);
    const a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}

export type SunTimes = Record<string, Date>;

/**
 * Calculates sun times for a given date, latitude/longitude, and, optionally,
 * the observer height (in meters) relative to the horizon
 */
export const getTimes = function (date: Date, lat: number, lng: number, height = 0): SunTimes {
    const lw = rad * -lng;
    const phi = rad * lat;
    const dh = observerAngle(height);
    const d = toDays(date);
    const n = julianCycle(d, lw);
    const ds = approxTransit(0, lw, n);
    const M = solarMeanAnomaly(ds);
    const L = eclipticLongitude(M);
    const dec = declination(L, 0);
    const Jnoon = solarTransitJ(ds, M, L);

    const result: SunTimes = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (let i = 0; i < times.length; i++) {
        const time = times[i];
        const h0 = (Number(time[0]) + dh) * rad;

        const Jset = getSetJ(h0, lw, phi, dec, n, M, L);
        const Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};

// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas
function moonCoords(d: number) {
    // geocentric ecliptic coordinates of the moon
    const L = rad * (218.316 + 13.176396 * d); // ecliptic longitude
    const M = rad * (134.963 + 13.064993 * d); // mean anomaly
    const F = rad * (93.272 + 13.22935 * d); // mean distance
    const l = L + rad * 6.289 * sin(M); // longitude
    const b = rad * 5.128 * sin(F); // latitude
    const dt = 385001 - 20905 * cos(M); // distance to the moon in km

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

export interface MoonPosition {
    azimuth: number;
    altitude: number;
    distance: number;
    parallacticAngle: number;
}

/**
 * Calculates the position of the moon,
 * based on formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
 */
export const getMoonPosition = function (date: Date, lat: number, lng: number): MoonPosition {
    const lw = rad * -lng;
    const phi = rad * lat;
    const d = toDays(date);
    const c = moonCoords(d);
    const H = siderealTime(d, lw) - c.ra;
    let h = altitude(H, phi, c.dec);
    // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    const pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};

export interface MoonIllumination {
    fraction: number;
    phase: number;
    angle: number;
}
/**
 * Calculations for illumination parameters of the moon,
 * based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
 * Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
 */
export const getMoonIllumination = function (date: Date): MoonIllumination {
    const d = toDays(date || new Date());
    const s = sunCoords(d);
    const m = moonCoords(d);
    const sdist = 149598000; // distance from Earth to Sun in km
    const phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra));
    const inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi));
    const angle = atan(
        cos(s.dec) * sin(s.ra - m.ra),
        sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra)
    );

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / Math.PI,
        angle
    };
};

function hoursLater(date: Date, h: number) {
    return new Date(date.valueOf() + (h * dayMs) / 24);
}

export interface MoonTimes {
    rise?: Date;
    set?: Date;
    alwaysUp?: true;
    alwaysDown?: true;
}
/**
 * Calculations for moon rise/set times based on
 * http://www.stargazing.net/kepler/moonrise.html article
 */
export const getMoonTimes = function (
    date: Date,
    lat: number,
    lng: number,
    inUTC: boolean = true
): MoonTimes {
    const t = new Date(date);
    if (inUTC) {
        t.setUTCHours(0, 0, 0, 0);
    } else {
        t.setHours(0, 0, 0, 0);
    }

    const hc = 0.133 * rad;
    let h0 = getMoonPosition(t, lat, lng).altitude - hc;
    let rise, set, ye, x1, x2;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (let i = 1; i <= 24; i += 2) {
        const h1 = getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        const h2 = getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        const a = (h0 + h2) / 2 - h1;
        const b = (h2 - h0) / 2;
        const xe = -b / (2 * a);
        const ye = (a * xe + b) * xe + h1;
        const d = b * b - 4 * a * h1;
        let roots = 0;

        if (d >= 0) {
            const dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (x1 === undefined) {
                throw new Error('Unexpected undefined value of x1');
            }
            if (h0 < 0) {
                rise = i + x1;
            } else {
                set = i + x1;
            }
        } else if (roots === 2) {
            if (x1 === undefined) {
                throw new Error('Unexpected undefined value of x1');
            }
            if (x2 === undefined) {
                throw new Error('Unexpected undefined value of x2');
            }
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    const result: MoonTimes = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye! > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};

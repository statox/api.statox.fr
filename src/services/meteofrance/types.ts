// https://donneespubliques.meteofrance.fr/?fond=produit&id_produit=93&id_rubrique=32&errconnex=1&depuisbandeau=1
export interface MeteoFranceStationObservation {
    lat: number | null; // latitude in degrees
    lon: number | null; // longitude in degrees
    geo_id_insee: string | null; // ID of the point as defined by the INSEE number
    reference_time: string | null; // Date and time of the production of the data in UTC
    insert_time: string | null; // Date and time of database insertion of the data in UTC
    validity_time: string | null; // Date and time of validity of the data in UTC
    t: number | null; // Air temperature at 2 meters above ground (Kelvin)
    td: number | null; // Air temperature of the dew point at 2 meters above ground (Kelvin)
    tx: number | null; // Hourly max air temperature at 2 meters above ground (Kelvin)
    tn: number | null; // Hourly min air temperature at 2 meters above ground (Kelvin)
    u: number | null; // Hourly relative humidity at 2 meters (percent)
    ux: number | null; // hourly maximum relative humidity at 2 meters (percent)
    un: number | null; // hourly minimun relative humidity at 2 meters (percent)
    dd: number | null; // mean wind direction at 10 meters above the ground in degrees (direction)
    ff: number | null; // mean wind speed at 10 meters above the ground (m/s)
    dxy: number | null; // hourly mean wind gust direction at 10 meters above the ground in degrees
    fxy: number | null; // hourly mean wind gust speed at 10 meters above the ground over the previous 1H in m/s
    dxi: number | null; // hourly instant wind gust direction at 10 meters above the ground in degrees
    fxi: number | null; // hourly instant wind gust speed at 10 meters above the ground over the previous 1H in m/s
    rr1: number | null; // all precipitation over the previous 1H in mm
    t_10: number | null; // temperature at 10 centimeters below the ground in Kelvin degrees
    t_20: number | null; // temperature at 20 centimeters below the ground in Kelvin degrees
    t_50: number | null; // temperature at 50 centimeters below the ground in Kelvin degrees
    t_100: number | null; // temperature at 1 meter below the ground in Kelvin degrees
    vv: number | null; // horizontal visibility in meters
    etat_sol: number | null; // ground state code
    sss: number | null; // total depth of snow cover in meters
    n: number | null; // total nebulosity in octas
    insolh: number | null; // sunshine duration over the previous 1H
    ray_glo01: number | null; // hourly global radiation in J/m2
    pres: number | null; // station pressure in Pa
    pmer: number | null; // sea level pressure in Pa
}

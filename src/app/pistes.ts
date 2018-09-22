export class Piste {
      id: number;
      airport_ref: number;
      airport_ident: string;
      length_ft: number;
      width_ft: number;
      surface: string;
      lighted: string;
      closed: number;
      le_ident: string;
      le_latitude_deg: number;
      le_longitude_deg: number;
      le_elevation_ft: number;
      le_heading_degT: number;
      le_displaced_threshold_ft: number;
      he_ident: number;
      he_latitude_deg: number;
      he_longitude_deg: number;
      he_elevation_ft: number;
      he_heading_degT: number;
      he_displaced_threshold_ft: number;

      constructor(id: number, le_ident: string, surface: string) {
            this.id = id;
            this.le_ident = le_ident;
            this.surface = surface;

      }
}

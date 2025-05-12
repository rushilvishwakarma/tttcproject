// Basic entity types
export interface Train {
  id: string;
  name: string;
  type: 'Local' | 'Fast' | 'Semi-Fast';
  capacity: number;
  restrictions: {
    noSundayHoliday: boolean;
    noSaturdaySundayHoliday: boolean;
    ladiesCoaches: {
      enabled: boolean;
      position: 'CSMT' | 'KYN' | 'KJT' | 'KSARA' | 'THANE';
      count: number;
    };
    generalOnHolidays: boolean;
  };
}

export interface Station {
  id: string;
  name: string;
  code: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  lines: Line[];
  platforms: Platform[];
  isFavorite: boolean;
}

export interface Platform {
  id: string;
  number: string;
  type: 'Up' | 'Down';
  length: number; // in coaches
  restrictions?: {
    ladiesOnly?: boolean;
    handicappedAccessible?: boolean;
  };
}

export interface Line {
  id: string;
  name: string;
  code: string;
  type: 'Main' | 'Harbour' | 'Trans-Harbour';
  color: string;
  stations: Station[];
}

// Schedule related types
export interface Schedule {
  id: string;
  train: Train;
  sourceStation: Station;
  destinationStation: Station;
  departureTime: string;
  arrivalTime: string;
  sourcePlatform: string;
  destinationPlatform: string;
  status: 'on-time' | 'delayed' | 'cancelled';
  delayMinutes?: number;
  notes?: string;
  isSpecialService: boolean;
  runningDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
    holidays: boolean;
  };
}

// Route related types
export interface RouteSegment {
  line: Line;
  fromStation: Station;
  toStation: Station;
  departureTime: string;
  arrivalTime: string;
  fromPlatform: string;
  toPlatform: string;
  isLadiesSpecial?: boolean;
}

export interface Route {
  id: string;
  sourceStation: Station;
  destinationStation: Station;
  departureTime: string;
  arrivalTime: string;
  fare: {
    firstClass: number;
    secondClass: number;
    ladies: number;
    senior: number;
    child: number;
  };
  segments: RouteSegment[];
  type: 'Regular' | 'Fast' | 'Special';
  restrictions?: {
    ladiesOnly?: boolean;
    noSundayHoliday?: boolean;
    noSaturdaySundayHoliday?: boolean;
  };
}

// Alert type
export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  affectedLines: Line[];
  type: 'Delay' | 'Cancellation' | 'Platform Change' | 'Service Disruption' | 'Special Service';
  expectedResolution?: string;
  alternateRoutes?: Route[];
}

// User related types
export interface UserPreferences {
  favoriteStations: string[];
  favoriteRoutes: string[];
  darkMode: boolean;
  preferredClass: 'First' | 'Second';
  notifications: {
    delays: boolean;
    platformChanges: boolean;
    serviceDisruptions: boolean;
    specialServices: boolean;
  };
  accessibility: {
    requiresHandicappedAccess: boolean;
    preferLadiesCoach: boolean;
    isSeniorCitizen: boolean;
  };
}
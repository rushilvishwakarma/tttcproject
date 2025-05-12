import { Schedule, Station, Route, Alert, Line } from '@/types';

// Mock Lines
const mockLines: Line[] = [
  {
    id: '1',
    name: 'Red Line',
    color: '#E53935',
    stations: []
  },
  {
    id: '2',
    name: 'Blue Line',
    color: '#1E88E5',
    stations: []
  },
  {
    id: '3',
    name: 'Green Line',
    color: '#43A047',
    stations: []
  },
  {
    id: '4',
    name: 'Yellow Line',
    color: '#FDD835',
    stations: []
  },
  {
    id: '5',
    name: 'Orange Line',
    color: '#FB8C00',
    stations: []
  },
];

// Mock Stations
export const mockStations: Station[] = [
  {
    id: '1',
    name: 'Central Station',
    address: '123 Main St, Downtown',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    lines: [mockLines[0], mockLines[1], mockLines[2]],
    isFavorite: true
  },
  {
    id: '2',
    name: 'West End Terminal',
    address: '456 Market St, West Side',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4294
    },
    lines: [mockLines[0], mockLines[3]],
    isFavorite: false
  },
  {
    id: '3',
    name: 'North Station',
    address: '789 North Blvd, Northside',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4194
    },
    lines: [mockLines[1], mockLines[4]],
    isFavorite: true
  },
  {
    id: '4',
    name: 'East Junction',
    address: '321 East Ave, Eastside',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4094
    },
    lines: [mockLines[2], mockLines[3]],
    isFavorite: false
  },
  {
    id: '5',
    name: 'South Square',
    address: '654 South St, Southside',
    coordinates: {
      latitude: 37.7649,
      longitude: -122.4194
    },
    lines: [mockLines[1], mockLines[4]],
    isFavorite: false
  },
  {
    id: '6',
    name: 'University Station',
    address: '987 Campus Dr, University District',
    coordinates: {
      latitude: 37.7849,
      longitude: -122.4094
    },
    lines: [mockLines[0], mockLines[2]],
    isFavorite: false
  },
  {
    id: '7',
    name: 'Harbor Terminal',
    address: '111 Harbor View, Waterfront',
    coordinates: {
      latitude: 37.7949,
      longitude: -122.3994
    },
    lines: [mockLines[3], mockLines[4]],
    isFavorite: false
  },
  {
    id: '8',
    name: 'Tech District',
    address: '222 Innovation Pkwy, Tech Center',
    coordinates: {
      latitude: 37.7649,
      longitude: -122.4094
    },
    lines: [mockLines[0], mockLines[2]],
    isFavorite: false
  },
];

// Mock Schedules
export const mockSchedules: Schedule[] = [
  {
    id: '1',
    train: {
      id: '1',
      name: 'Express 101',
      type: 'Express',
      capacity: 500
    },
    sourceStation: mockStations[0],
    destinationStation: mockStations[1],
    departureTime: new Date(new Date().setHours(8, 30, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    sourcePlatform: '3A',
    destinationPlatform: '1B',
    status: 'on-time',
    notes: 'High passenger volume expected'
  },
  {
    id: '2',
    train: {
      id: '2',
      name: 'Local 202',
      type: 'Local',
      capacity: 300
    },
    sourceStation: mockStations[0],
    destinationStation: mockStations[2],
    departureTime: new Date(new Date().setHours(8, 45, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
    sourcePlatform: '2C',
    destinationPlatform: '4A',
    status: 'delayed',
    delayMinutes: 10,
    notes: 'Delay due to signal maintenance'
  },
  {
    id: '3',
    train: {
      id: '3',
      name: 'Rapid 303',
      type: 'Rapid',
      capacity: 400
    },
    sourceStation: mockStations[1],
    destinationStation: mockStations[3],
    departureTime: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(9, 45, 0, 0)).toISOString(),
    sourcePlatform: '1A',
    destinationPlatform: '2B',
    status: 'on-time'
  },
  {
    id: '4',
    train: {
      id: '4',
      name: 'Express 104',
      type: 'Express',
      capacity: 500
    },
    sourceStation: mockStations[2],
    destinationStation: mockStations[0],
    departureTime: new Date(new Date().setHours(9, 30, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    sourcePlatform: '2A',
    destinationPlatform: '3B',
    status: 'cancelled',
    notes: 'Cancelled due to track maintenance'
  },
  {
    id: '5',
    train: {
      id: '5',
      name: 'Local 205',
      type: 'Local',
      capacity: 300
    },
    sourceStation: mockStations[3],
    destinationStation: mockStations[4],
    departureTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(10, 45, 0, 0)).toISOString(),
    sourcePlatform: '3C',
    destinationPlatform: '1A',
    status: 'on-time'
  },
  {
    id: '6',
    train: {
      id: '6',
      name: 'Rapid 306',
      type: 'Rapid',
      capacity: 400
    },
    sourceStation: mockStations[4],
    destinationStation: mockStations[5],
    departureTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    sourcePlatform: '2B',
    destinationPlatform: '4C',
    status: 'on-time'
  },
  {
    id: '7',
    train: {
      id: '7',
      name: 'Express 107',
      type: 'Express',
      capacity: 500
    },
    sourceStation: mockStations[5],
    destinationStation: mockStations[6],
    departureTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    sourcePlatform: '1B',
    destinationPlatform: '3A',
    status: 'delayed',
    delayMinutes: 5
  },
  {
    id: '8',
    train: {
      id: '8',
      name: 'Local 208',
      type: 'Local',
      capacity: 300
    },
    sourceStation: mockStations[6],
    destinationStation: mockStations[7],
    departureTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(12, 15, 0, 0)).toISOString(),
    sourcePlatform: '4A',
    destinationPlatform: '2C',
    status: 'on-time'
  },
];

// Mock Routes
export const mockRoutes: Route[] = [
  {
    id: '1',
    sourceStation: mockStations[0],
    destinationStation: mockStations[3],
    departureTime: new Date(new Date().setHours(8, 30, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
    fare: 3.50,
    segments: [
      {
        line: mockLines[0],
        fromStation: mockStations[0],
        toStation: mockStations[1],
        departureTime: new Date(new Date().setHours(8, 30, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(8, 45, 0, 0)).toISOString(),
        fromPlatform: '1A',
        toPlatform: '2B'
      },
      {
        line: mockLines[3],
        fromStation: mockStations[1],
        toStation: mockStations[3],
        departureTime: new Date(new Date().setHours(8, 50, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(9, 15, 0, 0)).toISOString(),
        fromPlatform: '3C',
        toPlatform: '1B'
      }
    ]
  },
  {
    id: '2',
    sourceStation: mockStations[0],
    destinationStation: mockStations[3],
    departureTime: new Date(new Date().setHours(8, 45, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(9, 20, 0, 0)).toISOString(),
    fare: 3.00,
    segments: [
      {
        line: mockLines[2],
        fromStation: mockStations[0],
        toStation: mockStations[3],
        departureTime: new Date(new Date().setHours(8, 45, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(9, 20, 0, 0)).toISOString(),
        fromPlatform: '2A',
        toPlatform: '3B'
      }
    ]
  },
  {
    id: '3',
    sourceStation: mockStations[2],
    destinationStation: mockStations[5],
    departureTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    fare: 4.25,
    segments: [
      {
        line: mockLines[1],
        fromStation: mockStations[2],
        toStation: mockStations[0],
        departureTime: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(9, 25, 0, 0)).toISOString(),
        fromPlatform: '1C',
        toPlatform: '4A'
      },
      {
        line: mockLines[0],
        fromStation: mockStations[0],
        toStation: mockStations[5],
        departureTime: new Date(new Date().setHours(9, 35, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        fromPlatform: '2B',
        toPlatform: '3C'
      }
    ]
  },
  {
    id: '4',
    sourceStation: mockStations[4],
    destinationStation: mockStations[7],
    departureTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    arrivalTime: new Date(new Date().setHours(11, 15, 0, 0)).toISOString(),
    fare: 5.00,
    segments: [
      {
        line: mockLines[4],
        fromStation: mockStations[4],
        toStation: mockStations[3],
        departureTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
        fromPlatform: '3A',
        toPlatform: '1B'
      },
      {
        line: mockLines[2],
        fromStation: mockStations[3],
        toStation: mockStations[0],
        departureTime: new Date(new Date().setHours(10, 40, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(11, 0, 0, 0)).toISOString(),
        fromPlatform: '2C',
        toPlatform: '4A'
      },
      {
        line: mockLines[0],
        fromStation: mockStations[0],
        toStation: mockStations[7],
        departureTime: new Date(new Date().setHours(11, 5, 0, 0)).toISOString(),
        arrivalTime: new Date(new Date().setHours(11, 15, 0, 0)).toISOString(),
        fromPlatform: '1A',
        toPlatform: '3B'
      }
    ]
  }
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Signal Failure',
    description: 'Signal failure at Central Station causing delays of up to 15 minutes on the Red Line.',
    severity: 'medium',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 1)).toISOString(),
    affectedLines: [mockLines[0]]
  },
  {
    id: '2',
    title: 'Service Suspended',
    description: 'Blue Line service suspended between North Station and East Junction due to track maintenance. Shuttle buses are operating.',
    severity: 'high',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
    affectedLines: [mockLines[1]]
  },
  {
    id: '3',
    title: 'Platform Change',
    description: 'All Green Line trains at South Square will depart from Platform 2 instead of Platform 3 until further notice.',
    severity: 'low',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 5)).toISOString(),
    affectedLines: [mockLines[2]]
  },
  {
    id: '4',
    title: 'Reduced Service',
    description: 'Yellow Line trains running at reduced frequency due to staff shortages. Expect longer wait times between trains.',
    severity: 'medium',
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    affectedLines: [mockLines[3]]
  },
  {
    id: '5',
    title: 'Station Closure',
    description: 'Tech District station closed due to flooding. Trains will not stop at this station until further notice.',
    severity: 'high',
    timestamp: new Date(new Date().setHours(new Date().getHours() - 12)).toISOString(),
    affectedLines: [mockLines[0], mockLines[2]]
  }
];
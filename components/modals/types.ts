// types.ts
export interface TruckData {
    license: string;
    make: string;
    model: string;
    year: number;
    tracker: string;
    status: 'Available' | 'InTransit' | 'Maintenance';
    companyId: string;
  }
export interface Speciality {
  specialityId: number;
  name: string;
}

export interface Practitioner {
  practitionerId: number;
  firstName: string;
  lastName: string;
  email: string;
  specialities: number[];
}

export interface ChosenData {
  specialityId: number;
}

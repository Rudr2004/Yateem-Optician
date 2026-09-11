export interface Customer {
  name: string;
  reference: string;
  phone: string;
  email?: string;
}

export interface Frame {
  id: string;
  name: string;
  rimType: string;
  material: string;
  a: number;
  b: number;
  dbl: number;
  colorFrom: string;
  colorTo: string;
}

export type ValidationStatus = "ok" | "review" | "invalid";

export interface MeasurementField {
  key: string;
  label: string;
  shortLabel: string;
  value: string;
  unit: string;
  tolerance: string;
  status: ValidationStatus;
  definition: string;
}

export type LensType = "Single Vision" | "Progressive" | "Anti-Fatigue" | "Computer";

export interface ThicknessInput {
  sphere: string;
  cylinder: string;
  axis: string;
  frameWidth: string;
  frameHeight: string;
  dbl: string;
  index: string;
}

export interface ThicknessResult {
  centerThickness: string;
  edgeThickness: string;
  recommendedIndex: string;
}

export interface TintSelection {
  color: string;
  opacity: number;
}

export interface MeasurementSession {
  id: string;
  customer: Customer | null;
  frame: Frame | null;
  measurements: MeasurementField[];
  lens: LensType | null;
  coatings: string[];
  thicknessInput: ThicknessInput;
  thicknessResult: ThicknessResult | null;
  tint: TintSelection | null;
  status: "draft" | "completed";
  createdAt: string;
}

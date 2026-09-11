import type { Frame, MeasurementField, Customer } from "../types";

export const FRAMES: Frame[] = [
  {
    id: "YT-101",
    name: "YT Classic 101",
    rimType: "Full Rim",
    material: "Metal",
    a: 52,
    b: 40,
    dbl: 18,
    colorFrom: "#1c3a7a",
    colorTo: "#0a1128",
  },
  {
    id: "YT-202",
    name: "YT Premium 202",
    rimType: "Full Rim",
    material: "Acetate",
    a: 54,
    b: 42,
    dbl: 18,
    colorFrom: "#c9a15a",
    colorTo: "#8a6a2f",
  },
  {
    id: "YT-305",
    name: "YT Urban 305",
    rimType: "Semi Rimless",
    material: "Metal",
    a: 53,
    b: 39,
    dbl: 17,
    colorFrom: "#3562e0",
    colorTo: "#142a5c",
  },
  {
    id: "YT-410",
    name: "YT Executive 410",
    rimType: "Full Rim",
    material: "Acetate",
    a: 55,
    b: 43,
    dbl: 19,
    colorFrom: "#3a3f5c",
    colorTo: "#10142b",
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { name: "John Smith", reference: "MF-2026-00124", phone: "+974 5512 3456" },
  { name: "Sarah Wilson", reference: "MF-2026-00123", phone: "+974 5598 7621" },
  { name: "Ahmed Ali", reference: "MF-2026-00122", phone: "+974 5533 9087" },
  { name: "Michael Thomas", reference: "MF-2026-00121", phone: "+974 5567 1122" },
];

export function generateMeasurements(frame: Frame): MeasurementField[] {
  return [
    {
      key: "monocularPdR",
      label: "Monocular PD (Right)",
      shortLabel: "Right PD",
      value: "31.0",
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition:
        "Distance from the center of the pupil to the center of the bridge/facial midline, measured separately per eye.",
    },
    {
      key: "monocularPdL",
      label: "Monocular PD (Left)",
      shortLabel: "Left PD",
      value: "31.5",
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition:
        "Distance from the center of the pupil to the center of the bridge/facial midline, measured separately per eye.",
    },
    {
      key: "nearPdR",
      label: "Near PD (Right)",
      shortLabel: "Near PD R",
      value: "29.5",
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition:
        "Monocular or binocular PD measured at the intended reading distance, convergence-adjusted.",
    },
    {
      key: "nearPdL",
      label: "Near PD (Left)",
      shortLabel: "Near PD L",
      value: "30.0",
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition:
        "Monocular or binocular PD measured at the intended reading distance, convergence-adjusted.",
    },
    {
      key: "fittingHeightR",
      label: "Fitting Height / Seg Height (Right)",
      shortLabel: "Fit Height R",
      value: "18.5",
      unit: "mm",
      tolerance: "±1.0 mm",
      status: "ok",
      definition:
        "Vertical distance from the lowest point of the frame's inner rim to the center of the pupil, with the wearer in natural posture.",
    },
    {
      key: "fittingHeightL",
      label: "Fitting Height / Seg Height (Left)",
      shortLabel: "Fit Height L",
      value: "18.0",
      unit: "mm",
      tolerance: "±1.0 mm",
      status: "review",
      definition:
        "Vertical distance from the lowest point of the frame's inner rim to the center of the pupil, with the wearer in natural posture.",
    },
    {
      key: "pantoscopicTilt",
      label: "Pantoscopic Tilt",
      shortLabel: "Panto Tilt",
      value: "8",
      unit: "°",
      tolerance: "±1–2°",
      status: "ok",
      definition:
        "Angle between the spectacle plane and the vertical facial plane.",
    },
    {
      key: "wrapAngle",
      label: "Wrap Angle / Face Form Angle",
      shortLabel: "Wrap Angle",
      value: "5",
      unit: "°",
      tolerance: "±1–2°",
      status: "ok",
      definition:
        "Horizontal curvature angle of the frame front relative to the wearer's face, measured in the frontal plane.",
    },
    {
      key: "bvd",
      label: "Back Vertex Distance (BVD)",
      shortLabel: "BVD",
      value: "13.5",
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition:
        "Distance from the back surface of the lens to the front surface of the cornea.",
    },
    {
      key: "lensDiameter",
      label: "Lens Diameter",
      shortLabel: "Lens Diam.",
      value: String(frame.a),
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition:
        "Effective/minimum diameter of the lens blank required to glaze the chosen frame.",
    },
    {
      key: "readingDistance",
      label: "Reading Distance",
      shortLabel: "Reading Dist.",
      value: "400",
      unit: "mm",
      tolerance: "±10–20 mm",
      status: "ok",
      definition:
        "Habitual distance from eye to reading material/task, used to compute near-vision PD and add-power needs.",
    },
    {
      key: "frameA",
      label: "Frame A (Lens Width)",
      shortLabel: "Frame A",
      value: String(frame.a),
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition: "Horizontal width of the lens shape at its widest point.",
    },
    {
      key: "frameB",
      label: "Frame B (Lens Height)",
      shortLabel: "Frame B",
      value: String(frame.b),
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition: "Vertical height of the lens shape at its tallest point.",
    },
    {
      key: "frameC",
      label: "Frame C / DBL (Bridge)",
      shortLabel: "DBL",
      value: String(frame.dbl),
      unit: "mm",
      tolerance: "±0.5 mm",
      status: "ok",
      definition: "Distance between the two lens shapes across the bridge.",
    },
  ];
}

export const LENS_OPTIONS: { type: string; description: string }[] = [
  { type: "Single Vision", description: "Designed for one primary viewing distance." },
  { type: "Progressive", description: "Multiple vision zones in one lens." },
  { type: "Anti-Fatigue", description: "Designed for near and intermediate visual tasks." },
  { type: "Computer", description: "Optimized for screen and intermediate distances." },
];

export const COATING_OPTIONS: string[] = [
  "Anti-Reflective",
  "Blue-Light Filtering",
  "Night Driving",
  "Polarized",
  "UV Protection",
  "Scratch Resistant",
];

export const LENS_INDEX_OPTIONS = ["1.50", "1.56", "1.60", "1.67", "1.74"];

export const TINT_COLORS: { name: string; hex: string }[] = [
  { name: "Grey", hex: "#4b5563" },
  { name: "Brown", hex: "#7a4a24" },
  { name: "Green", hex: "#1f6d4a" },
  { name: "Blue", hex: "#2451c9" },
  { name: "Rose", hex: "#c9607e" },
];

export const TINT_OPACITIES = [25, 50, 70, 80];

export interface RecentMeasurement {
  customer: string;
  reference: string;
  frame: string;
  date: string;
  status: "Completed" | "Draft";
}

export const RECENT_MEASUREMENTS: RecentMeasurement[] = [
  { customer: "John Smith", reference: "MF-2026-00124", frame: "YT Classic 101", date: "11 Sep 2026", status: "Completed" },
  { customer: "Sarah Wilson", reference: "MF-2026-00123", frame: "YT Premium 202", date: "10 Sep 2026", status: "Completed" },
  { customer: "Ahmed Ali", reference: "MF-2026-00122", frame: "YT Urban 305", date: "09 Sep 2026", status: "Draft" },
];

export interface PriceItem {
  name: string;
  category: string;
  price: string;
}

export const PRICE_LIST: PriceItem[] = [
  { name: "YT Classic 101", category: "Frames", price: "QAR 480" },
  { name: "YT Premium 202", category: "Frames", price: "QAR 620" },
  { name: "YT Urban 305", category: "Frames", price: "QAR 540" },
  { name: "YT Executive 410", category: "Frames", price: "QAR 690" },
  { name: "Single Vision Lens", category: "Single Vision", price: "QAR 250" },
  { name: "Progressive Lens", category: "Progressive", price: "QAR 950" },
  { name: "Computer Lens", category: "Computer", price: "QAR 420" },
  { name: "Anti-Fatigue Lens", category: "Anti-Fatigue", price: "QAR 520" },
  { name: "Anti-Reflective Coating", category: "Coatings", price: "QAR 120" },
  { name: "Blue-Light Filtering", category: "Coatings", price: "QAR 150" },
  { name: "Night Driving Coating", category: "Coatings", price: "QAR 180" },
  { name: "Polarized Coating", category: "Coatings", price: "QAR 220" },
  { name: "UV Protection", category: "Coatings", price: "QAR 90" },
  { name: "Scratch Resistant", category: "Coatings", price: "QAR 80" },
  { name: "Standard Tint", category: "Tint", price: "QAR 100" },
  { name: "Gradient Tint", category: "Tint", price: "QAR 150" },
  { name: "1.50 Index Material", category: "Lens Materials", price: "QAR 0" },
  { name: "1.60 Index Material", category: "Lens Materials", price: "QAR 180" },
  { name: "1.67 Index Material", category: "Lens Materials", price: "QAR 320" },
  { name: "1.74 Index Material", category: "Lens Materials", price: "QAR 480" },
];

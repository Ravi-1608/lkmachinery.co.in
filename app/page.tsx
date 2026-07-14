import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryBand, { type CategoryBandProps } from "@/components/home/CategoryBand";
import ApplicationsStrip from "@/components/home/ApplicationsStrip";
import CtaBand from "@/components/home/CtaBand";

// ─── Page-specific metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "LK Machinery — Industrial Equipment & Solutions",
  description:
    "LK Machinery India Pvt. Ltd. delivers die casting, injection moulding, CNC machining, and automation solutions trusted by industry leaders across 60+ countries since 1979.",
  openGraph: {
    title: "LK Machinery — Industrial Equipment & Solutions",
    description:
      "Precision industrial equipment — DCM, IMM, CNC, and Automation — engineered to perform.",
    url: "/",
  },
};

// ─── Category band data ───────────────────────────────────────────────────────
// Single source of truth; CategoryBand renders from these props — not duplicated code.
const CATEGORY_BANDS: CategoryBandProps[] = [
  {
    index: "01",
    subtitle: "DCM",
    title: "Die Casting Machines",
    description:
      "From cold-chamber machines for aluminium and magnesium to hot-chamber solutions for zinc, LK's die casting range delivers clamping forces from 280T to 6,000T — with real-time process control and Industry 4.0 connectivity as standard.",
    tags: ["LK Cold Chamber", "LK Hot Chamber", "LK Squeeze Casting", "LK Vacuum Series"],
    spotlightTitle: "LK DCC-6000 Cold Chamber",
    spotlightDescription:
      "6,000 tonne clamping force for large structural automotive parts. Full servo-hydraulic drive, real-time shot monitoring, and automated die lubrication.",
    spotlightBadge: "Up to 6,000T",
    ctaHref: "/products/dcm",
    variant: "dark",
  },
  {
    index: "02",
    subtitle: "IMM",
    title: "Injection Moulding Machines",
    description:
      "LK injection moulding machines span 90T to 3,200T, covering standard thermoplastics, engineering resins, and two-component applications. Built on an all-electric or servo-hydraulic platform for energy savings up to 80%.",
    tags: ["LK All-Electric", "LK Servo-Hydraulic", "LK Two-Platen", "LK Two-Component"],
    spotlightTitle: "LK IME-500 All-Electric",
    spotlightDescription:
      "500-tonne fully electric machine with direct-drive servo axes. Zero hydraulic fluid, class-10,000 cleanroom ready, cycle times 15% faster than comparable servo-hydraulic models.",
    spotlightBadge: "80% energy saving",
    ctaHref: "/products/imm",
    variant: "light",
  },
  {
    index: "03",
    subtitle: "CNC",
    title: "CNC Machining Centres",
    description:
      "Precision 3- to 5-axis machining centres designed for die and mould work, aerospace structures, and high-mix automotive components. Integrated tool management and in-process gauging reduce part-to-part variation below 5µm.",
    tags: ["LK 3-Axis VMC", "LK 5-Axis Universal", "LK Gantry Series", "LK High-Speed"],
    spotlightTitle: "LK VMC-1060 5-Axis",
    spotlightDescription:
      "5-axis simultaneous machining with 18,000 rpm spindle, 40-tool ATC, and integrated probing. Cuts cycle time by 40% versus conventional 3+2 setups.",
    spotlightBadge: "< 5µm accuracy",
    ctaHref: "/products/cnc",
    variant: "dark",
  },
  {
    index: "04",
    subtitle: "Automation",
    title: "Automation & Robotics",
    description:
      "End-of-arm tooling, take-out robots, vision inspection systems, and full turnkey cell integration. LK automation solutions connect seamlessly with our own machines or third-party equipment via open OPC-UA interfaces.",
    tags: ["LK Take-Out Robots", "LK Vision Inspection", "LK Conveyor Systems", "LK Turnkey Cells"],
    spotlightTitle: "LK FlexCell Turnkey System",
    spotlightDescription:
      "Pre-engineered automation cell combining die casting or injection moulding with robotic part extraction, in-line quality control, and MES data integration. Ready to run in 4 weeks.",
    spotlightBadge: "4-week deployment",
    ctaHref: "/products/automation",
    variant: "light",
  },
];

// ─── Homepage ─────────────────────────────────────────────────────────────────
// Pure Server Component — no client-side interactivity on this page.
export default function HomePage() {
  return (
    <>
      <Hero />

      {CATEGORY_BANDS.map((band) => (
        <CategoryBand key={band.index} {...band} />
      ))}

      <ApplicationsStrip />
      <CtaBand />
    </>
  );
}

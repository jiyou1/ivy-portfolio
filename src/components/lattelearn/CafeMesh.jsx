import CaseBlobs from "../icoi/CaseBlobs";

/* Warm café aurora for the LatteLearn page: the caramel/pink palette on
   CaseBlobs' fixed-viewport technique. Replaces the old list of nine blobs
   pixel-anchored down the scroll (top: 5650 etc.), which broke whenever the
   page length changed. */
const CAFE_LAYERS = [
  "radial-gradient(44rem 44rem at 90% -6%, rgba(232,200,143,.42), rgba(255,184,235,.24) 56%, transparent 74%)",
  "radial-gradient(38rem 38rem at -10% 42%, rgba(255,184,235,.34), rgba(232,200,143,.24) 58%, transparent 74%)",
  "radial-gradient(40rem 40rem at 92% 102%, rgba(232,200,143,.36), rgba(255,184,235,.22) 56%, transparent 74%)",
];

export default function CafeMesh() {
  return <CaseBlobs layers={CAFE_LAYERS} />;
}

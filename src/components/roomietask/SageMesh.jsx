import CaseBlobs from "../icoi/CaseBlobs";

/* Olive aurora for the RoomieTask page: the style guide's olive set (#B7BE7A
   leading, #CFC98F khaki, #C7D3A0 soft sage) on CaseBlobs' fixed-viewport
   technique. Painted behind the content so it never affects text contrast. */
const SAGE_LAYERS = [
  "radial-gradient(44rem 44rem at 90% -6%, rgba(183,190,122,.45), rgba(207,201,143,.26) 56%, transparent 72%)",
  "radial-gradient(38rem 38rem at -10% 40%, rgba(183,190,122,.4), rgba(199,211,160,.28) 58%, transparent 74%)",
  "radial-gradient(40rem 40rem at 92% 102%, rgba(207,201,143,.34), rgba(183,190,122,.32) 56%, transparent 72%)",
];

export default function SageMesh() {
  return <CaseBlobs layers={SAGE_LAYERS} />;
}

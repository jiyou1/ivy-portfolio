import BylawTrace from "../icoi/BylawTrace";
import Todo from "./Todo";

/* Constraint pair: a project constraint (mono excerpt) followed by exactly one
   consequence sentence (means-arrow). It reuses the ICOI BylawTrace component,
   the page's signature excerpt + means-arrow pair, in its `mono` variant, so the
   two case studies share one visual and this never forks that component. An
   optional `todo` renders a dev-only slot under the consequence for a story the
   copy still owes. */
export default function ConstraintPair({ constraint, consequence, todo, glass = false }) {
  return (
    <>
      <BylawTrace
        mono
        glass={glass}
        excerpts={[{ cite: "CONSTRAINT", quote: constraint }]}
        means={consequence}
      />
      {todo && <Todo text={todo} className="ml-8" />}
    </>
  );
}

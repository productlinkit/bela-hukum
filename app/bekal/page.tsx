import BekalClient from "./BekalClient";

export default function Bekal({ searchParams }: { searchParams: { a?: string } }) {
  const raw = searchParams?.a;
  const initial = raw !== undefined && raw !== "" && !Number.isNaN(Number(raw)) ? Number(raw) : null;
  return <BekalClient initial={initial} />;
}

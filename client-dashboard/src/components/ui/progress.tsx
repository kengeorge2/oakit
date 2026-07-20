export function Progress({ value }: { value?: number }) {
  return <div className="h-2 bg-gray-800 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${value || 0}%` }} /></div>;
}

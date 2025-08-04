type Props = { title: string; value: number | string; bgColor?: string };

export default function StatsCard({ title, value, bgColor = "bg-blue-100" }: Props) {
  return (
    <div className={`p-5 rounded-lg shadow ${bgColor} min-w-[150px]`}>
        <h3 className="text-sm text-gray-700">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

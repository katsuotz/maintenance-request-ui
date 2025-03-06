import Card from "@/components/base/card";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface MetricsCardProps {
  loading?: boolean;
  value: number;
  label: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  loading = false,
  value,
  label,
}) => {
  return (
    <Card className="col-span-4 w-[120px] flex flex-col justify-center items-center text-center px-3 py-4">
      {loading ? (
        <AiOutlineLoading3Quarters className="text-primary size-8 animate-spin mb-2" />
      ) : (
        <span className="text-[#36A388] text-5xl">{value}</span>
      )}
      <p className="text-xs mt-0.5">{label}</p>
    </Card>
  );
};

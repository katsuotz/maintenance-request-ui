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
    <Card className="col-span-4 lg:w-[120px] lg:h-auto h-[90px] w-[90px] flex flex-col justify-center items-center text-center lg:px-3 lg:py-4">
      {loading ? (
        <AiOutlineLoading3Quarters className="text-primary size-8 animate-spin mb-2" />
      ) : (
        <span className="text-[#36A388] lg:text-5xl text-4xl">{value}</span>
      )}
      <p className="text-[10px] lg:text-xs leading-tight lg:leading-normal lg:mt-0.5">
        {label}
      </p>
    </Card>
  );
};

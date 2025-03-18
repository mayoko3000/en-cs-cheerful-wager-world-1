
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  subValue?: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  subValueClassName?: string;
  onClick?: () => void;
}

const StatCard = ({ 
  icon, 
  label, 
  value,
  subValue,
  className,
  iconClassName,
  labelClassName,
  valueClassName,
  subValueClassName,
  onClick
}: StatCardProps) => {
  return (
    <Card 
      className={cn(
        "bg-black/20 border-none p-2 transition-all duration-300 hover:bg-black/30", 
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-2 text-center text-white">
        <div className={cn("h-4 w-4 mx-auto mb-1", iconClassName)}>
          {icon}
        </div>
        <div className={cn("text-xs font-medium", labelClassName)}>{label}</div>
        <div className={cn("text-xl font-bold", valueClassName)}>{value}</div>
        {subValue && (
          <div className={cn("text-xs mt-1 opacity-80", subValueClassName)}>{subValue}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;

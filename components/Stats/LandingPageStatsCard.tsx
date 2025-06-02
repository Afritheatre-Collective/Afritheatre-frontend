import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconType } from "react-icons";

interface LandingPageStatsCardProps {
  icon: IconType;
  title: string;
  value: number | string;
  iconColor?: string;
  hoverColor?: string;
}

const LandingPageStatsCard: React.FC<LandingPageStatsCardProps> = ({
  icon: Icon,
  title,
  value,
  iconColor = "text-primary",
  hoverColor = "hover:bg-primary/10",
}) => {
  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg ${hoverColor} hover:-translate-y-1 hover:scale-[1.02]`}
    >
      <CardHeader className="items-center">
        <div
          className={`p-4 rounded-full bg-background ${iconColor} group-hover:text-primary/80 transition-colors duration-300`}
        >
          <Icon size={32} />
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <div className="text-3xl font-bold text-[#c14600] group-hover:text-primary transition-colors duration-300">
          {value}+
        </div>
      </CardContent>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-primary/0 group-hover:to-primary/10 transition-all duration-500" />
    </Card>
  );
};

export default LandingPageStatsCard;

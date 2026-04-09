// BudgetCard.tsx
import React from "react";
import { Card } from "@mono/components";

type BudgetCardProps = {
  title: string;
  description: string;
  imgSrc: string;   // assuming imported image path is string
  imgAlt: string;
  borderColor: string;      // Tailwind classes like "border-orange-200"
  hoverBorderColor: string; // Tailwind classes like "border-orange-300"
  bgColor: string;          // Tailwind classes like "bg-orange-100"
};

const BudgetCard: React.FC<BudgetCardProps> = ({
  title,
  description,
  imgSrc,
  imgAlt,
  borderColor,
  hoverBorderColor,
  bgColor,
}) => {
  return (
    <Card
      noHeader
      cardCss={{
        padding: '24px 16px',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        transition: 'border-color 0.2s',
        '&:hover': {
          borderColor: hoverBorderColor
        }
      }}
    >
      <div className="text-center">
        <div
          className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto`}
        >
          <img src={imgSrc} alt={imgAlt} className="object-cover  w-[42px] h-[42px]"  />
        </div>
        <h3 className="font-semibold text-[20px] text-[#2D2D2D] mb-2 mt-2">{title}</h3>
        <p className="font-medium text-[14px] leading-[20px] text-[#5D5D5D]">{description}</p>
      </div>
    </Card>
  );
};

export default BudgetCard;

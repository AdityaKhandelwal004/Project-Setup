// StepCard.tsx
import React from "react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  image: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description, image }) => {
  return (
    <div className="border rounded-xl p-6 hover:shadow-md transition">
      <h4 className="text-[14px] font-bold text-brand-secondary">
        STEP {step}
      </h4>
      <div className="flex">
        <div className="flex-[0.5]">
          <h2 className="text-[24px] font-medium text-brand-accent">{title}</h2>
          <span className="text-gray-blackgray font-semibold text-[14px] mt-1 block">
            {description}
          </span>
        </div>
        <div className="flex justify-end flex-[0.5]">
          <img src={image} className="w-[93px] h-[75px]" alt={title} />
        </div>
      </div>
    </div>
  );
};

export default StepCard;

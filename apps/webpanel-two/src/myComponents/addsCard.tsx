// InfoCard.tsx
import React from "react";
import { Card } from "@mono/components";

type InfoCardProps = {
  imgSrc: string;  
  imgAlt: string;  
  title: string;   
};

const AddsCard: React.FC<InfoCardProps> = ({ imgSrc, imgAlt, title }) => {
  return (
    <Card
      noHeader
      cardCss={{
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <div>
        <img src={imgSrc} alt={imgAlt} className="object-cover w-full rounded-t-lg" />
        <h3 className="font-medium text-[#474747] p-[12px_12px_16px_12px]">{title}</h3>
      </div>
    </Card>
  );
};

export default AddsCard;

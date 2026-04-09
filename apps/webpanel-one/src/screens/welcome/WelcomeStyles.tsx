import React from 'react';
import styled from 'styled-components';
import { brand } from '@mono/theme/style.palette';
import { fontFamilies, fontWeight } from '@mono/theme/style.typography';
import { spacing, respondTo } from '@mono/theme/style.layout';

// Welcome Screen Styled Components using Tailwind CSS with Theme Integration

const FloatingDiv = styled.div`
  position: absolute;
  display: none;

  ${respondTo.lgUp} {
    display: block;
  }
`;

export const FloatingElement = ({
  children,
  className = "",
  animation = "animate-pulse"
}: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
}) => (
  <FloatingDiv className={`${animation} ${className}`}>
    {children}
  </FloatingDiv>
);

export const ResponsiveContainer = ({
  children,
  backgroundColor = brand.commonBackground
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) => (
  <div
    className="flex items-center justify-center min-h-screen relative overflow-hidden"
    style={{ backgroundColor }}
  >
    {children}
  </div>
);

const ContentDiv = styled.div`
  text-align: center;
  position: relative;
  z-index: 10;
  max-width: 1150px;
  margin: 0 auto;
  padding-left: ${spacing[4]};
  padding-right: ${spacing[4]};

  ${respondTo.smUp} {
    padding-left: ${spacing[6]};
    padding-right: ${spacing[6]};
  }

  ${respondTo.lgDown} {
    max-width: 900px;
  }

  ${respondTo.lgUp} {
    max-width: 900px;
  }
`;

export const ContentContainer = ({
  children
}: {
  children: React.ReactNode
}) => (
  <ContentDiv>
    {children}
  </ContentDiv>
);

export const ResponsiveHeading = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => (
  <h1 className="font-semibold text-center mb-6 sm:mb-8 lg:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-wide">
    {children}
  </h1>
);

const SubtitleText = styled.p`
  font-family: ${fontFamilies.primary};
  font-weight: ${fontWeight.regular};
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0%;
  text-align: center;
  color: ${brand.black};
  max-width: 100%;
  opacity: 1;
  margin: 20px auto 40px auto;

  ${respondTo.smUp} {
    font-size: 18px;
    line-height: 24px;
    margin: 20px auto 50px auto;
  }

  ${respondTo.lgUp} {
    font-size: 20px;
    line-height: 26px;
    margin: 20px auto 60px auto;
  }
`;

export const ResponsiveText = ({
  children
}: {
  children: React.ReactNode
}) => (
  <SubtitleText>
    {children}
  </SubtitleText>
);



const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${spacing[6]};

  ${respondTo.smUp} {
    margin-bottom: ${spacing[8]};
  }

  ${respondTo.lgUp} {
    margin-bottom: ${spacing[10]};
  }
`;

const WelcomeImage = styled.img`
  width: 140px;
  height: auto;
  object-fit: contain;

  ${respondTo.smUp} {
    width: 180px;
  }

  ${respondTo.lgUp} {
    width: 220px;
  }
`;

export const ImageContainer = ({
  src,
  alt
}: {
  src: string;
  alt: string
}) => (
  <ImageWrapper>
    <WelcomeImage
      src={src}
      alt={alt}
    />
  </ImageWrapper>
);

const TitleSpan = styled.span<{ color?: string }>`
  color: ${props => props.color || brand.primaryMain};
  font-family: ${fontFamilies.primary};
  font-weight: ${fontWeight.semiBold};
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 0%;
  text-align: center;
  margin: 0;

  ${respondTo.smUp} {
    font-size: 42px;
    line-height: 50px;
  }

  ${respondTo.lgUp} {
    font-size: 55px;
    line-height: 60px;
  }
`;

export const ThemedSpan = ({
  children,
  color
}: {
  children: React.ReactNode;
  color?: string
}) => (
  <TitleSpan color={color}>
    {children}
  </TitleSpan>
);

export const DollarSignIcon = ({ 
  src, 
  size = 32, 
  className = "" 
}: { 
  src: string; 
  size?: number; 
  className?: string 
}) => (
  <img 
    src={src} 
    alt="Dollar sign" 
    width={size} 
    height={size} 
    className={className}
  />
);

// Container for yellow decorative element
export const YellowDecorative = ({ 
  className = "" 
}: { 
  className?: string 
}) => (
  <div className={`w-20 h-28 bg-yellow-300 rounded-lg transform rotate-12 opacity-60 ${className}`} />
);

import React from 'react';
import '../../index.css';
import welcome from '../../assets/welcome.png';
import obiemoneyImg from '../../assets/obiemoney.svg'
import { ChevronRight } from 'lucide-react';
import { Button } from '@mono/components';
import styled from 'styled-components';
import { spacing, respondTo } from '@mono/theme/style.layout';
import dollarSign1 from '../../assets/1-coins.svg';
import dollarSign2 from '../../assets/3-coins.svg';
import dollarSign3 from '../../assets/4-coins.svg';
import dollarSign4 from '../../assets/2-coins.svg';
import dollarSign5 from '../../assets/5-coins.svg';

import {
  FloatingElement,
  ResponsiveContainer,
  ContentContainer,
  ResponsiveText,
  ImageContainer,
  ThemedSpan,
  DollarSignIcon,
  YellowDecorative
} from './WelcomeStyles';

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${spacing[2]};
  width: 100%;
  max-width: 100%;

  ${respondTo.smUp} {
    flex-direction: row;
    gap: ${spacing[1]};
  }

  ${respondTo.smOnly} {
    align-items: center;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const LogoImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const LogoImage = styled.img`
  width: 224px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;

  ${respondTo.smOnly} {
    width: 140px;
  }
`;

export default function Welcome({ onComplete }: { onComplete: () => void }) {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(5deg); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(40px) rotate(-5deg); }
        }

        @keyframes float-from-bottom-to-half {
          0% { transform: translateY(80px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(5deg); }
          100% { transform: translateY(80px) rotate(0deg); }
        }

        @keyframes float-from-bottom-to-half-slow {
          0% { transform: translateY(100px) rotate(0deg); }
          50% { transform: translateY(-60px) rotate(-3deg); }
          100% { transform: translateY(100px) rotate(0deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 6s ease-in-out infinite;
        }

        .animate-float-from-bottom-to-half {
          animation: float-from-bottom-to-half 7s ease-in-out infinite;
        }

        .animate-float-from-bottom-to-half-slow {
          animation: float-from-bottom-to-half-slow 9s ease-in-out infinite;
        }
      `}</style>

      <ResponsiveContainer>

        <FloatingElement
          className="top-40 left-32"
          animation="animate-float"
        >
          <DollarSignIcon src={dollarSign1} size={95} className="text-gray-400" />
        </FloatingElement>

        <FloatingElement
          className="top-1/3 right-20"
          animation="animate-float"
        >
          <DollarSignIcon src={dollarSign2} size={250} className="text-purple-300" />
        </FloatingElement>

        <FloatingElement
          className="top-20 right-28"
          animation="animate-float-reverse"
        >
          <DollarSignIcon src={dollarSign4} size={90} className="text-orange-300" />
        </FloatingElement>

        <FloatingElement
          className="bottom-0 left-1/4"
          animation="animate-float-from-bottom-to-half"
        >
          <DollarSignIcon src={dollarSign3} size={180} className="text-purple-300" />
        </FloatingElement>

        <FloatingElement
          className="bottom-16 right-24"
          animation="animate-float"
        >
          <YellowDecorative />
        </FloatingElement>

        <FloatingElement
          className="bottom-0 right-1/4"
          animation="animate-float-from-bottom-to-half-slow"
        >
          <DollarSignIcon src={dollarSign5} size={250} className="text-orange-400" />
        </FloatingElement>

        <ContentContainer>
          <ImageContainer
            src={welcome}
            alt="Happy family celebrating"
          />

          <LogoWrapper>
            <TitleContainer>
              <h1 style={{ flexShrink: 0 }}>
                <ThemedSpan>Welcome to </ThemedSpan>
              </h1>
            </TitleContainer>
            <LogoImageContainer>
              <LogoImage
                src={obiemoneyImg}
                alt="Obiemoney logo"
              />
            </LogoImageContainer>
          </LogoWrapper>

          <ResponsiveText>
            You’re in the right place and on track to become Rich on Purpose.
            Obie makes money simple, stress-free and judgement-free — no matter where you’re starting from.
            In just a few minutes, we’ll personalise a plan that fits your life and your goals.
            We’ll help you turn everyday choices into real progress, at your pace.
          </ResponsiveText>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Button
              variant="contained"
              size="large"
              label="Let's get you setup"
              onClick={onComplete}
              endIcon={<ChevronRight className="w-5 h-5" />}
              sx={{ width: 'auto !important' }}
            />
          </div>
        </ContentContainer>
      </ResponsiveContainer>
    </>
  );
}
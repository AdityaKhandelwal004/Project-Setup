import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

import { brand, primitiveColors } from '@mono/theme/style.palette';

import financialCollaboration from '../../assets/welcome.png';
import logo from '../../assets/logo.png';
import { achievementStats, empoweringMessages } from '../../constants/messages';
import messages from '../../messages';

import {
  LeftSection,
  Logo,
  WelcomeTitle,
  WelcomeSubtitle,
  StatsContainer,
  StatIconContainer,
  StatNumber,
  StatLabelText,
  FloatingActionButton,
  EmpoweringMessageContainer,
  EmpoweringMessageGradientBar,
  EmpoweringMessageText,
  EmpoweringMessageDecoration,
} from './styles';

interface AuthLeftSectionProps {
  welcomeTitle?: string;
  welcomeSubtitle?: string;
  showExtraFloatingButton?: boolean;
  showSignInFloatingButton?: boolean;
  showEmpoweringMessage?: boolean;
}

export const AuthLeftSection: React.FC<AuthLeftSectionProps> = ({
  welcomeTitle = messages?.header?.welcomeback,
  welcomeSubtitle = messages?.header?.wealthJourney,
  showExtraFloatingButton = false,
  showSignInFloatingButton = false,
  showEmpoweringMessage = false,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    if (!showEmpoweringMessage) return;

    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % empoweringMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [showEmpoweringMessage]);
  return (
    <LeftSection
      as={motion.div}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl w-full space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8">
        {/* Logo and Brand */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex justify-center items-center mb-[25px]">
            <Logo src={logo} alt="Logo" />
          </div>

          <WelcomeTitle
            as={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {welcomeTitle}
            <WelcomeSubtitle>{welcomeSubtitle}</WelcomeSubtitle>
          </WelcomeTitle>
        </motion.div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
        >
          {achievementStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StatsContainer
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                $backgroundColor="rgba(255, 255, 255, 0.8)"
                $borderColor={index == 0 ? '#FFC7B0' : index == 1 ? '#D0BCF8' : '#B2C5C5'}
              >
                <StatIconContainer
                  animate={{ y: [-3, 3, -3] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.8,
                    ease: 'easeInOut',
                  }}
                  $backgroundColor={
                    index === 1 ? primitiveColors.purple100 :
                    index === 2 ? primitiveColors.teal50 :    
                    stat.color + '15'                    
                  }
                >
                  <Icon size={28} color={stat.color} />
                </StatIconContainer>

                <StatNumber $color={stat.color}>{stat.number}</StatNumber>

                <StatLabelText>{stat.label}</StatLabelText>
              </StatsContainer>
            );
          })}
        </motion.div>

        {/* Hero Visual Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-2xl md:rounded-3xl overflow-hidden relative">
            <img
              src={financialCollaboration}
              alt="Financial collaboration illustration"
              className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-contain"
            />
          </div>

          {/* Floating success indicators */}
          <FloatingActionButton
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 shadow-2xl"
            $backgroundColor={brand.accent}
          >
            <TrendingUp size={24} />
          </FloatingActionButton>

          <FloatingActionButton
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 md:-bottom-4 md:-left-4 shadow-2xl"
            $backgroundColor={brand.primaryMain}
          >
            <Sparkles size={24} />
          </FloatingActionButton>

          {/* Conditional extra floating button for ForgotPassword */}
          {showExtraFloatingButton && (
            <FloatingActionButton
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 -right-3 sm:-right-4 md:-right-6 shadow-xl"
              $backgroundColor={brand.primaryLight}
            >
              <Target size={20} />
            </FloatingActionButton>
          )}

          {/* Conditional extra floating button for SignIn */}
          {showSignInFloatingButton && (
            <FloatingActionButton
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 -right-3 sm:-right-4 md:-right-6 shadow-xl"
              $backgroundColor={brand.primaryLight}
            >
              <Target size={20} />
            </FloatingActionButton>
          )}
        </motion.div>

        {/* Conditional Empowering Message */}
        {showEmpoweringMessage && (
          <AnimatePresence mode="wait">
            <EmpoweringMessageContainer
              key={currentMessage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <EmpoweringMessageGradientBar />
              <EmpoweringMessageText>{empoweringMessages[currentMessage]}</EmpoweringMessageText>
              <EmpoweringMessageDecoration
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </EmpoweringMessageContainer>
          </AnimatePresence>
        )}
      </div>
    </LeftSection>
  );
};

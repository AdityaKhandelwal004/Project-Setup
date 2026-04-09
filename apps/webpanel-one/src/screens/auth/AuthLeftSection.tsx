import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

import { brand } from '@mono/theme/style.palette';

import signupLeftSvg from '../../../public/assets/images/leftLogo.png';
import logo from '../../assets/logo.png';
import messages from '../../messages';

import {
  LeftSection,
  Logo,
  WelcomeTitle,
  WelcomeSubtitle,
  FloatingActionButton,
} from './styles';

interface AuthLeftSectionProps {
  welcomeTitle?: string;
  welcomeSubtitle?: string;
  showExtraFloatingButton?: boolean;
  showSignInFloatingButton?: boolean;
  showSignUpFloatingButton?: boolean;
  showEmpoweringMessage?: boolean;
}

export const AuthLeftSection: React.FC<AuthLeftSectionProps> = ({
  welcomeSubtitle = messages?.header?.wealthJourney,
  showExtraFloatingButton = false,
  showSignInFloatingButton = false,
  showSignUpFloatingButton = false,
}) => {
  return (
    <LeftSection
      as={motion.div}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl w-full flex flex-col items-center justify-center space-y-6 md:space-y-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="flex justify-center items-center">
            <Logo src={logo} alt="Obie Money Logo" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <WelcomeTitle
            as={motion.h1}
            style={{ marginBottom: 0 }}
          >
            {welcomeSubtitle}
          </WelcomeTitle>
        </motion.div>

        {/* Hero Visual Section with SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative w-full"
        >
          <div className=" max-w-sm  mx-auto relative">
            <img
              src={signupLeftSvg}
              alt="Master your money illustration"
              className="w-full h-auto object-contain"
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

          {/* Conditional extra floating button for SignUp */}
          {showSignUpFloatingButton && (
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

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <WelcomeSubtitle style={{ fontSize: '24px', fontWeight: 600, color: '#100937', fontFamily: 'Nohemi'}}>
            You're taking control of your financial future!
          </WelcomeSubtitle>
        </motion.div>
      </div>
    </LeftSection>
  );
};

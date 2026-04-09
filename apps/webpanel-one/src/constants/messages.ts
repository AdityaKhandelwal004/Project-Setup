export const empoweringMessages = [
  "You're taking control of your financial future!",
  'Every millionaire started with their first dollar',
  'Your future self is already thanking you!',
  'Financial freedom is your birthright',
  "You're building something incredible!",
  'This is your moment to shine financially!',
  'Small steps today, giant leaps tomorrow!',
];

import {
  Users,
  TrendingUp,
  Target,
} from 'lucide-react';
import { primitiveColors } from '@mono/theme/style.palette';
import { brand } from '@mono/theme/style.palette';
import messages from '../messages';



export const achievementStats = [
 
  {
    number: '$2.5B+',
    label: messages?.header?.wealthCreated,
    icon: TrendingUp,
    color: brand.accent,
  },
  {
    number: '9',
    label: messages?.header?.simpleSteps,
    icon: Target,
    color: primitiveColors.purple500,
  },
   {
    number: '50K+',
    label: messages?.header?.userBuilding,
    icon: Users,
    color: primitiveColors.teal500,
  },
];

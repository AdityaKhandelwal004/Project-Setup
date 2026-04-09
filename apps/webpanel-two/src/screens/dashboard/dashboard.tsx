import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '../../myComponents';
import messages from '../../messages';
import { Avatar, Header, StyledCardContainer, StyledCardContent, StyledEmailCoulmn, StyledHeadingText, StyledNamecolumn, StyledRowContent, StyledValue } from './styles';
import { Divider, Grid2, Typography, CircularProgress } from '@mui/material';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import { Chip } from '@mono/components';
import { fontWeight } from '@mono/theme';
import { ProfileInfo } from '../profile/styles';
import { ChipSize } from '@mono/components/src/customChip/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { chipStylesByStatus } from '../../models/genericEntities';
import Table from '@mono/components/src/table';
import { usePagination } from '@mono/hooks';
import { apiCall } from '../../redux/actions';
import { GET_ANALYTICS_SUMMARY, GET_RECENT_ACTIVITIES } from '../../api';
import { HttpMethods, formatDateTime } from '@mono/utils';
import { RECENT_ACTIVITIES_LISTING } from '../../redux/actions';

const iconStyle = {
  height: '28px',
  width: '28px'
}


interface AnalyticsData {
  totalUsers: number;
  activeSubscriptions: number;
  trialUsers: number;
  revenueCents: number;
}

const formatCurrency = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

const formatActivityType = (activityType: string): string => {
  switch (activityType) {
    case 'NEW_SIGNUP':
      return 'New signup';
    case 'STEP_COMPLETED':
      return 'Step completed';
    case 'PAYMENT_SUCCESS':
      return 'Payment success';
    case 'PAYMENT_FAILED':
      return 'Payment failed';
    default:
      return activityType.replace(/_/g, ' ').toLowerCase();
  }
};

const getActivityStatus = (activityType: string): string => {
  switch (activityType) {
    case 'NEW_SIGNUP':
    case 'STEP_COMPLETED':
      return 'default';
    case 'PAYMENT_SUCCESS':
      return 'profit';
    case 'PAYMENT_FAILED':
      return 'loss';
    default:
      return 'margin';
  }
};


const getDashboardCards = (data: AnalyticsData | null) => [
  {
    label: 'Total user',
    value: (data && typeof data.totalUsers === 'number') ? data.totalUsers.toString() : '0',
    icon: <PeopleOutlineOutlinedIcon sx={iconStyle} />,
    status: 'profit'
  },
  {
    label: 'Active subscriptions',
    value: (data && typeof data.activeSubscriptions === 'number') ? data.activeSubscriptions.toString() : '0',
    icon: <CreditCardIcon sx={iconStyle} />,
    status: 'margin'
  },
  {
    label: 'Trial users',
    value: (data && typeof data.trialUsers === 'number') ? data.trialUsers.toString() : '0',
    icon: <WatchLaterOutlinedIcon sx={iconStyle} />,
    status: 'loss'
  },
  {
    label: 'Revenue',
    value: (data && typeof data.revenueCents === 'number') ? formatCurrency(data.revenueCents) : '$0.00',
    icon: <PaidOutlinedIcon sx={iconStyle} />,
    status: 'margin'
  },
]

const paginatedRecentActivities: any = {
  key: "recentActivitiesList",
  name: RECENT_ACTIVITIES_LISTING,
  api: GET_RECENT_ACTIVITIES,
};


const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const dispatch = useDispatch() as any;
  const {
    entity,
    updateFilters,
    applyFilters,
    fetchPage,
    updateLimit,
  } = usePagination<any>(paginatedRecentActivities);

  useEffect(() => {
    const fetchAnalyticsData = () => {
      dispatch(
        apiCall(
          GET_ANALYTICS_SUMMARY,
          (data: AnalyticsData) => {
            setAnalyticsData(data);
          },
          (error: any) => {
            setAnalyticsData(null);
          },
          HttpMethods.GET
        )
      );
    };

    fetchAnalyticsData();
  }, [dispatch]);

  const dashboardCards = getDashboardCards(analyticsData);
  return (
    <Container hideSidebar={false} heading={messages?.dashboard?.heading} noPadding>
      <StyledRowContent>
        <Header>{messages?.dashboard?.heading}</Header>
      </StyledRowContent>
      <StyledCardContainer>
        {dashboardCards?.map((item, index) => {
          const chipStyle = chipStylesByStatus[item.status as keyof typeof chipStylesByStatus] || chipStylesByStatus.margin;
          return (
            <StyledCardContent key={index}>
              <StyledRowContent>
                <StyledHeadingText>{item.label}</StyledHeadingText>
                {item.icon}
              </StyledRowContent>
              <StyledValue>{item.value}</StyledValue>
            </StyledCardContent>
          );
        })}
      </StyledCardContainer>
      <Divider />
      <Table
        data={entity?.records || []}
        metadata={entity?.metadata}
        fetchPage={fetchPage}
        updateLimit={updateLimit}
        updateFilters={(filterParams: any) => {
          updateFilters(filterParams);
          applyFilters();
        }}
        emptyMessage={messages?.general?.emptyMessage}
        // tableStyle={{height: 'calc(100vh - 300px'}}
        actionLabel=" "
        specs={[
          {
            id: "user",
            label: "User",
            getValue: (row: any) => row,
            format: (row: any) => {
              return (
                <ProfileInfo>
                  <Avatar
                    src={row?.profilePicturePath || require("../../assets/profile.png")}
                    alt={`${row?.firstName} ${row?.lastName}`}
                  />

                  <Grid2 container display="flex" flexDirection="column">
                    <StyledNamecolumn>
                      {`${row?.firstName || ''} ${row?.lastName || ''}`.trim()}
                    </StyledNamecolumn>
                    <StyledEmailCoulmn>{row?.email}</StyledEmailCoulmn>
                  </Grid2>
                </ProfileInfo>
              );
            },
          },
          {
            id: "activity",
            label: "Activity",
            getValue: (row: any) => row,
            format: (row: any) => {
              const activityStatus = getActivityStatus(row?.activityType);
              const chipStyle = chipStylesByStatus[activityStatus as keyof typeof chipStylesByStatus] || chipStylesByStatus.margin;
              return (
                <Grid2 display={"flex"} columnGap={"8px"}>
                  <Chip
                    text={formatActivityType(row?.activityType)}
                    bgColor={chipStyle.bgColor}
                    textColor={chipStyle.textColor}
                    radius="4px"
                    chipSize={ChipSize.Large}
                    customWeight={fontWeight.semiBold}
                  />
                </Grid2>
              );
            },
          },
          {
            id: "date",
            label: "Date",
            getValue: (row: any) => row?.activityOn,
            format: (value: any) => {
              return formatDateTime(value);
            },
          }
        ]}
      />
    </Container>
  );
}

export default Dashboard;

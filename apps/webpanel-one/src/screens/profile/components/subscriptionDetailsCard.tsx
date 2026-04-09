import { fontSize, fontWeight } from "@mono/theme";
import {
  StyledSubscriptionContainer,
  StyledSubscriptionHeading,
  StyledSubscriptionSubHeading,
  SubscriptionChip,
} from "../styles";
import messages from "../../../messages";
import type { ReduxState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { formatAmountToDisplay } from "../../../myUtils/commonFunctions";

const SubscriptionDetailsCard = () => {
  const subscriptionPlans = useSelector(
    (state: ReduxState) => state.subscriptionPlans,
  );
  const defaultPlan = subscriptionPlans?.plans[0];
  
  return (
    <StyledSubscriptionContainer>
      <StyledSubscriptionHeading>
        {messages?.profile?.subscriptionHeading}{" "}
      </StyledSubscriptionHeading>
      <StyledSubscriptionSubHeading>
        {messages?.profile?.subscriptionSubHeading}{" "}
      </StyledSubscriptionSubHeading>
      <SubscriptionChip>
        {formatAmountToDisplay(defaultPlan?.amount, true)}
        <span
          style={{ fontSize: fontSize.b1, fontWeight: fontWeight.semiBold }}
        >
          /{defaultPlan?.billingFrequency?.toLocaleLowerCase()}
        </span>
      </SubscriptionChip>
    </StyledSubscriptionContainer>
  );
};

export default SubscriptionDetailsCard;

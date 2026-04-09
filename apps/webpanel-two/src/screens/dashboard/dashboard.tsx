import { Container } from '../../myComponents';
import messages from '../../messages';
import {  Header, StyledRowContent } from './styles';


const Dashboard = () => {

  return (
    <Container hideSidebar={false} heading={messages?.dashboard?.heading} noPadding>
      <StyledRowContent>
        <Header>{messages?.dashboard?.heading}</Header>
      </StyledRowContent>
    </Container>
  );
}

export default Dashboard;

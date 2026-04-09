import { Container } from "../../components";
import messages from "../../messages";

const Dashboard = () => {

    return (
        <Container
            heading={messages?.dashboard?.heading}
        >
            <p>Dashboard</p>
        </Container>
    )
}

export default Dashboard;
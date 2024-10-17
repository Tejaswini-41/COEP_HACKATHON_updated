import react from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Hello im in dashboard</h1>
        </div>
    )
}

export default Dashboard;
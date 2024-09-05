import Countdown from "react-countdown";

const AdminProfile = () => {
    return (
        <div>
            <Countdown date={Date.now() + 5000} />
            <div>
              <div>
                <img src="./user_profile" alt="User Profile" />
              </div>
              <div>
                <h2>Monishat Baishnab</h2>
              </div>
            </div>
        </div>
    );
};

export default AdminProfile;

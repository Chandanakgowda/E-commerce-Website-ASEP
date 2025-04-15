import { assets } from "@/assets/assets";
import Title from "@/components/Title";
import { ShopContext } from "@/context/ShopContext";
import { useContext, useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        const data = await response.json();

        if (data.success) {
          setUser(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <div className="text-2xl mb-4">
        <Title text1={"PROFILE"} text2={"DETAILS"} />
      </div>
      {user ? (
        <div className="max-w-[500px] mx-auto p-6 bg-white rounded-[10px] shadow-md mb-10 relative mt-16">
          <div className="w-[65px] h-[65px] bg-green-200 rounded-full absolute left-[40%] bottom-[110px]">
            <img
              src={assets.profile}
              alt="profile"
              className="w-[62px] cursor-pointer"
            />
          </div>
          <div className="profile-item mb-4 flex gap-4 items-start">
            <strong className="text-gray-700">Name:</strong>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div className="profile-item mb-4 flex gap-4 items-start">
            <strong className="text-gray-700">Email:</strong>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default Profile;

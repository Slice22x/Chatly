import Friend from "@/app/(components)/Friend";
import { useAuth, useUser } from "@clerk/nextjs";
import { useGetUsersQuery } from "@/state/api";
import Loader from "@/app/(components)/Loader";

const FriendsBar = () => {
  const { user } = useUser();
  const { data: thisUser, isLoading } = useGetUsersQuery(user!.username!);

  return (
    <div
      className={`flex ml-4 pr-4 h-full bg-black rounded-2xl p-2 items-start justify-start ${isLoading && "items-center justify-center"} flex-col w-full md:w-auto my-4`}
    >
      {isLoading ? (
        <Loader scale={50} />
      ) : (
        thisUser![0].friends.map((friend) => (
          <Friend
            username={friend.username}
            name={friend.name}
            clerkId={friend.clerkId}
          />
        ))
      )}
    </div>
  );
};

export default FriendsBar;

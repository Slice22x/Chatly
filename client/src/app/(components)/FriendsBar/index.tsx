import Friend from "@/app/(components)/Friend";

const FriendsBar = () => {
  return (
    <div
      className={
        "flex ml-4 pr-4 h-full items-start justify-start flex-col w-full md:w-auto my-4"
      }
    >
      <Friend username={"zubair.m7"} name={"Zubair"} />
      <Friend username={"s.bishr10"} name={"Bishr"} />
      <Friend username={"zarmina_06"} name={"Zarmina"} />
      <Friend username={"nxmeer._"} name={"Nameer"} />
      <Friend username={"suls_49x"} name={"Suleman"} />
    </div>
  );
};

export default FriendsBar;

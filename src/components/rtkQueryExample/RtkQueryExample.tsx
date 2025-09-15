import React from "react";
import Loading from "src/components/atoms/Loading/loading";
import { userApi } from "src/store/api/userApi";

const RtkQueryExample = () => {
  const { data, isLoading } = userApi.useGetUsersQuery();

  if (isLoading) return <Loading />;

  return (
    <div>
      {data?.map((user) => {
        return (
          <div key={user.id}>
            <div>User: {user.name} </div>
            <div>Company: {user.company.name} </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default RtkQueryExample;

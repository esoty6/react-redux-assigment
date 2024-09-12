import { usersApi } from 'api/users.service';
import UsersTable from 'components/users-table/users-table.component';
import { useEffect } from 'react';

export default function App() {
  const [trigger, result] = usersApi.useLazyGetAllUsersQuery();

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
    }
    if (!result.isFetching) {
      trigger();
    }
  }, [result.isSuccess]);

  return (
    <div>
      <UsersTable tableData={result.data} />
    </div>
  );
}

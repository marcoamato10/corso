import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"


const Show = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/users/" + id)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <h3>Requested topic ID: {id}</h3>
      <pre>
        {JSON.stringify(user,null,2)}
      </pre>
    </>
  )
// commento da cancellare
}

const List = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <h3>Users list</h3>
      <table>
        {users.map(({ name, id }) => (
          <tr key={id} >
            <td>{name}</td>
            <td><Link to={'users/' + id}>Show</Link></td>
          </tr>
        ))}
      </table>
    </>
  );
}


export default () => {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Show />
      </Route>
      <Route path={match.path}>
        <List resource="users" />
      </Route>
    </Switch>
  )
}
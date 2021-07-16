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
    const [todo, setTodos] = React.useState([]);
    const [user, setUser] = React.useState({});
    

    React.useEffect(() => {
        fetch("http://localhost:3000/todos/" + id)
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
                return fetch("http://localhost:3000/users/"+ data.userId )
            })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }, []);
    return (
        <>
            <h3>Shown Todo ID: {id}</h3>
            <pre>
                {JSON.stringify(todo, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(user, null,2)}
            </pre>
        </>
    )
}

const List = () => {
    const [todos, setTodos] = React.useState([]);
    const [page, setPage]= React.useState(1);

    React.useEffect(() => {
        fetch("http://localhost:3000/todos?_page="+page)
            .then((response) => response.json())
            .then((data) => {
                setTodos(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [page]);

    return (
        <>
            <h3>Todos list</h3>
            <table>
                {todos.map(({ userId, title, id }) => (
                    <tr key={id}>
                        <td>{userId}</td>
                        <td>{title}</td>
                        <td><Link to={'todos/' + id}>Show</Link></td>
                    </tr>
                ))}
            </table>
            <button onClick={()=>setPage(page-1)}>{'<'}</button> 
            {page}
            <button onClick={()=>setPage(page+1)}>{'>'}</button>
        </>
    )
}


export default () => {
    let match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/:id`}>
                <Show />
            </Route>
            <Route path={match.path}>
                <List resource="todos" />
            </Route>
        </Switch>
    )
}
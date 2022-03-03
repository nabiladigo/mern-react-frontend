import { useEffect, useState } from "react"
import { Route, Switch } from "react-router-dom"
import People from "../pages/People"
import Show from "../pages/Show"

function Main(props) {
    const [people, setPeople] = useState(null)

    const URL = "http://localhost:4000/people/"

    const getPeople = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setPeople(data)
    }

    const createPeople = async person => {
        // make post request to create people
        await fetch(URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        })
        // update list of people
        getPeople()
    }

    const updatePeople = async (person, id) => {
        // make put request to create people
        await fetch(URL + id, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        })
        // update list of people
        getPeople()
    }

    const deletePeople = async id => {
        // make delete request to create people
        await fetch(URL + id, {
            method: "delete",
            })
        // update list of people
        getPeople()
    }

    useEffect(() => getPeople(), [])

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <People people={people} createPeople={createPeople} />
                </Route>
                <Route
                    path="/people/:id"
                    render={rp => (
                        <Show
                            people={people}
                            updatePeople={updatePeople}
                            deletePeople={deletePeople}
                            {...rp}
                        />
                    )}
                />
            </Switch>
        </main>
    )
}

export default Main
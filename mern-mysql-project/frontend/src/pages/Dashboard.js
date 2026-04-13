import { useState, useEffect } from "react";
import API from "../api/api";

function Dashboard() {

    const [items, setItems] = useState([]);

    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        pending: 0,
        completed: 0
    });

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "active"
    });

    const [editId, setEditId] = useState(null);

    const [search, setSearch] = useState("");

    const [dark, setDark] = useState(false);



    // FETCH ITEMS
    const fetchItems = async() => {

        const res = await API.get("/items");

        setItems(res.data);

    };


    // FETCH STATS
    const fetchStats = async() => {

        const res = await API.get("/items/stats/all");

        setStats(res.data);

    };


    useEffect(() => {

        fetchItems();

        fetchStats();

    }, []);



    // ADD or UPDATE
    const saveItem = async() => {

        if (!form.title) {

            alert("Enter title");

            return;

        }

        if (editId) {

            await API.put(`/items/${editId}`, form);

            setEditId(null);

        } else {

            await API.post("/items", form);

        }

        setForm({

            title: "",

            description: "",

            status: "active"

        });

        fetchItems();

        fetchStats();

    };



    // DELETE
    const deleteItem = async(id) => {

        if (!window.confirm("Delete item?")) return;

        await API.delete(`/items/${id}`);

        fetchItems();

        fetchStats();

    };



    // EDIT
    const editItem = (item) => {

        setForm({

            title: item.title,

            description: item.description,

            status: item.status

        });

        setEditId(item.id);

    };



    // LOGOUT
    const logout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };



    // EXPORT CSV
    const exportCSV = () => {

        let csv = "Title,Description,Status\n";

        items.forEach(item => {

            csv += `${item.title},${item.description},${item.status}\n`;

        });

        const blob = new Blob([csv]);

        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "items.csv";

        a.click();

    };



    return (

        <
        div style = {
            {
                background: dark ? "#121212" : "#f5f5f5",
                color: dark ? "white" : "black",
                minHeight: "100vh",
                padding: "20px"
            }
        } >

        <
        h2 > Dashboard < /h2>


        <
        button onClick = { logout } >
        Logout <
        /button>


        <
        button onClick = {
            () => setDark(!dark) } >
        Dark Mode <
        /button>


        <
        button onClick = { exportCSV } >
        Export CSV <
        /button>


        <
        hr / >


        <
        h3 > Statistics < /h3>

        <
        p > Total: { stats.total } < /p>

        <
        p > Active: { stats.active } < /p>

        <
        p > Pending: { stats.pending } < /p>

        <
        p > Completed: { stats.completed } < /p>


        <
        hr / >


        <
        h3 > { editId ? "Update Item" : "Add Item" } < /h3>


        <
        input

        placeholder = "Title"

        value = { form.title }

        onChange = {
            (e) =>
            setForm({...form, title: e.target.value })
        }

        />


        <
        br / > < br / >


        <
        input

        placeholder = "Description"

        value = { form.description }

        onChange = {
            (e) =>
            setForm({...form, description: e.target.value })
        }

        />


        <
        br / > < br / >


        <
        select

        value = { form.status }

        onChange = {
            (e) =>
            setForm({...form, status: e.target.value })
        }

        >

        <
        option value = "active" > Active < /option>

        <
        option value = "pending" > Pending < /option>

        <
        option value = "completed" > Completed < /option>

        <
        /select>


        <
        br / > < br / >


        <
        button onClick = { saveItem } >

        { editId ? "Update Item" : "Add Item" }

        <
        /button>


        <
        hr / >


        <
        h3 > Search < /h3>


        <
        input

        placeholder = "Search by title..."

        onChange = {
            (e) => setSearch(e.target.value) }

        />


        <
        hr / >


        <
        h3 > Your Items < /h3>


        {

            items

                .filter(item =>
                item.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )

            .map(item => (

                <
                div key = { item.id } >

                <
                h4 > { item.title } < /h4>

                <
                p > { item.description } < /p>

                <
                p > Status: { item.status } < /p>


                <
                button onClick = {
                    () => editItem(item) } >

                Edit

                <
                /button>


                <
                button onClick = {
                    () => deleteItem(item.id) } >

                Delete

                <
                /button>


                <
                hr / >

                <
                /div>

            ))

        }


        <
        /div>

    );

}

export default Dashboard;
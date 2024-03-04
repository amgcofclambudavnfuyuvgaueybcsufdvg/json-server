console.clear();

const API = `http://localhost:9000`

const GetData = async (path = "") => {
    path = API + path
    return await fetch(path).then(res => res.json())
}

const PostData = async (path = "", data) => {
    path = API + path
    return await fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
}

const PatchData = async (path = "", data) => {
    path = API + path
    return await fetch(path, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

const DeleteData = async (path = "") => {
    path = API + path
    return await fetch(path, {
        method: "DELETE"
    })
        .then(res => res.json())
}

const RenderData = () => {
    const container = document.querySelector("#table-body")

    GetData("/students").then(data => {
        container.innerHTML = ""

        data?.forEach((student, index) => {
            const { name, pasport } = student
            const { seria, number } = pasport
            index += 1

            container.insertAdjacentHTML("beforeend", `
                <tr>
                    <th scope="row"> ${index} </th>
                    <td>${name}</td>
                    <td>${seria}</td>
                    <td>${number}</td>
                    <td>
                        <button class="btn btn-danger">Delete</button>
                    </td>
                    <td>
                        <button class="btn btn-warning">Patch</button>
                    </td>
                </tr>
            `)
        });
    })
}

RenderData()

const PostRender = () => {
    const student = {
        age: 0,
        name: undefined,
        pasport: {
            seria: null,
            number: null
        }
    }

    const name = document.querySelector("#username")
    const addBtn = document.querySelector("button")

    name.addEventListener("input", () => {
        student.name = name.value !== "" ? name.value : undefined
    })

    addBtn.addEventListener("click", () => {
        PostData("/students", student).then(() => {
            // alert("POST: ok")
            name.value = ""
            name.classList.remove("border", "berder-danger")
        }).catch(e => {
            console.error(e)
            name.classList.add("border", "berder-danger")
        }).finally(() => {
            console.warn(`Брат поправь`)
        })
    })

}

PostRender()
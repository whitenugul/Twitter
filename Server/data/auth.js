// 'abcd1234'
let users = [
    {
        id: '1',
        username: 'melon',
        password: '$2b$10$21ogSwItePsd8qVpxYa.s.kV5PaOQFGuEWy2yPjWd4wd2U4aJoP8S',
        name: '이메론',
        email: "melon@melon.com",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU"
    }
];

export async function findByUsername(username) {
    return users.find((user) => user.username === username);
}

export async function createUser(user){
    const created = { ...user, id: Date.now().toString() }
    users.push(created);
    return created.id;
}

export async function findById(id){
    return users.find((user)=>user.id===id) // {user.id===id}로 하면 id가 검색이 안된다 => undefined로 들어가짐
}
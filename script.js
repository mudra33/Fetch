async function getUsers() {
	let users;
	try {
		const data = await fetch(
			'https://61ab3700264ec200176d4017.mockapi.io/users',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		users = await data.json();
		console.log(users);
	} catch (err) {
		console.log(err);
	}
	return users;
}

async function displayUser() {
	let users = await getUsers();
	//   console.log(users);
	const userList = document.querySelector('.user-list');
	userList.innerHTML = '';
	users.forEach((user) => {
		// console.log(user.avatar);

		//Load the data from the API
		userList.innerHTML += `<div class="user-container">
    <img class="user-avatar" src="${user.avatar}"/>
    <div>
    <h2 class="user-name">${user.name}</h2>
    <button onclick="deleteUser(${user.id})">Delete</button>
    <button onclick="editUser(${user.id})">Edit</button>

    </div>
    </div>`;
	});
}
displayUser();

async function deleteUser(id) {
	try {
		const data = await fetch(
			`https://61ab3700264ec200176d4017.mockapi.io/users/${id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		const user = await data.json();
		console.log(user);
		displayUser();
	} catch (err) {
		console.log(err);
	}
}

async function addUser() {
	const userName = document.querySelector('.add-user-name').value;
	const userAvatar = document.querySelector('.add-user-avatar').value;

	//   console.log(userName, userAvatar);
	//   1.method=>Post
	//   2.stringify the data
	//   .Specify the header=>JSOn

	const data = await fetch(
		'https://61ab3700264ec200176d4017.mockapi.io/users',
		{
			method: 'POST',
			body: JSON.stringify({
				name: userName,
				avatar: userAvatar,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	displayUser();
}

addUser();

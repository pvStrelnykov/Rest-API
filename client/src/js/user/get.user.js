import { userId, token } from '../files/global.js'

// get user
async function getUser(){
	const username = document.getElementById('username')
	const password = document.getElementById('password')
	try {
		const res = await fetch(`http://localhost:5375/api/user/${userId}`, { 
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		if(res.ok){
			const userData = await res.json()
			if(username && password){
				username.textContent = userData.username
    		password.textContent = userData.password
			}
		}
	} catch (e) {
		console.log({ message: e.message })
	}
}

getUser()
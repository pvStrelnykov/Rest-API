import { user, userId, token } from '../files/global.js'

// delete user
async function deleteUser(){
	try {
		const res = await fetch(`http://localhost:5375/api/user/delete/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		})
		if(res.ok){
			localStorage.removeItem('user')
			localStorage.removeItem('token')

			window.location.href = '/register.html'
		}
	} catch (e) {
		console.log(e.message)
	}
}

const deleteButton = document.querySelector('.button-delete')
if(deleteButton){
	deleteButton.addEventListener('click', deleteUser)
}
import { user, userId, token } from '../files/global.js'

// update user data
const editForm = document.querySelector('#editForm')
if(editForm){
	editForm.addEventListener('submit', async function(){
		event.preventDefault()

		const loading = document.querySelector('#loading')
		loading.style.display = 'flex'

		const formData = new FormData(editForm);
		const formDataObject = {};
		formData.forEach((value, key) => {
				formDataObject[key] = value;
		})
			
		try {
			const res = await fetch(`http://localhost:5375/api/user/edit/${userId}`, { 
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(formDataObject)
			})
			if(res.ok){
				setTimeout(() => {
					loading.style.display = 'none';
					window.location.href = '/profile.html';
				}, 2000);
			}
		} catch (e) {
			console.log({ message: e.message })
		}
	})
}
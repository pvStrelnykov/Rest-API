import { token } from '../files/global.js'

async function editAuction(id, formData){
	try {
		const res = await fetch(`http://localhost:5375/api/auctions/edit/${id}`, {
			method: 'put',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		})

		if (res.ok) {
			window.location.href = '/'
		} else {
			const error = await res.json()
			alert(`Error: ${error.error}`)
		}
	} catch (e) {
		console.log(e)
	}
}

if (document.getElementById('edit-auction')) {
	document.getElementById('edit-auction').addEventListener('submit', async event => {
			event.preventDefault()

			const form = event.target
			const formData = new FormData(form)

			const urlParams = new URLSearchParams(window.location.search)
			const id = urlParams.get('id')

			await editAuction(id, formData)

		})
}
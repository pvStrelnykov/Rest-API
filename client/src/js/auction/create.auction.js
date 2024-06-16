import { token } from '../files/global.js'
import { formValidate } from '../files/form.js'

async function addAuction(formData) {
	try {
		const res = await fetch('http://localhost:5375/api/auctions/create', {
			method: 'POST',
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

const form = document.getElementById('addAuctionForm')
if (form) {
	form.addEventListener('submit', async event => {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0
		if (error === 0) {
			event.preventDefault()

			const form = event.target
			const formData = new FormData(form)

			await addAuction(formData)
		}
	})
}

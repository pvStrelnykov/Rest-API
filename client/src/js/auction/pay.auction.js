async function payment(id, form) {}
const form = document.querySelector('#payForm')
if (form) {
	form.addEventListener('submit', async e => {
		e.preventDefault()

		const loading = document.querySelector('#loading')
		loading.style.display = 'flex'

		const urlParams = new URLSearchParams(window.location.search)
		const id = urlParams.get('id')

		try {
			const formData = new FormData(form)
			const jsonData = {}
			formData.forEach((value, key) => {
				jsonData[key] = value
			})
			const res = await fetch(`http://localhost:5375/api/payment/${id}`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jsonData),
			})

			if (res.ok) {
				setTimeout(() => {
					loading.style.display = 'none'
					alert('Successfully')
					window.location.href = '/'
				}, 1500)
			} else {
				alert('Error')
			}
		} catch (e) {
			console.log(e)
		}
	})
}

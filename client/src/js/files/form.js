// validation form
export let formValidate = {
	getErrors(form) {
		let error = 0
		let formRequiredItems = form.querySelectorAll('*[data-required]')
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if ( (formRequiredItem.offsetParent !== null || formRequiredItem.tagName === 'SELECT') && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem)
				}
			})
		}
		return error
	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		}
		return error;
	},
	addError(formRequiredItem) {
		formRequiredItem.classList.add('_form-error')
		formRequiredItem.parentElement.classList.add('_form-error')
		let inputError =
			formRequiredItem.parentElement.querySelector('.form__error')
		if (inputError) formRequiredItem.parentElement.removeChild(inputError)
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML(
				'beforeend',
				`<div class="form__error">${formRequiredItem.dataset.error}</div>`
			)
		}
	},
	removeError(formRequiredItem) {
		formRequiredItem.classList.remove('_form-error')
		formRequiredItem.parentElement.classList.remove('_form-error')
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(
				formRequiredItem.parentElement.querySelector('.form__error')
			)
		}
	},
	formClean(form) {
		form.reset()
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea')
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index]
				el.parentElement.classList.remove('_form-focus')
				el.classList.remove('_form-focus')
				formValidate.removeError(el)
			}
		}, 0)
	}
}
// send form functions
export function formSubmit() {
	const forms = document.forms
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				e.preventDefault()

				const form = e.target
				formSubmitAction(form, e)
			})

			form.addEventListener('reset', function (e) {
				const form = e.target
				formValidate.formClean(form)
			})
		}
	}

	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax')
			if (ajax) {
				e.preventDefault()
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#'
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET'
				const formData = new FormData(form)

				const jsonData = {}
				formData.forEach((value, key) => {
					jsonData[key] = value
				})

				try {
					const response = await fetch(formAction, {
						method: formMethod,
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(jsonData),
					})

					if (response.ok) {
						let responseResult = await response.json()

						localStorage.setItem('token', responseResult.token)
						localStorage.setItem('user', JSON.stringify(responseResult.user))

						form.classList.remove('_sending')
						formSent(form, jsonData, responseResult)
						window.location.href = '/'
					} else {
						const errorResponse = await response.json()
						displayServerErrors(errorResponse.message)
						form.classList.remove('_sending')
					}
				} catch (error) {
					console.error('Custom error: ', error)
					form.classList.remove('_sending')
				}
			} else if (form.hasAttribute('data-dev')) {
				e.preventDefault()
				formSent(form)
			}
		} else {
			e.preventDefault()
			if ( form.querySelector('._form-error') && form.hasAttribute('data-goto-error') ) {
				const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error' 
			}
		}
	}

	function displayServerErrors(errors) {
		const errorContainer = document.getElementById('errorContainer')
		errorContainer.innerHTML = errors
	}

	function formSent(form, jsonData, responseResult = ``) {
		document.dispatchEvent(
			new CustomEvent('formSent', {
				detail: {
					form: form,
					responseResult: responseResult,
				},
			})
		)
		console.log('Server Response:', responseResult)
		formValidate.formClean(form)
	}
}

formSubmit()

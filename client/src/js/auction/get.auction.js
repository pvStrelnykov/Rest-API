import { deleteAuction } from './getAll.auction.js'

async function getAuction() {
	try {
		const urlParams = new URLSearchParams(window.location.search)
		const id = urlParams.get('id')

		if (!id) {
			console.log('No id found in URL')
			return
		}

		const res = await fetch(`http://localhost:5375/api/auctions/${id}`, {
			method: 'get',
		})

		if (!res.ok) {
			alert('Error')
		}

		const data = await res.json()
		displayAuctionData(data)
	} catch (e) {
		console.log(e)
	}
}

function displayAuctionData(data) {
	const productBody = document.querySelector('.product__body')

	const productHTML = `
			<div class="col">
					<div class="product__img">
							<img src="img/${data.img}" alt="${data.title}">
					</div>
			</div>
			<div class="col">
					<div class="product__content">
							<div class="product__title">${data.title}</div>
							<p class="product__desc">${data.description}</p>
							<p class="product__price">${data.price}$</p>
							<div class="product__action">
								<a href="edit-product.html?id=${data._id}" class="product__pay btn btn-secondary">Edit</a>
								<button class="product__pay btn btn-danger delete-auction" data-id='${data._id}'>Delete</button>
							</div>
							<a href='pay.html?id=${data._id}' class="product__pay btn btn-primary">Pay</a>
					</div>
			</div>
	`
	productBody.innerHTML = productHTML

	document.querySelector('.delete-auction').addEventListener('click', function() {
		const id = this.getAttribute('data-id')
		deleteAuction(id)
	})
}

getAuction()

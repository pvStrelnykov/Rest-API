import '../scss/style.scss'

// user
import './files/form.js'
import './user/get.user.js'
import './user/update.user.js'
import './user/delete.user.js'
import './user/logout.user.js'

// auctions
import './auction/create.auction.js'
import './auction/edit.auction.js'
import './auction/get.auction.js'
import './auction/getAll.auction.js'

// bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// auth
document.addEventListener('DOMContentLoaded', function() {
	const isAuthenticated = localStorage.getItem('token')

	const profileLink = document.querySelector('.header__user')
	const authLink = document.querySelector('.header__actions')
	if(profileLink && authLink){
		if (!isAuthenticated) {
			profileLink.style.display = 'none'
			authLink.style.display = 'flex'
		}
	}
});





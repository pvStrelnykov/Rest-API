import { user, userId, token } from '../files/global.js'

const logoutButton = document.querySelector('.button-exit');
if (logoutButton) {
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('token')
				localStorage.removeItem('user')
        window.location.href = '/login.html'
    })
}

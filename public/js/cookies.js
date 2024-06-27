document.addEventListener('DOMContentLoaded', function() {
    const acceptCookiesButton = document.getElementById('acceptCookies');
    const rejectCookiesButton = document.getElementById('rejectCookies');

    acceptCookiesButton.addEventListener('click', function() {
        document.cookie = "cookiesAccepted=true; max-age=" + 60*60*24*365 + "; path=/";
        document.querySelector('.cookiesAcceptRejectContainer').style.display = 'none';
    });

    rejectCookiesButton.addEventListener('click', function() {
        document.cookie = "cookiesAccepted=false; max-age=" + 60*60*24*365 + "; path=/";
        document.querySelector('.cookiesAcceptRejectContainer').style.display = 'none';
    });

    const cookiesAccepted = document.cookie.split('; ').find(row => row.startsWith('cookiesAccepted='));
    if (cookiesAccepted) {
        document.querySelector('.cookiesAcceptRejectContainer').style.display = 'none';
    }
});

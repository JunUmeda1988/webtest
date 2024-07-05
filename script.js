document.getElementById('sendLocation').addEventListener('click', function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const data = { latitude: lat, longitude: lon };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            // ここでローカルサーバーのURLを指定します。例: http://localhost:3000/location
            const response = await fetch('http://http://localhost:3000/location', options);
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        }, error => {
            console.error(error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

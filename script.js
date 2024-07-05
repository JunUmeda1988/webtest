document.getElementById('sendLocation').addEventListener('click', function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            // 位置情報をブラウザに表示
            document.body.innerHTML += `<p>緯度: ${latitude}, 経度: ${longitude}</p>`;

            // 位置情報をJSON形式でサーバーに送信
            const response = await fetch('http://localhost:3000/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude,
                    longitude
                }),
            });

            // サーバーからのレスポンスを受け取り、ブラウザに表示（オプション）
            const responseData = await response.json();
            console.log(responseData); // デバッグ用
            document.body.innerHTML += `<p>サーバー応答: ${JSON.stringify(responseData)}</p>`;
        }, error => {
            console.error(error);
            document.body.innerHTML += `<p>位置情報の取得に失敗しました。</p>`;
        });
    } else {
        document.body.innerHTML += `<p>このブラウザでは位置情報がサポートされていません。</p>`;
    }
});

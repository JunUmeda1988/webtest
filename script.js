document.getElementById('sendLocation').addEventListener('click', function() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            // 位置情報をブラウザに表示
            document.getElementById('locationDisplay').innerHTML = `緯度: ${latitude.toFixed(10)}, 経度: ${longitude.toFixed(10)}`;

            // 位置情報をJSON形式でサーバーに送信
            try {
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

                if (!response.ok) {
                    throw new Error('サーバーへの送信に失敗しました。');
                }

                // サーバーからのレスポンスを受け取り、必要に応じて処理
                const responseData = await response.json();
                console.log('サーバーからの応答:', responseData);
            } catch (error) {
                console.error('エラー:', error);
            }
        }, error => {
            console.error('位置情報の取得に失敗しました。', error);
        });
    } else {
        console.log('このブラウザでは位置情報がサポートされていません。');
    }
});

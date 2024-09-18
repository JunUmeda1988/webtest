const appUI = document.querySelector(".ui");
const bpmTxt = document.querySelector(".bpm");
const stopBTN = document.querySelector(".stop");
const heartUI = document.querySelector(".heart");
const startBTN = document.querySelector(".start");
const errorTxt = document.querySelector(".error");
const connectBTN = document.querySelector(".connect");
const connectUI = document.querySelector(".connect-ui");

let device;
let temperature;

// BLEで受信した温度データの処理
function handleTemperatureChange(event) {
  const decoder = new TextDecoder('utf-8');
  const temperatureData = decoder.decode(event.target.value);
  bpmTxt.textContent = temperatureData + " °C";
}

// BLEデバイスのリクエストと接続
async function requestDevice() {
  const options = {
    filters: [{ name: 'M5StampPico' }], // 各M5の名前でフィルタリング
    optionalServices: ["environmental_sensing"],
  };
  device = await navigator.bluetooth.requestDevice(options);
  device.addEventListener("gattserverdisconnected", connectDevice);
}

// BLEデバイスに接続
async function connectDevice() {
  if (device.gatt.connected) return;

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService("environmental_sensing");
  const characteristic = await service.getCharacteristic("temperature");
  characteristic.addEventListener("characteristicvaluechanged", handleTemperatureChange);
  await characteristic.startNotifications();
  console.log("connected");
}

// 初期化と接続ボタンの動作
async function init() {
  if (!navigator.bluetooth) return errorTxt.classList.remove("hide");
  if (!device) await requestDevice();

  connectBTN.textContent = "connecting...";
  await connectDevice();

  appUI.classList.remove("hide");
  connectUI.classList.add("hide");
}

connectBTN.addEventListener("click", init);

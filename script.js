const carClassRates = {
    "J-1": 3000,
    "J-2": 4000,
    "J-3": 5000,
    "J-4": 6000
};

function calculate() {
    const startDate = document.getElementById("startDate").value;
    const days = parseInt(document.getElementById("days").value);
    const carClass = document.getElementById("carClass").value;
    const insurance = document.getElementById("insurance").checked;
    const waiver = document.getElementById("waiver").checked;
    const tires = document.getElementById("tires").checked;
    const etc = document.getElementById("etc").checked;
    const gps = document.getElementById("gps").checked;

    if (!startDate || isNaN(days) || !carClass) {
        alert("すべての必須項目を入力してください");
        return;
    }

    // 基本料金計算
    const baseRate = carClassRates[carClass] * days;

    // オプション料金計算
    const insuranceCost = insurance ? 1000 * days : 0;
    const waiverCost = waiver ? 500 * days : 0;
    const tiresCost = tires ? 2000 : 0;
    const etcCost = etc ? 500 : 0;
    const gpsCost = gps ? 1000 : 0;

    // 合計料金計算
    const subtotal = baseRate + insuranceCost + waiverCost + tiresCost + etcCost + gpsCost;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

    // 契約満了日計算
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // 結果を表示
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <div>基本料金: ¥${baseRate.toLocaleString()}</div>
        <div>オプション料金: ¥${(insuranceCost + waiverCost + tiresCost + etcCost + gpsCost).toLocaleString()}</div>
        <div>小計: ¥${subtotal.toLocaleString()}</div>
        <div>税金 (10%): ¥${tax.toLocaleString()}</div>
        <div>税込み合計: ¥${total.toLocaleString()}</div>
        <div>契約満了日: ${formattedEndDate}</div>
    `;

    // ローカルストレージに保存
    const data = {
        startDate,
        days,
        carClass,
        insurance,
        waiver,
        tires,
        etc,
        gps,
        subtotal,
        tax,
        total,
        endDate: formattedEndDate
    };
    localStorage.setItem("lastCalculation", JSON.stringify(data));
}

// ローカルストレージから読み込み
window.onload = function() {
    const savedData = localStorage.getItem("lastCalculation");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        alert(`前回の計算結果: 合計 ¥${pa

// 車両クラスの1日あたり基本料金
  const rateTable = {
      "J-1": [
        1980, 3960, 5940, 7700, 7700, 7700, 7700, 9680, 11660, 13640, 15400,
        15400, 15400, 15400, 17380, 19360, 21340, 23100, 23100, 23100, 23100,
        23940, 23940, 23940, 23940, 23940, 23940, 23940, 23940, 23940
    ],
       "J-2": [
        2480, 4960, 7440, 9600, 9600, 9600, 9600, 12080, 14560, 17040, 19200,
        19200, 19200, 19200, 21680, 24160, 26640, 28800, 28800, 28800, 28800,
        29580, 29580, 29580, 29580, 29580, 29580, 29580, 29580, 29580
    ], 
    "J-3": [
        3180, 6360, 9540, 12720, 13400, 13400, 13400, 16580, 19760, 22940,
        26120, 26800, 26800, 26800, 29980, 33160, 36340, 39500, 39500, 39500,
        39500, 39500, 39500, 39500, 39500, 39500, 39500, 39500, 39500, 39500
    ],
      "J-4": [
        3380, 6760, 10140, 13520, 16900, 17480, 17480, 20860, 24240, 27620,
        31000, 34380, 34960, 34960, 38340, 39800, 39800, 39800, 39800, 39800,
        39800, 39800, 39800, 39800, 39800, 39800, 39800, 39800, 39800, 39800
    ],
      "ETC_NAV": [ 500, 1000, 1000, 1000, 1000, 1000, 1000, 1500, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000,
        2000, 2000, 2000, 2000, 2000, 2000],
    "INS_WAIVER": [　1000, 2000, 2000, 2000, 2000, 2000, 2000, 3000, 4000, 4000, 4000,
        4000, 4000, 4000, 5000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000,
        6000, 6000, 6000, 6000, 6000, 6000, 6000　],
    "WINTER_TIRES": [  1000, 2000, 3000, 3000, 3000, 3000, 3000, 4000, 5000, 6000, 6000,
        6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000,
        6000, 6000, 6000, 6000, 6000, 6000, 6000 ]
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

    // 基本料金計算（配列のインデックスは days - 1 で調整）
    const baseRate = rateTable[carClass][days - 1] || 0;

    // オプション料金計算
  const insuranceCost = insurance ? rateTable.INS_WAIVER[days - 1] || 0 : 0;
const waiverCost = waiver ? rateTable.INS_WAIVER[days - 1] || 0 : 0;  
  const tiresCost = tires ? rateTable.WINTER_TIRES[days - 1] || 0 : 0;
    const etcCost = etc ? rateTable.ETC_NAV[days - 1] || 0 : 0;
    const gpsCost = gps ? rateTable.ETC_NAV[days - 1] || 0 : 0;

    // 合計料金計算
    const subtotal = baseRate + tiresCost + etcCost + gpsCost;
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

     // 契約満了日計算
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days - 1);
    const formattedEndDate = endDate.toISOString().split("T")[0];

    // 振込期限計算
    const paymentDeadline = calculatePaymentDeadline(formattedEndDate);

    // 結果を表示
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <div>基本料金: ¥${baseRate.toLocaleString()}</div>
        <div>オプション料金: ¥${(insuranceCost + waiverCost + tiresCost + etcCost + gpsCost).toLocaleString()}</div>
        <div>小計: ¥${subtotal.toLocaleString()}</div>
        <div>税金 (10%): ¥${tax.toLocaleString()}</div>
        <div>税込み合計: ¥${total.toLocaleString()}</div>
        <div>契約満了日: ${formattedEndDate}</div>
        <div>振込期限: ${paymentDeadline}</div>
    `;
}

// 振込期限計算関数（追記部分）
function calculatePaymentDeadline(endDate) {
    const holidays = [
        // 2024年の祝日
        "2024-01-01", "2024-01-08", "2024-02-11", "2024-02-12", "2024-03-20",
        "2024-04-29", "2024-05-03", "2024-05-04", "2024-05-05", "2024-05-06",
        "2024-07-15", "2024-08-11", "2024-08-12", "2024-09-16", "2024-09-23",
        "2024-10-14", "2024-11-03", "2024-11-04", "2024-11-23",
        // 2025年の祝日
        "2025-01-01", "2025-01-13", "2025-02-11", "2025-03-20",
        "2025-04-29", "2025-05-03", "2025-05-04", "2025-05-05", "2025-05-06",
        "2025-07-21", "2025-08-11", "2025-09-15", "2025-09-23", "2025-10-13",
        "2025-11-03", "2025-11-23", "2025-11-24"
    ];

    let paymentDeadline = new Date(endDate);
    paymentDeadline.setDate(paymentDeadline.getDate() - 1);

    // 年末年始特別ルール
    const endMonth = paymentDeadline.getMonth() + 1;
    const endDay = paymentDeadline.getDate();

    if ((endMonth === 12 && endDay >= 29) || (endMonth === 1 && endDay <= 4)) {
        paymentDeadline = new Date(`${paymentDeadline.getFullYear()}-12-27`);
    }

    // 土日・祝日の処理
    while (paymentDeadline.getDay() === 0 || paymentDeadline.getDay() === 6 || holidays.includes(paymentDeadline.toISOString().split("T")[0])) {
        paymentDeadline.setDate(paymentDeadline.getDate() - 1);
    }

    return paymentDeadline.toISOString().split("T")[0];
}


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

};

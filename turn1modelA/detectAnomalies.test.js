// Example tests using Jest

const { detectAnomaliesZScore, detectAnomaliesIQR } = require('./detectAnaomaliesModule');

test('Z-score: detects outlier', () => {
    const result = detectAnomaliesZScore([10, 12, 11, 14, 10, 100, 11, 12, 10]);
    expect(result.find(item => item.value === 100).anomaly).toBe(true);
});

test('IQR: detects outlier', () => {
    const result = detectAnomaliesIQR([10, 12, 11, 14, 10, 150, 11, 12, 10]);
    expect(result.find(item => item.value === 150).anomaly).toBe(true);
});

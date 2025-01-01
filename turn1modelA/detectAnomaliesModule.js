// Function to calculate the mean of an array
function calculateMean(data) {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
}

// Function to calculate the standard deviation of an array
function calculateStandardDeviation(data, mean) {
    const variance = data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
}

// Function to detect anomalies using the Z-score method
function detectAnomaliesZScore(data, threshold = 3) {
    const mean = calculateMean(data);
    const stdDev = calculateStandardDeviation(data, mean);

    return data.map(value => {
        const zScore = (value - mean) / stdDev;
        return Math.abs(zScore) > threshold ? { value, anomaly: true } : { value, anomaly: false };
    });
}

// Example usage
const timeSeriesData = [10, 12, 11, 14, 10, 100, 11, 12, 10]; // 100 is an outlier
const anomalies = detectAnomaliesZScore(timeSeriesData);
console.log(anomalies);


// Function to calculate the IQR and find outliers
function detectAnomaliesIQR(data) {
    const sortedData = [...data].sort((a, b) => a - b);

    const q1 = sortedData[Math.floor(sortedData.length * 0.25)];
    const q3 = sortedData[Math.floor(sortedData.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    return data.map(value => {
        return (value < lowerBound || value > upperBound) ? { value, anomaly: true } : { value, anomaly: false };
    });
}

// Example usage
const timeSeriesDataIQR = [10, 12, 11, 14, 10, 150, 11, 12, 10]; // 150 is an outlier
const anomaliesIQR = detectAnomaliesIQR(timeSeriesDataIQR);
console.log(anomaliesIQR);

module.exports = {detectAnomaliesZScore, detectAnomaliesIQR};


function detectAnomalies(data, zScoreThreshold = 3) {
    // Check if the data array is empty
    if (!data.length) {
        return [];
    }

    // Calculate the mean of the data
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;

    // Calculate the standard deviation of the data
    const variance = data.reduce((acc, val) => {
        const diff = val - mean;
        return acc + diff * diff;
    }, 0) / data.length;
    const stdDev = Math.sqrt(variance);

    // Calculate the z-score for each data point
    const zScores = data.map((val) => (val - mean) / stdDev);

    // Identify anomalies based on the z-score threshold
    const anomalies = zScores.map((zScore, index) => ({
        value: data[index],
        zScore,
        isAnomaly: Math.abs(zScore) > zScoreThreshold,
    }));

    return anomalies;
}


const timeSeriesData = [50, 52, 54, 48, 51, 53, 60, 56, 58, 70];
const anomalies = detectAnomalies(timeSeriesData);

console.log('Anomalies:', anomalies.filter((a) => a.isAnomaly));

module.exports = {detectAnomalies};



const { detectAnomalies } = require('./anomalyDetection');

describe('detectAnomalies', () => {
    it('should return an empty array for an empty data array', () => {
        expect(detectAnomalies([])).toEqual([]);
    });

    it('should correctly detect anomalies in a simple dataset', () => {
        const data = [1, 2, 3, 4, 10];
        const anomalies = detectAnomalies(data);
        expect(anomalies.filter((a) => a.isAnomaly).map((a) => a.value)).toEqual([10]);
    });

    it('should correctly detect anomalies with a custom z-score threshold', () => {
        const data = [1, 2, 3, 4, 5];
        const anomalies = detectAnomalies(data, 1);
        expect(anomalies.filter((a) => a.isAnomaly).map((a) => a.value)).toEqual([1, 5]);
    });
});

import IReceivedTestingData from "../../interfaces/testingServer/IReceivedTestingData";
import ITestingDataToSave from "../../interfaces/testingServer/ITestingDataToSave";
import auditIndicators from "../../constants/speedTest/auditIndicators";

function prepareTestingDataToSave(receivedTestingData: Array<IReceivedTestingData>, token: string, idTest: string): Array<ITestingDataToSave> {
    let testingDataToSave: Array<ITestingDataToSave> = [];
    receivedTestingData.forEach((item: IReceivedTestingData) => {
        for (let indicator in item) {
            if (auditIndicators.indexOf(indicator) !== -1) {
                testingDataToSave.push({
                    idTest,
                    token,
                    indicator,
                    url: item.url,
                    mode: item.mode,
                    value: item[indicator]
                });
            }
        }
    });
    return testingDataToSave
}

export default prepareTestingDataToSave
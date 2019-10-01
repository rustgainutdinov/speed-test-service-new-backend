function getLowerIndicatorAtSameDate(indicatorName, primaryArray) {
    let dataWithLowerIndicators = [];
    primaryArray.forEach((item) => {
        let isItemWithSameDateExists = false;
        dataWithLowerIndicators.map((insideItem) => {
            if ((item['date'].toString() !== insideItem['date'].toString()) || (item['url'] !== insideItem['url'])) {
                return insideItem;
            }
            isItemWithSameDateExists = true;
            if (item[indicatorName] < insideItem[indicatorName]) {
                return item;
            }
            else {
                return insideItem;
            }
        });
        if (!isItemWithSameDateExists) {
            dataWithLowerIndicators.push(item);
        }
    });
    return dataWithLowerIndicators;
}

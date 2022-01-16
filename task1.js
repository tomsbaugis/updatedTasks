const firstLand = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
    ];
const secondLand = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0]
    ];
const thirdLand = [
    [1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0]
    ];
function possibleFortress(area, target) {
    let previousPartOfLand;
    let currentPartOfLand;
    let nextPartOfLand;
    let currentNodeOfCurrentLand;
    let island = [];
    let successCount = 0;
    let possibleIslands = [];
    for (let i = 0; i < area.length; i++) {
        previousPartOfLand = area[i - 1];
        currentPartOfLand = area[i];
        nextPartOfLand = area[i + 1];
        for (let j = 0; j < currentPartOfLand.length; j++) {
            currentNodeOfCurrentLand = currentPartOfLand[j];
            if (currentNodeOfCurrentLand === 1) {
                const landCoordinates = {row: i, col: j};
                island.push(landCoordinates);
            }
        }
    }
    for (let i = 0; i < island.length; i++) {
        let currentLand = island[i];
        const similarLandRow = island.find(element => element.row === currentLand.row && element.col !== currentLand.col && element.col > currentLand.col);
        const similarLandCol = island.find(element => element.col === currentLand.col && element.row !== currentLand.row && element.row > currentLand.row);
        if (typeof similarLandRow !== 'undefined' && currentLand.row === similarLandRow.row && currentLand.col - similarLandRow.col === -1) {
            successCount++;
        }
        if (typeof similarLandCol !== 'undefined' && currentLand.col === similarLandCol.col && currentLand.row - similarLandCol.row === -1) {
            successCount++;
        }
    }
    island.forEach(land => {
        let similarLands = island.filter(otherLand => otherLand.row === land.row || otherLand.col === land.col);
        let similarLandsDiag = island.filter(otherLand => {
            if (land.col !== otherLand.col && land.row !== otherLand.row) {
                if (land.col - otherLand.col > -2 && land.col - otherLand.col < 2 && land.row - otherLand.row > -2 && land.row - otherLand.row < 2) {
                    return otherLand;
                }
            }
        });
        similarLands = similarLands.concat(similarLandsDiag);
        possibleIslands = checkLands(land, similarLands, possibleIslands);
    })
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const contiguousLandUnits = possibleIslands.reduce(reducer);
    if (successCount === target || successCount > target) {
        console.log(`Land contains a sufficient fortress`);
        console.log(`Biggest contiguous island on this land was ${contiguousLandUnits} units`);
        return true;
    } else {
        console.log(`Fortress on the provided land is not big enough, or does not exist at all`);
        console.log(`Biggest contiguous island on this land was ${contiguousLandUnits} units`);
        return false;
    }
}

function checkLands(land, similarLandArray, landsArr) {
    let nearLandCount = 0;
    similarLandArray.forEach(similarLand => {
        if (land.row === similarLand.row && land.col === similarLand.col) {
            return;
        }
        if (land.row === similarLand.row && land.col - similarLand.col > -2 && land.col - similarLand.col < 2) {
            nearLandCount++;
        }
        else if (land.col === similarLand.col && land.row - similarLand.row > -2 && land.row - similarLand.row < 2) {
            nearLandCount++;
        }
        else if (land.col !== similarLand.col && land.row !== similarLand.row) {
            if (land.col - similarLand.col > -2 && land.col - similarLand.col < 2 && land.row - similarLand.row > -2 && land.row - similarLand.row < 2) {
                nearLandCount++;
            }
        }
    });
    nearLandCount--;
    landsArr.push(nearLandCount);
    return landsArr;
}

console.log(`\nFirst land fortress: \n`);
possibleFortress(firstLand, 5)
console.log(`\nSecond land fortress: \n`);
possibleFortress(secondLand, 4);
console.log(`\nThird land fortress: \n`);
possibleFortress(thirdLand, 6);
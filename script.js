/*
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */


// not optimized, doesnt pass all tests - termined due to timeout
function activityNotifications(expenditure, d) {
    let notifications = 0;

    for (let i = d; i < expenditure.length; i++) {
        let trailingDays = [];
        // gather all days prior to d
        for (let j = i - d; j < i; j++) {
            trailingDays.push(expenditure[j]);
        }
        // sort all - increasing order
        let sortedTrailing = trailingDays.sort((a, b) => a - b);
        
        // find the median 
        let medianOfTrailing;
        if(d % 2 !== 0) {
            // (odd - middle of arr of length d)
            medianOfTrailing = sortedTrailing[Math.floor(sortedTrailing.length / 2)]
        } else {
            // (even - take the two in the middle and find average of them)
            medianOfTrailing = (sortedTrailing[(sortedTrailing.length / 2) - 1] + sortedTrailing[sortedTrailing.length / 2]) / 2;
        }
        
        // check if currentDay is 2x medianOfTrailing
        if (expenditure[i] >= 2 * medianOfTrailing) {
            notifications++;
        }
    }
    console.log(notifications);
    return notifications;
}

//////////////////////////////////////////////////////////////////////
function activityNotifications(expenditure, d) {
    let notifications = 0;

    for (let i = d; i < expenditure.length; i++) {
        let trailingDays = expenditure.slice(i - d, i).sort((a, b) => a - b);

        let medianOfTrailing;
        d % 2 !== 0 
            ? medianOfTrailing = trailingDays[Math.floor(trailingDays.length / 2)]
            : medianOfTrailing = (trailingDays[(trailingDays.length / 2) - 1] + trailingDays[trailingDays.length / 2]) / 2;

        expenditure[i] >= 2 * medianOfTrailing 
            ? notifications++ 
            : notifications;
    }

    return notifications;
}

/////////////////////////////////////////////////////////////////////
function activityNotifications(expenditure, d) {
    // algorithm using counting sort
    
    let notificationsSent = 0;
    
    const allExp = new Array(201).fill(0);  // each room represents the expenditure costs 
    
    // in allExp room, all expenditures are sorted.  so finding a value which is not 0 will be the median value.  median can be 2 if the values are even number
    const medianCount1 = Math.floor((d + 1) / 2);
    const medianCount2 = Math.ceil((d + 1) / 2);
    
    const findMedianExp = medianCount1 === medianCount2 ? () => {
        // if only one median
        let median = medianCount1, v = 0, maxVal = allExp.length;
        for(let v = 0; v < allExp.length; v++) {
            median -=allExp[v];
            if(median <= 0) return v * 2;
        }
    } : () => {
        // if 2 medians, the second median will be found next turn after first median
        let median = medianCount1, ret = 0;
        for(let v = 0; v < allExp.length; v++) {
            median -=allExp[v];
            if(median == 0) {
                ret = v;  // one more turn
            } else if(median < 0) {
                if(ret === 0) {
                    return v * 2;
                }
                else {
                    return ret + v;
                }
            }
        }
    }
    let day = 0;
    // fill first d-1 expenditures into the counting sorted array
    for(; day < d; day++) {
        allExp[expenditure[day]]++;  // fill counts of expenditures of day
    }
    // move forward next days
    let noticeThreshold;
    for(; day < expenditure.length; day++) {
        noticeThreshold = findMedianExp();
        if(noticeThreshold <= expenditure[day]) notificationsSent++;
        
        allExp[expenditure[day]]++; // increase count of the day
        allExp[expenditure[day - d]]-- // reduce count of the past day from the trailing
    }
    console.log(notificationsSent, '**')
    return notificationsSent;
}

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

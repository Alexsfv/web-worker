self.addEventListener('message', e => {
    if (!e.data || !e.data.type) {
        console.log('Empty data for worker')
        return null
    }
    switch(e.data.type) {
        case 'SORT_ARRAY': {
            const startTime = Date.now()
            postMessage({
                type: 'STARTED_SORT'
            })
            const sorted = sortArray(e.data.payload || [])
            const endTime = Date.now()
            postMessage({
                type: 'SORTED_ARRAY',
                payload: {
                    startTime,
                    sorted,
                    endTime,
                }
            })
            break
        }
        default: {
            console.log('unknown type in worker', e)
        }
    }
})

function sortArray(rowArray) {
    let sorted = false;
    const result = [...rowArray]
    do {
        sorted = false
        result.forEach((el, idx) => {
            if (idx === result.length - 1) return;
            const nextEl = result[idx + 1];
            if (el > nextEl) {
                result[idx] = nextEl;
                result[idx + 1] = el;
                sorted = true;
            }
        })
    } while(sorted)
    return result
}
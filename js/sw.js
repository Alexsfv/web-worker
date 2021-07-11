const worker = new Worker('js/bubbleSortWorker.js')

worker.addEventListener('message', e => {
    if (!e.data || !e.data.type) return null;
    const payload = e.data.payload
    switch (e.data.type) {
        case 'SORTED_ARRAY': {
            app.stopComputing(payload.endTime - payload.startTime)
            break
        }
        case 'STARTED_SORT': {
            app.startSort()
            break
        }
        default: {
            console.log('unknown type', e)
        }
    }
})
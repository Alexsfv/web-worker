const streamBtn = document.querySelector('#stream-btn')
const workerBtn = document.querySelector('#worker-btn')
const resetBtn = document.querySelector('#reset-btn')

const rnd = randomArray(10000)

streamBtn.addEventListener('click', () => {
    const startTime = Date.now();
    app.startComputingStream(rnd)
    app.stopComputing(Date.now() - startTime)
})

workerBtn.addEventListener('click', () => {
    app.startComputingWorker(rnd)
})

resetBtn.addEventListener('click', () => {
    app.reset();
})

function randomArray(length = 100) {
    const numbers = []
    for (let i = 0; i < length; i++) {
        numbers.push(Math.random())
    }
    return numbers
}

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
const root = document.querySelector('#app')

const initialState = {
    isComputing: false,
    isComputed: false,
    computedTime: -1,
}

let state = { ...initialState };

class Loader {
    html = (show) => {
        if (!show) return ''
        return `
            <div class="loader-wrapper">
                <div class="loader"></div>
            </div>
        `
    }
}

class Title {
    html = () => {
        if (!state.isComputed && !state.isComputing) return `
            <p class="app-title">
                Выбирите способ сортировки
            <p/>
        `
        if (state.isComputed) return `
            <p class="app-title">
                Сортировка выполнена за ${state.computedTime} мсек.
            <p/>
        `
        return `
            <p class="app-title">
                Выполняется сортировка
            <p/>
        `
    }
}

class Body {
    html = () => `
        ${title.html()}
        ${loader.html(state.isComputing)}
    `
}

class App {
    constructor($root, view) {
        this.$root = $root;
        this.view = view
    }

    stopComputing = (result) => {
        state.isComputing = false;
        state.isComputed = true;
        state.computedTime = result;
        this.render();
    }

    startComputingWorker = (arr) => {
        this.startSort()
        worker.postMessage({
            type: 'SORT_ARRAY',
            payload: arr
        })
        this.render()
    }

    startComputingStream = (arr) => {
        this.startSort()
        sortArray(arr)
        this.render()
    }

    startSort = () => {
        state.isComputed = false;
        state.computedTime = -1;
        state.isComputing = true;
        this.render()
    }

    reset = () => {
        state = { ...initialState }
        this.render()
    }

    render = () => {
        this.$root.innerHTML = this.view.html()
    }
}

const loader = new Loader()
const title = new Title()
const appView = new Body()
const app = new App(root, appView)

app.render();
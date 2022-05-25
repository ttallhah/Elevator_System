document.addEventListener('DOMContentLoaded', () => {
    elv = new Elevator(-1, 10)
    btns = document.getElementsByClassName('buttons')
    for (let btn of btns) {
        btn.addEventListener('click', () => {
            btn.classList.add('selected')
            let floor = btn.id.replace("button-floor-", "");
            floor = parseInt(floor)
            elv.call(floor)
        })
    }
})
class Elevator {
    constructor(minFloor, maxFloor) {
        this.selected_floors = []
        this.next = null
        this.current_floor = 0
        this.interval = null
    }

    call(floor) {
        // this.current_floor = document.querySelector('div.lift button.active').id.replace("button-floor-", "");
        if (!this.selected_floors.includes(floor)) {
            this.selected_floors.push(floor);
        }

        // Elevator is idle
        if (this.interval == null) {
            this.move()
        }
        console.log(this.selected_floors)
    }

    move() {
        elv = this
        this.next = elv.selected_floors[0]
        this.interval = setInterval(function() {
            elv.lightDown()

            if (elv.current_floor < elv.next) {

                elv.current_floor++;


            } else if (elv.next < elv.current_floor) {
                elv.current_floor--;

                console.log(elv.current_floor);
            }
            elv.lightUp()
            let log = null
            if (elv.current_floor == -1) {
                log = `<p>Lift is at Basement1</p>`;
            } else {
                log = `<p>Lift is at Floor# ${elv.current_floor}</p>`;
            }
            const h2 = document.getElementById("Logs");
            h2.insertAdjacentHTML("beforeend", log);




            if (elv.current_floor == elv.next) {
                document.getElementById(`button-floor-${elv.current_floor}`).classList.remove('selected')
                const h3 = document.getElementById("Logs");
                log = "<h3>Doors opened</h3>";
                h3.insertAdjacentHTML("beforeend", log);
                setTimeout(function() {
                    const h3 = document.getElementById("Logs");
                    log = "<h3>Doors closed</h3>";
                    h3.insertAdjacentHTML("beforeend", log);
                }, 3000)

                elv.selected_floors.shift()
                elv.next = elv.selected_floors[0]
                if (elv.selected_floors.length == 0) {
                    clearInterval(elv.interval);
                    elv.interval = null;
                } else {
                    elev.move()
                }


            }

        }, 1000)
    }

    lightDown() {
        document.getElementById(`button-floor-${this.current_floor}`).classList.remove('current');
    }

    lightUp() {
        document.getElementById(`button-floor-${this.current_floor}`).classList.add('current');
    }
}
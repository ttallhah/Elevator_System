let btns = document.getElementsByClassName('buttons');
for (let btn of btns) {
    btn.addEventListener('click', function() {
            btn.classList.add('selected')
            let id = btn.innerText
            let current_floor = document.querySelector('div.lift button.active').id.replace("button-floor-", "")
            let selected_floor = document.querySelector('div.lift button.buttons.selected').id.replace("button-floor-", "")
            current_floor = parseInt(current_floor);
            selected_floor = parseInt(selected_floor);

            let floor_interval = setInterval(function() {
                document.getElementById(`button-floor-${current_floor}`).classList.remove('active')
                if (current_floor < selected_floor) {
                    current_floor++;
                    document.getElementById("Logs").innerHTML = `Lift is at ${current_floor}`;
                } else if (selected_floor < current_floor) {
                    current_floor--
                    document.getElementById("Logs").innerHTML = `Lift is at ${current_floor}`;
                }

                document.getElementById(`button-floor-${current_floor}`).classList.add('active')
                if (current_floor == selected_floor) {
                    document.getElementById(`button-floor-${current_floor}`).classList.remove('selected')
                    clearInterval(floor_interval)
                    document.getElementById("Logs").innerHTML = "Lift has arrived";
                    setInterval(function() {
                        document.getElementById("Logs").innerHTML = "Doors Are oppened";
                    }, 3000)
                }
            }, 2000)
        }

    )

}
const timerElement = document.getElementById('times')
const timerContainer = document.getElementById('containerTimes')

export async function newTime(actualData) {
  await fetch(`http://localhost:1235/newtime`, {
    method: 'POST',
    body: JSON.stringify(actualData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function getTimes() {
  await fetch('http://localhost:1235/getTimes')
    .then(async response => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
      return response.json()
    })
    .then(data => {
      timerElement.innerHTML = ''
      let times = data.data
      let fragment = document.createDocumentFragment()
      let counter = 0
      times.forEach(time => {
        counter++
        let timeDiv = document.createElement('DIV')
        let scrambleDiv = document.createElement('DIV')
        let trashbutton = document.createElement('i')
        let div = document.createElement('DIV')

        timeDiv.innerHTML = `${time.timeId}. ${time.timeValue}`
        scrambleDiv.innerHTML = `${time.scramble}`

        timeDiv.classList.add('timeDiv')
        scrambleDiv.classList.add('scrambleDiv')
        div.classList.add('containerTime')
        trashbutton.classList.add('fa-solid', 'fa-trash')
        trashbutton.id = time.timeId


        div.appendChild(timeDiv)
        div.appendChild(scrambleDiv)
        div.appendChild(trashbutton)

        fragment.appendChild(div)
      })
      timerElement.appendChild(fragment)
      timerContainer.scrollTop = timerContainer.scrollHeight;
    })
    .catch(error => console.error('Error al obtener los datos:', error))
}

export async function deleteTime(timeId) {
  await fetch(`http://localhost:1235/deleteTime`, {
    method: 'POST',
    body: JSON.stringify(timeId),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


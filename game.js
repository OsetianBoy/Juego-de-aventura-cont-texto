const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Te despertaste en el piso de un bosque, miras a tu alrededor y ves una piedra brillante.',
    options: [
      {
        text: 'Agarrás la piedra brillante',
        setState: { piedraBrillante: true },
        nextText: 2
      },
      {
        text: 'Dejás la piedra brillante',
        nextText: 2
      },
    ]
  },
  {
    id: 2,
    text: 'Fuiste en busca de las respuestas y te encontraste con un comerciante.',
    options: [
      {
        text: 'Cambias la piedra brillante por una espada',
        requiredState: (currentState) => currentState.piedraBrillante,
        setState: { piedraBrillante: false, espada: true },
        nextText: 3
      },
      {
        text: 'Cambiar la piedra brillante por un escudo',
        requiredState: (currentState) => currentState.piedraBrillante,
        setState: { piedraBrillante: false, escudo: true },
        nextText: 3
      },
      {
        text: 'Ignorar al comerciante',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Apenas te despediste del comerciante empezaste a sentir cansancio, viste un pueblito y al lado un castillo extraño.',
    options: [
      {
        text: 'Explorar el castillo',
        nextText: 4
      },
      {
        text: 'Buscar un cuartito para dormir en el pueblito',
        nextText: 5
      },
      {
        text: 'Buscar un establo y dormir ahí con los caballos.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Te cansaste mientras merodeabas por el castillo y decidiste dormir un rato, mientras dormias un monstruo te mato.',
    options: [
      {
        text: 'Reintentar',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Encontraste una posada donde pasar la noche, como no tenias dinero te metiste por la ventana, luego el dueño te encontró y te acusó con las autoridades del pueblo, te encarcelaron.',
    options: [
      {
        text: 'Reintentar',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Te despertaste lleno de energias y decidiste explorar el castillo.',
    options: [
      {
        text: 'Explorar el castillo',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Mientras explorabas el castillo te cruzaste con un monstruo horrible.',
    options: [
      {
        text: 'Intentar escapar',
        nextText: 8
      },
      {
        text: 'Atacar con tu espada',
        requiredState: (currentState) => currentState.espada,
        nextText: 9
      },
      {
        text: 'Defenderte con tu escudo',
        requiredState: (currentState) => currentState.escudo,
        nextText: 10
      },
      {
        text: 'Arrojarle la piedra brillante',
        requiredState: (currentState) => currentState.piedraBrillante,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Tu intento de escapar falló y el monstruo te atrapó facilmente.',
    options: [
      {
        text: 'Reintentar',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'Como un/a estupido/a creiste que podias vencer al monstruo con una espada, fallaste en el intento.',
    options: [
      {
        text: 'Reintentar',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'El monstruo sonrie cruelmente y te come mientras te escondes detras de tu escudo.',
    options: [
      {
        text: 'Reintentar',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Le tiras la piedra brillante con todas tus fuerzas, magicamente el monstruo se ve gravemente herido y se muere. Cuando vences al monstruo ves el tesoro que protegía y te decides quedar con él, y con todo el castillo.',
    options: [
      {
        text: 'Felicidades. Jugar de nuevo.',
        nextText: -1
      }
    ]
  }
]

startGame()
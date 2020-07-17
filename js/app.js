window.onload = textEncrypt()

function textEncrypt() {
    const startValueOfKeyArea = 'One of the earliest forms of encryption is symbol replacement, which was first found in the tomb of Khnumhotep II, who lived in 1900 B.C. Egypt. Symbol replacement encryption is “non-standard,” which means that the symbols require a cipher or key to understand. This type of early encryption was used throughout Ancient Greece and Rome for military purposes.'
    const keyArea = document.querySelector('#keyArea')
    const resultArea = document.querySelector('#result')
    const userTextArea = document.querySelector('#userText')
    const userCodeArea = document.querySelector('#userCode')

    let objForEncrypt = {}
    let objForDecrypt = {}



    document.querySelector('#encrypt').addEventListener('click', () => {
        getKeys()
        encrypt()
    })

    document.querySelector('#copy').addEventListener('click', () => {
        userCodeArea.innerHTML = resultArea.innerHTML
    })

    document.querySelector('#decrypt').addEventListener('click', () => {
        getKeys()
        decrypt()
    })


    function getKeys() {

        let keyStr = checkKeyArea()

        //Generate encrypt key-object
        for (let i = 0; i < keyStr.length; i++) {
            let key = keyStr[i]
            let value = i

            objForEncrypt[key] = value
        }

        //Generate decrypt key-object
        const decryptWorkKeys = Object.keys(objForEncrypt)
        let decryptWorkValue = []

        decryptWorkKeys.forEach((key) => {
            decryptWorkValue.push(objForEncrypt[key])
        })

        for (let i = 0; i < decryptWorkValue.length; i++) {
            let key = decryptWorkValue[i]
            let value = decryptWorkKeys[i]
            objForDecrypt[key] = value
        }

        console.log(objForEncrypt)
    }


    function encrypt() {
        let taskStr = checkUserTextArea()
        if (taskStr) {
            let encryptServiceStr = ''

            for (char of taskStr) {
                if (objForEncrypt[char]) {
                    encryptServiceStr += objForEncrypt[char]
                } else {
                    encryptServiceStr += char
                }
            }

            resultArea.innerHTML = encryptServiceStr
        }
    }

    function checkKeyArea() {
        if (!(keyArea.value)) {
            return startValueOfKeyArea
        } else {
            return keyArea.value
        }
    }

    function checkUserTextArea() {
        if (!(userTextArea.value)) {
            resultArea.innerHTML = 'We do not have text for it...'
        } else {
            return userTextArea.value
        }
    }

    function checkUserCodeArea() {
        if (!(userCodeArea.value) || userCodeArea.value === 'We do not have text for it...') {
            resultArea.innerHTML = 'We do not have text for it...'
        } else {
            return userCodeArea.value
        }
    }

    function decrypt() {
        let taskStr = checkUserCodeArea()
        let decryptServiceStr = ''
        if (taskStr) {
            decryptFirstChar()
        }

        resultArea.innerHTML = decryptServiceStr

        function decryptFirstChar() {
            const oneSymb = taskStr[0]
            const twoSymb = taskStr[0] + taskStr[1]
            const threeSymb = taskStr[0] + taskStr[1] + taskStr[2]
            const fourSymb = taskStr[0] + taskStr[1] + taskStr[2] + taskStr[3]

            if ((/^[1,2,3,4,5,6,7,8,9,0]/.test(taskStr)) == false) {
                decryptServiceStr += taskStr[0]
                taskStr = taskStr.substring(1)
            } else {
                if (objForDecrypt[oneSymb] !== undefined) {
                    decryptServiceStr += objForDecrypt[oneSymb]
                    taskStr = taskStr.substring(1)
                } else if (objForDecrypt[twoSymb] !== undefined) {
                    decryptServiceStr += objForDecrypt[twoSymb]
                    taskStr = taskStr.substring(2)
                } else if (objForDecrypt[threeSymb] !== undefined) {
                    decryptServiceStr += objForDecrypt[threeSymb]
                    taskStr = taskStr.substring(3)
                } else if (objForDecrypt[fourSymb] !== undefined) {
                    decryptServiceStr += objForDecrypt[fourSymb]
                    taskStr = taskStr.substring(4)
                } else {
                    decryptServiceStr += taskStr[0]
                    taskStr = taskStr.substring(1)
                }
            }

            if (taskStr.length != 0) {
                decryptFirstChar()
            }
        }
    }

}
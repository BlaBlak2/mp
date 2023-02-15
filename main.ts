enum RadioMessage {
    P2Ready = 10155,
    P1Ready = 28544,
    message1 = 49434
}
input.onButtonPressed(Button.A, function () {
    if (Connected) {
        Change_direction()
    }
})
radio.onReceivedMessage(RadioMessage.P1Ready, function () {
    if (PlayerSelect == 2) {
        Connected = true
        radio.sendMessage(RadioMessage.P2Ready)
        P1 = game.createSprite(2, 2)
        P2 = game.createSprite(2, 2)
    }
})
function PlayerSelector () {
    PlayerSelect = 1
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            if (PlayerSelect == 1) {
                PlayerSelect = 2
                basic.showLeds(`
                    . . . . .
                    . . . # .
                    . # . # .
                    . . . . .
                    . . . # .
                    `)
            } else {
                PlayerSelect = 1
                basic.showLeds(`
                    . . . . .
                    . . . # .
                    . # . # .
                    . . . . .
                    . # . . .
                    `)
            }
            basic.pause(100)
        } else if (input.buttonIsPressed(Button.B)) {
            basic.clearScreen()
            break;
        }
    }
}
input.onButtonPressed(Button.B, function () {
    if (Connected) {
        if (PlayerSelect == 1) {
            P1XOLD = P1.get(LedSpriteProperty.X)
            P1YOLD = P1.get(LedSpriteProperty.Y)
            if (direction == 1) {
                P1.change(LedSpriteProperty.X, 1)
            } else if (direction == 2) {
                P1.change(LedSpriteProperty.Y, 1)
            } else if (direction == 3) {
                P1.change(LedSpriteProperty.X, -1)
            } else if (direction == 4) {
                P1.change(LedSpriteProperty.Y, -1)
            }
            if (P1.isTouching(P2)) {
                P1.set(LedSpriteProperty.X, P1XOLD)
                P1.set(LedSpriteProperty.Y, P1YOLD)
            }
            radio.sendValue("P1X", P1.get(LedSpriteProperty.X))
            radio.sendValue("P1Y", P1.get(LedSpriteProperty.Y))
        } else if (PlayerSelect == 2) {
            P2XOLD = P2.get(LedSpriteProperty.X)
            P2YOLD = P2.get(LedSpriteProperty.Y)
            if (direction == 1) {
                P2.change(LedSpriteProperty.X, 1)
            } else if (direction == 2) {
                P2.change(LedSpriteProperty.Y, 1)
            } else if (direction == 3) {
                P2.change(LedSpriteProperty.X, -1)
            } else if (direction == 4) {
                P2.change(LedSpriteProperty.Y, -1)
            }
            if (P2.isTouching(P1)) {
                P2.set(LedSpriteProperty.X, P2XOLD)
                P2.set(LedSpriteProperty.Y, P2YOLD)
            }
            radio.sendValue("P2X", P2.get(LedSpriteProperty.X))
            radio.sendValue("P2Y", P2.get(LedSpriteProperty.Y))
        }
    }
})
radio.onReceivedValue(function (name, value) {
    if (PlayerSelect == 1) {
        if (name == "P2X") {
            P2.set(LedSpriteProperty.X, value)
        } else if (name == "P2Y") {
            P2.set(LedSpriteProperty.Y, value)
        }
    } else if (PlayerSelect == 2) {
        if (name == "P1X") {
            P1.set(LedSpriteProperty.X, value)
        } else if (name == "P1Y") {
            P1.set(LedSpriteProperty.Y, value)
        }
    }
})
function Change_direction () {
    if (direction == 1) {
        direction = 2
    } else if (direction == 2) {
        direction = 3
    } else if (direction == 3) {
        direction = 4
    } else if (direction == 4) {
        direction = 1
    }
}
radio.onReceivedMessage(RadioMessage.P2Ready, function () {
    if (PlayerSelect == 1) {
        Connected = true
        radio.sendMessage(RadioMessage.P1Ready)
        P1 = game.createSprite(2, 2)
        P2 = game.createSprite(2, 2)
    }
})
let P2YOLD = 0
let P2XOLD = 0
let P1YOLD = 0
let P1XOLD = 0
let P2: game.LedSprite = null
let P1: game.LedSprite = null
let PlayerSelect = 0
let Connected = false
let direction = 0
radio.setGroup(7)
radio.setTransmitPower(7)
radio.setFrequencyBand(7)
direction = 1
basic.showLeds(`
    . . . . .
    . . . # .
    . # . # .
    . . . . .
    . # . . .
    `)
PlayerSelector()
while (!(Connected)) {
    if (PlayerSelect == 1) {
        radio.sendMessage(RadioMessage.P1Ready)
    } else if (PlayerSelect == 2) {
        radio.sendMessage(RadioMessage.P2Ready)
    }
    basic.pause(100)
}

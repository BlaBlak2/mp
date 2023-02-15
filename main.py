def PlayerSelector():
    global PlayerSelect
    PlayerSelect = 1
    while True:
        if input.button_is_pressed(Button.A):
            if PlayerSelect == 1:
                PlayerSelect = 2
                basic.show_leds("""
                    . . . . .
                                        . . . # .
                                        . # . # .
                                        . . . . .
                                        . . . # .
                """)
            else:
                PlayerSelect = 1
                basic.show_leds("""
                    . . . . .
                                        . . . # .
                                        . # . # .
                                        . . . . .
                                        . # . . .
                """)
            basic.pause(100)
        else:
            if input.button_is_pressed(Button.B):
                basic.clear_screen()
                break

def on_received_string(receivedString):
    global Connected
    if PlayerSelect == 1:
        if receivedString == "P2Ready":
            Connected = True
            radio.send_string("P1Ready")
            basic.show_leds("""
                . . . . .
                                . . . . .
                                . # . . .
                                . . . . .
                                . . . . .
            """)
    elif PlayerSelect == 2:
        if receivedString == "P1Ready":
            Connected = True
            radio.send_string("P2Ready")
            basic.show_leds("""
                . . . . .
                                . . . # .
                                . . . # .
                                . . . . .
                                . . . . .
            """)
radio.on_received_string(on_received_string)

PlayerSelect = 0
Connected = False
radio.set_group(7)
radio.set_transmit_power(7)
radio.set_frequency_band(7)
basic.show_leds("""
    . . . . .
        . . . # .
        . # . # .
        . . . . .
        . # . . .
""")
PlayerSelector()
while not (Connected):
    if PlayerSelect == 1:
        radio.send_string("P1Ready")
    elif PlayerSelect == 2:
        radio.send_string("P2Ready")
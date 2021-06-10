# Air Conditioner Notifier Light
Modern problems require (quick and dirty) modern solutions. My rental has inept wiring meaning my bedroom shares a circuit with the kitchen; as such if my desktop, window-unit air conditioner and microwave run concurrently, the breaker will trip. This had the ramification of not only taking down my desktop, but also the plethora of web servers running in my (low power) closet homelab.

Previously the household relied on shouting up from the kitchen to determine if my air conditioner was on, now a Philips Hue bulb is visible in the kitchen at minimum brightness to act as a notifier. If it is on, they can utilize HomeAssistant to remotely turn off my air conditioner, and the light will reflect the updated status.

---

I plan to add stress protections to avoid spamming from damaging the compressor and a 'return to state' functionality so the air conditioner can resume after x minutes.
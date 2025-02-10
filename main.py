from mcbe_python_bot import Bot

# Ganti ini dengan IP & Port server Minecraft Bedrock lo
SERVER_IP = "TamaaWorldMCPE.aternos.me"  # Ganti dengan IP server lo
SERVER_PORT = 36437  # Default Bedrock port

# Buat bot dengan username custom
bot = Bot(username="TamaaBOT")

# Event saat bot berhasil login
@bot.on("login")
def on_login():
    print(f"Bot {bot.username} berhasil masuk!")
    bot.send_chat("Halo, aku TamaaBOT!")

# Event saat ada chat masuk
@bot.on("chat")
def on_chat(message):
    print(f"Pesan masuk: {message}")
    if "halo bot" in message:
        bot.send_chat("Halo juga!")

# Connect ke server
bot.connect(SERVER_IP, SERVER_PORT)

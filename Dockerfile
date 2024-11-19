# Gunakan image dasar Python 3.9
FROM python:3.9-slim

# Install Node.js dan alat lainnya
RUN apt-get update && apt-get install -y \
    curl \
    git \
    bash \
    zsh \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# Set default shell ke zsh jika kamu suka
SHELL ["/bin/zsh", "-c"]

# Set direktori kerja
WORKDIR /workspace

# Install dependencies untuk Python dan Node.js
COPY requirements.txt /workspace/
RUN pip install -r requirements.txt

COPY package.json /workspace/
RUN npm install

# Copy semua file aplikasi ke dalam container
COPY . /workspace

# Tentukan perintah default saat container dijalankan
CMD ["bash"]

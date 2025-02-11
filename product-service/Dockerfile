# Dockerfile
FROM node

WORKDIR /app

# คัดลอก package files และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอก source code ทั้งหมด
COPY . .

# Build โปรเจกต์ (สมมุติว่าใช้คำสั่ง build แล้ว output อยู่ที่ dist/)
RUN npm run build

# เปิดพอร์ต (ปรับตามโปรเจกต์แต่ละตัว)
EXPOSE 3001

# รันแอปพลิเคชัน
CMD ["node", "dist/main.js"]

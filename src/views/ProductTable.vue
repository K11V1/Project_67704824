<template>
    <div class="container mt-4">
      <!-- หัวข้อของตาราง -->
      <h2 class="mb-3 text-center text-primary" style="color: #4a4a4a; font-weight: bold;">รายการสินค้า</h2>

      <!-- ตารางแสดงข้อมูลสินค้า -->
      <table class="table table-hover" style="background-color: #f8f9fa; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <thead style="background-color: #5d6d7e; color: white;">
          <tr>
            <th style="background-color: #34495e;">ID</th>
            <th style="background-color: #34495e;">ชื่อสินค้า</th>
            <th style="background-color: #34495e;">ประเภท</th>
            <th style="background-color: #34495e;">ราคา</th>
            <th style="background-color: #34495e;">รูปภาพ</th>
          </tr>
        </thead>
        <tbody>
          <!-- ใช้ v-for เพื่อวนลูปแสดงข้อมูลสินค้าแต่ละชิ้น -->
          <tr 
            v-for="product in products" 
            :key="product.id" 
            style="transition: background-color 0.3s ease;"
            @mouseover="$event.target.parentNode.style.backgroundColor='#e8f4f8'"
            @mouseout="$event.target.parentNode.style.backgroundColor=''"
          >
            <td style="color: #2c3e50;">{{ product.id }}</td>
            <td style="color: #2980b9; font-weight: bold;">{{ product.name }}</td>
            <td>
              <span style="background-color: #3498db; color: white; padding: 3px 8px; border-radius: 15px; font-size: 0.8em;">
                {{ product.type }}
              </span>
            </td>
            <td style="color: #27ae60; font-weight: bold;">{{ product.price.toLocaleString() }} ฿</td>
            <td>
              <img 
                :src="product.image" 
                :alt="product.name" 
                style="width: 100px; height: 100px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [] // เก็บข้อมูลสินค้าที่ดึงมาจาก API
    };
  },
  mounted() {
    // เรียกใช้เมทอด fetchProducts() ทันทีเมื่อคอมโพเนนต์ถูกโหลด
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        // ใช้ fetch() เพื่อดึงข้อมูลสินค้าจาก API
        const response = await fetch('https://fakestoreapi.com/products');

        // แปลงข้อมูล JSON และบันทึกลงในตัวแปร products
        const apiProducts = await response.json();
        
        // แปลงข้อมูลจาก API ให้ตรงกับโครงสร้างที่เราต้องการ
        this.products = apiProducts.map((product, index) => ({
          id: product.id,
          name: product.title,
          type: product.category,
          price: Math.round(product.price * 35), // แปลงเป็นบาท
          image: product.image
        }));
      } catch (error) {
        // แสดงข้อผิดพลาดทาง console หากเกิดปัญหาในการดึงข้อมูล
        console.error('Error fetching products:', error);
      }
    }
  }
};
</script>
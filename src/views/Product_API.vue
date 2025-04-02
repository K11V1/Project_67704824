<template>
    <div class="container my-5">
        <!-- หมวดหมู่สินค้า -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="btn-group" role="group">
                    <button 
                        type="button" 
                        class="btn" 
                        :class="activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'"
                        @click="filterProducts('all')"
                    >
                        ทั้งหมด
                    </button>
                    <button 
                        v-for="category in categories" 
                        :key="category"
                        type="button" 
                        class="btn" 
                        :class="activeCategory === category ? 'btn-primary' : 'btn-outline-primary'"
                        @click="filterProducts(category)"
                    >
                        {{ category }}
                    </button>
                </div>
            </div>
        </div>

        <!-- รายการสินค้า -->
        <div class="row">
            <div 
                class="col-md-3 mb-4" 
                v-for="product in filteredProducts" 
                :key="product.id"
            >
                <div class="card h-100">
                    <img
                        :src="product.image"
                        class="card-img-top"
                        :alt="product.title"
                        style="object-fit: contain; width: 100%; height: 200px"
                    />
                    <div class="card-body">
                        <h5 class="card-title">{{ product.title }}</h5>
                        <p class="card-text text-muted small">
                            หมวดหมู่: {{ product.category }}
                        </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            ราคา: ฿{{ product.price.toFixed(2) }}
                        </small>
                        <button 
                            type="button" 
                            class="btn btn-outline-primary btn-sm"
                            @click="addToCart(product)"
                        >
                            เพิ่มลงตะกร้า
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";

export default {
    setup() {
        // ตัวแปรเก็บข้อมูลสินค้า
        const products = ref([]);
        
        // ตัวแปรเก็บหมวดหมู่สินค้า
        const categories = ref([]);
        
        // หมวดหมู่ที่เลือกปัจจุบัน
        const activeCategory = ref('all');

        // ดึงข้อมูลสินค้าจาก API
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้');
                }
                
                // เก็บข้อมูลสินค้า
                products.value = await response.json();
                
                // ดึงหมวดหมู่สินค้าที่ไม่ซ้ำกัน
                categories.value = [...new Set(products.value.map(p => p.category))];
            } catch (error) {
                console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
            }
        };

        // กรองสินค้าตามหมวดหมู่
        const filteredProducts = computed(() => {
            if (activeCategory.value === 'all') {
                return products.value;
            }
            return products.value.filter(
                product => product.category === activeCategory.value
            );
        });

        // ฟังก์ชันเปลี่ยนหมวดหมู่
        const filterProducts = (category) => {
            activeCategory.value = category;
        };

        // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
        const addToCart = (product) => {
            console.log(`เพิ่ม ${product.title} ลงในตะกร้า`);
            // TODO: เพิ่มฟังก์ชันตะกร้าสินค้าที่นี่
        };

        // โหลดข้อมูลเมื่อคอมโพเนนต์เริ่มทำงาน
        onMounted(fetchProducts);

        return {
            products,
            categories,
            activeCategory,
            filteredProducts,
            filterProducts,
            addToCart
        };
    }
};
</script>

<style scoped>
.btn-group .btn {
    margin-right: 5px;
    margin-bottom: 5px;
}
</style>